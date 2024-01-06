import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { User } from '@/models/MongoModels/UserModel';

export async function GET(request: NextApiRequest) {
  try {
    const { pasteId } = request.query;
    const session = await getServerSession(authOptions);
    const user = User.findById(session.user.id);

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

    if (foundPaste.exposure === 'private' && !session) {
      return NextResponse.json(
        {
          message: 'You need to sign in to see a paste',
        },
        {
          status: 401,
        }
      );
    }

    if (
      foundPaste.userId !== 'Annonymous' &&
      foundPaste.userId !== session.userId
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
      { status: 200 }
    );
  }
}
