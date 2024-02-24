"use client";

import Image from "next/image"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const HeaderRightLinks = () => {
    const pathname = usePathname();
    
    return (
        <div className='flex gap-5 items-center'>
              
        {pathname !== '/dashboard' && (
          <Link href='/dashboard' className='flex text-black gap-1 max-md:hidden'>
            <Image src="/cloud-arrow-up-solid.svg" width={19} height={16} alt="bruh"/>
            <span className="max-lg:hidden">Upload</span>
          </Link>
        )}

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
    )
}

export default HeaderRightLinks