import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// import { getSession } from 'next-auth/react';

// export default async function handler(req, res) {
//   const session = await getSession({ req });

//   if (!session) {
//     res.status(401).json({ error: 'Unauthorized' });
//     return;
//   }

//   // Sprawdź, czy użytkownik ma dostęp do zasobu
//   if (session.userId === req.body.resourceOwnerId) {
//     // Udziel dostępu
//     res.status(200).json({ message: 'Authorized' });
//   } else {
//     // Brak dostępu
//     res.status(403).json({ error: 'Forbidden' });
//   }
// }

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
