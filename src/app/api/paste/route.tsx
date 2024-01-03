import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextApiRequest) {
  try {
    await DbConnect();
    const pastes = await PasteModel.find();
    return NextResponse.json(pastes);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch pastes!');
  }
}

export async function POST(request: NextRequest) {
  try {
    await DbConnect();
    const { category, syntax, exposure, title, code, userId } =
      await request.json();
    console.log(
      'Sended data:',
      category,
      syntax,
      exposure,
      title,
      code,
      userId
    );
    return NextResponse.json({ hello: 'World' });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to POST PASTES!');
  }
}
