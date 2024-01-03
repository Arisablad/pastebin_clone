import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

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

export async function POST(request: NextApiRequest) {
  try {
    await DbConnect();
    const { category, syntax, exposure, title, code, userId } =
      await request.body.json();
    console.log(
      'Sended data:',
      category,
      syntax,
      exposure,
      title,
      code,
      userId
    );
  } catch (error) {
    console.log(error);
    throw new Error('Failed to POST PASTES!');
  }
}
