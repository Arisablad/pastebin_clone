import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/MongoModels/UserModel';
import { authOptions } from '../../auth/[...nextauth]/options';




type CommentType = {
  user: string;
  comment: string;
  _id: string;
}





export async function GET(
  request: NextRequest,
  { params }: { params: { pasteId: string } }
) {
  try {
    const pasteId = params.pasteId;
    const session = await getServerSession(authOptions);
    let user


    if (session) {
      user = User.findById(session.user.id);
    }

    if (!pasteId) {
      return NextResponse.json(
        { message: 'You need to provide a paste id' },
        { status: 404 }
      );
    }
    await DbConnect();
    const foundPaste = await PasteModel.findById(pasteId);

    if (!foundPaste) {
      return NextResponse.json(
        { message: "Paste doesn't exist" },
        { status: 404 }
      );
    }

    if (foundPaste.exposure.toLowerCase().trim("") === 'private' && !session) {
      return NextResponse.json(
        {
          message: 'You need to sign in to see a private paste',
        },
        {
          status: 401,
        }
      );
    }

    if (
      session &&
      foundPaste.userId !== 'Annonymous' &&
      foundPaste.userId !== session.user.id
    ) {
      return NextResponse.json(
        {
          message: 'You need to authenticated',
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        paste: foundPaste,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { message: 'Error ocurred during getting single paste' },
      { status: 500 }
    );
  }
}


// CREATE COMMENT

export async function POST(request: NextRequest, { params }: { params: { pasteId: string } }) {
  try {
    const pasteId = params.pasteId;
    const { user, comment } = await request.json();
    const session = await getServerSession(authOptions);
    await DbConnect();



    const pasteToComment = await PasteModel.findById(pasteId);
    if (!pasteToComment) {
      return NextResponse.json({ message: "No paste found" }, { status: 404 })
    }
    if (!comment) {
      return NextResponse.json({ message: "You need to provide comment" }, { status: 404 })
    }

    if (comment.trim().length < 5) {
      return NextResponse.json({ message: "Comment need to have at least 5 characters" }, { status: 501 })
    }

    if (session) {
      if (session.user.name !== user) {
        return NextResponse.json({ message: "You need to be authorized" }, { status: 401 })
      }
    }


    await pasteToComment.updateOne({
      $push: {
        comments: {
          user: user,
          comment: comment,
        }
      }
    })


    return NextResponse.json({ message: "Comment Added successfully" }, { status: 201 })


  }
  catch (error) {
    console.log("error when adding comment,", error)
  }
}


// EDIT COMMENT

export async function PATCH(request: NextRequest, { params }: { params: { pasteId: string } }) {
  try {
    const pasteId = params.pasteId;
    const { comment, commentId } = await request.json();

    if (!pasteId) {
      return NextResponse.json({ message: "You need to provide a paste id of comment to delete" }, { status: 404 })
    }

    if (!comment || !commentId) {
      return NextResponse.json({ message: "You need to provide all required fields : comment, commentId" }, { status: 404 })
    }
    await DbConnect()

    const pasteToUpdate = await PasteModel.findById(pasteId)
    if (!pasteToUpdate) {
      return NextResponse.json({ message: "Paste Doesn't exists" }, { status: 404 })
    }

    const commentToUpdate = pasteToUpdate.comments.find((com: CommentType) => com._id == commentId);

    commentToUpdate.comment = comment



    if (!commentToUpdate) {
      return NextResponse.json({ message: "Comment doesn't exist" }, { status: 404 });
    }

    // Save the updated paste
    await pasteToUpdate.save();

    // Optionally, you can return the updated comment as a response
    return NextResponse.json({ message: "comment updated sucessfully", data: commentToUpdate }, { status: 201 });

  }
  catch (error) {
    console.log("Error during editing comment", error)
  }
}
