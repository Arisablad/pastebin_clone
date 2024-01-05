'use client';
import { ScrollText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <div className="fixed z-50 top-0 left-0 w-full px-4 bg-gradient-to-b from-[#023859] to-[#02456c] h-14 xl:px-[226px] flex justify-between items-center">
        <div>
          <Link href={'/'} className="flex gap-4 items-center group">
            <ScrollText className="text-yellow-600 group-hover:text-blue-300 transition duration-300" />
            <p className="uppercase tracking-widest text-2xl font-semibold text-white cursor-pointer group-hover:text-blue-300 transition duration-300">
              PasteNote
            </p>
          </Link>
        </div>

        {/*Desktop links* if user is loged in display info about user instead of auth buttons*/}
        {!session ? (
          <ul className="hidden md:flex items-center gap-4">
            <Button asChild variant={'outline'}>
              <Link href={'sign-up'}>Sign Up</Link>
            </Button>
            <Button asChild>
              <Link href={'sign-in'}>Sign In</Link>
            </Button>
          </ul>
        ) : (
          <ul className="hidden md:flex items-center gap-4">
            <p className="text-white font-medium">{session?.user?.name}</p>
            <Button variant={'destructive'} onClick={() => signOut()}>
              Sign Out
            </Button>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
