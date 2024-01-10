import { DbConnect } from '@/lib/DbConnection';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/MongoModels/UserModel';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    await DbConnect();
    const session = await getServerSession(authOptions);
    console.log('session after', session);

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
