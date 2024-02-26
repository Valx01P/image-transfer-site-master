import { SignUp } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center flex-col gap-10 mb-24">
    <div className="flex flex-row w-full">
        <div className="w-1/3">
        <Link href='/' className='flex text-black gap-1 mt-12 justify-center'>
            <Image src="/arrow-left-solid.svg" width={19} height={16} alt="go back arrow" title="Go back"/>
        </Link>
        </div>
        
        <div className="w-1/3 flex justify-center">
            <h1 className="font-bold mt-10 align-middle text-nowrap text-3xl max-md:text-3xl max-sm:text-2xl max-sm:text-wrap">User SignUp</h1>
        </div>
    </div>
      <SignUp />
    </div>
  );
}
