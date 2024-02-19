import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from 'next/link';
import MobileNav from "./MobileNav";

export default async function Header() {

  return (
    <header className='border-purple-900  border-b-[1px]'>
      <nav className='container mx-auto flex items-center justify-between py-4'>


        <div className="flex items-center w-1/3 gap-5 justify-start">
          <MobileNav />
          <Link href='/' className='flex text-black gap-1 max-md:hidden'>
            <Image src="/circle-question-regular.svg" width={19} height={16} alt="" />
            About
          </Link>
          <Link href='https://github.com/Valx01P' className='flex text-black gap-1 max-md:hidden'>
            <Image src="/code-solid.svg" width={19} height={16} alt="" />
            Source
          </Link>
        </div>


        <div className="flex w-1/3 items-center justify-center">
          <Link href='/'><Image src="/logo.png" width={105} height={43} alt="" /></Link>
        </div>


        <div className='flex items-center w-1/3 justify-end'>
            <div className='flex gap-5 items-center'>
              <Link href='/upload' className='flex text-black gap-1 max-md:hidden'>
                <Image src="/cloud-arrow-up-solid.svg" width={19} height={16} alt="bruh"/>
                <span className="max-lg:hidden">Upload</span>
              </Link>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <Link href='/sign-in' className='flex text-black gap-1'>
                  <Image src="/right-to-bracket-solid.svg" width={19} height={16} alt="bruh"/>
                  <span className="max-lg:hidden whitespace-nowrap">Sign in</span>
                </Link>
                <Link href='/sign-up' className="max-md:hidden">
                  <button className='px-3 py-1.5 bg-purple-900 rounded-md text-white whitespace-nowrap'>
                    Create account
                  </button>
                </Link>
              </SignedOut>
            </div>
        </div>


      </nav>
    </header>
  );
}