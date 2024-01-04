import { User } from '@/models/MongoModels/UserModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { DbConnect } from '@/lib/DbConnection';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Please provide all values' },
        { status: 404 }
      );
    }

    await DbConnect();
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      return NextResponse.json(
        { message: 'User already exist' },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    return NextResponse.json(
      { message: 'User Created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error while registering user', error);
    return NextResponse.json(
      { message: 'Error while registering user' },
      { status: 500 }
    );
  }
}
