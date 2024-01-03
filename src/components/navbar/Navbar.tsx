import { ScrollText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav>
      <div className="fixed top-0 left-0 w-full px-4 bg-gradient-to-b from-[#023859] to-[#02456c] h-14 xl:px-[226px] flex justify-between items-center">
        <div>
          <Link href={'/'} className="flex gap-4 items-center group">
            <ScrollText className="text-yellow-600 group-hover:text-blue-300 transition duration-300" />
            <p className="uppercase tracking-widest text-2xl font-semibold text-white cursor-pointer group-hover:text-blue-300 transition duration-300">
              PasteNote
            </p>
          </Link>
        </div>

        {/*Desktop links*/}
        <ul className="hidden md:flex items-center gap-4">
          <Button asChild variant={'outline'}>
            <Link href={'sign-up'}>Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href={'sign-in'}>Sign In</Link>
          </Button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
