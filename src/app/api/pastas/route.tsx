import { DbConnect } from '@/lib/DbConnection';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/MongoModels/UserModel';
import { getServerSession } from 'next-auth/next';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: NextRequest) {
  try {
    await DbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'You need to be authorized' },
        { status: 403 }
      );
    }

    const userInDb = session ? await User.findById(session.user.id) : null;

    if (!userInDb) {
      return NextResponse.json(
        { message: "User doesn't exist in our database" },
        { status: 500 }
      );
    }
    const userPastes = userInDb.pastes;
    return NextResponse.json(
      { message: 'Successfully fetched', pastes: userPastes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error while getting all pastas for user',
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const idsToRemove = await request.json();
    if (!session) {
      return NextResponse.json(
        { message: 'You need to be authorized' },
        { status: 403 }
      );
    }
    await DbConnect();

    if (idsToRemove.length <= 0) {
      return NextResponse.json(
        { message: 'You need to provide items to remove' },
        { status: 403 }
      );
    }
    // REMOVE PASTAS FROM USER
    const userInDb = session
      ? await User.findByIdAndUpdate(
          session.user.id,
          {
            $pull: { pastes: { _id: { $in: idsToRemove } } },
          },
          { new: true }
        )
      : null;

    if (!userInDb) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await PasteModel.deleteMany({ _id: { $in: idsToRemove } });

    return NextResponse.json(
      { message: 'User pastas updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error while removing pastas for user');
    return NextResponse.json(
      {
        message: 'Error while removing pastas for user',
      },
      { status: 500 }
    );
  }
}
