import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { User } from '@/models/MongoModels/UserModel';
import { authOptions } from '../auth/[...nextauth]/route';

// export async function GET(request: NextApiRequest) {
//   try {
//     await DbConnect();
//     const pastes = await PasteModel.find();
//     return NextResponse.json(pastes);
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to fetch pastes!');
//   }
// }

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    await DbConnect();
    const { category, syntax, exposure, title, code } = await request.json();
    const user = session ? User.findById(session.user.id) : null;

    // if user added paste as anonymous add it only for pastes collection

    if (!category || !syntax || !exposure || !title || !code) {
      return NextResponse.json(
        { message: 'You need to fill all fields' },
        { status: 500 }
      );
    }

    if (exposure.toLowerCase().trim() === 'private') {
      // check if user is authenticated
      if (!session) {
        return NextResponse.json(
          { message: "You're not authorized to create a private paste" },
          { status: 401 }
        );
      }

      // if user doesnt exist
      if (!user) {
        return NextResponse.json(
          { message: "User doesn't exist" },
          { status: 401 }
        );
      }

      if (user) {
        // add new private paste to user
        await user.updateOne({
          $push: {
            pastes: {
              category,
              syntax,
              exposure,
              title,
              code,
              userId: session?.user.id,
              userName: session?.user.name,
            },
          },
        });
      }

      const newlyCreatedPaste = await PasteModel.create({
        category,
        syntax,
        exposure,
        title,
        code,
        userId: session?.user.id || 'Anonymous',
        userName: session?.user.name || 'Anonymous',
      });

      return NextResponse.json(
        { message: 'Private paste created', pasteId: newlyCreatedPaste._id },
        { status: 201 }
      );
    }

    // if paste isn't private
    if (exposure !== 'private') {
      // If user is logged in add paste to his account
      if (session) {
        await user?.updateOne({
          $push: {
            pastes: {
              category,
              syntax,
              exposure,
              title,
              code,
              userId: session?.user.id || 'Anonymous',
              userName: session?.user.name || 'Anonymous',
            },
          },
        });
      }

      // Create new paste for anonymous users
      const newlyCreatedPaste = await PasteModel.create({
        category,
        syntax,
        exposure,
        title,
        code,
        userId: session?.user.id || 'Annonymous',
        userName: session?.user.name || 'Anonymous',
      });
      return NextResponse.json(
        {
          message: 'Paste Created Successfully',
          pasteId: newlyCreatedPaste._id,
        },
        { status: 200 }
      );
      //
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to POST PASTES!');
  }
}
