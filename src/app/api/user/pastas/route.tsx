import { DbConnect } from '@/lib/DbConnection';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { User } from '@/models/MongoModels/UserModel';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log('session', session);
    const userInDb = session ? await User.findById(session.user.id) : null;

    await DbConnect();

    if (!userInDb) {
      return NextResponse.json(
        { message: "User doesn't exist in our database" },
        { status: 500 }
      );
    }
    if (!session || userInDb._id !== session.user.id) {
      return NextResponse.json(
        { message: 'You need to be authorized' },
        { status: 403 }
      );
    }
    const userPastes = userInDb.pastes;
    return NextResponse.json(
      { message: 'Successfully fetched', pastes: userPastes },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error while getting all pastas for user', error);
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
