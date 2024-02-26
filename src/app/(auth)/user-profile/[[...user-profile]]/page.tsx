import { UserProfile } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';
 
const UserProfilePage = () => (
    <div className="flex items-center justify-center flex-col gap-10">
    <div className="flex flex-row w-full">
        <div className="w-1/3">
        <Link href='/dashboard' className='flex text-black gap-1 mt-12 justify-center'>
            <Image src="/arrow-left-solid.svg" width={19} height={16} alt="go back arrow" title="Go back"/>
        </Link>
        </div>
        
        <div className="w-1/3 flex justify-center">
            <h1 className="font-bold mt-10 align-middle text-4xl max-md:text-3xl max-sm:text-2xl">User Profile</h1>
        </div>
    </div>
    <UserProfile path="/user-profile" routing="path" />
    </div>
);
 
export default UserProfilePage;
