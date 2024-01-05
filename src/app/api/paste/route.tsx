import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { User } from '@/models/MongoModels/UserModel';
import { authOptions } from '../auth/[...nextauth]/route';

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

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    await DbConnect();
    const { category, syntax, exposure, title, code } = await request.json();

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

      const user = User.findById(session.user.id);

      // if user doesnt exist
      if (!user) {
        return NextResponse.json(
          { message: "User doesn't exist" },
          { status: 401 }
        );
      }

      // add new private paste to user
      await user.updateOne({
        $push: {
          pastes: {
            category,
            syntax,
            exposure,
            title,
            code,
          },
        },
      });
      return NextResponse.json({ message: 'paste created' }, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to POST PASTES!');
  }
}
