import Link from "next/link";
import Image from 'next/image';
import { currentUser } from "@clerk/nextjs";
import UploadDropDown from "../../../components/UploadDropDown";
// import { getUserById } from "../../../lib/actions/user.action";
import { getImagesByUser } from "../../../lib/actions/image.action";
import ImageCollection from "../../../components/ImageCollection";

const Dashboard = async () => {
  const user = await currentUser();
  const userId: string = user?.publicMetadata.userId as string;

  const images = await getImagesByUser({ userId });
//   console.log(user);

  return (
    <section className="h-auto w-full flex flex-col text-black bg-blue absolute top-0">
        
        <div className="container h-40 flex flex-row mt-2.5">
            <div className=" flex">
                <Link href={`/user-profile`}>
                <Image 
                src={user?.imageUrl ?? "/user-solid.svg"}
                alt="profile image"
                width={160}
                height={160}
                className="rounded-full"
                />
                </Link>
            </div>
            <div className="text-black text-[26px] flex px-4 flex-col">
                <h1 className="leading-none font-semibold">{user?.firstName} {user?.lastName}</h1>
                <h2 className="text-[20px] text-gray-600">@{user?.username}</h2>
                <Link href='/user-profile' className='text-[16px] flex gap-1 link-blue'>
                <Image src="/pen-to-square-solid.svg" width={16} height={13} alt="edit"/>
                Edit
                </Link>
            </div>
        </div>


        <div className="container mt-2.5 flex text-black text-[26px]">
            <h1>{user?.firstName}&apos;s Images</h1>
        </div>

        <div className="container flex text-black text-[26px]">
            <div className="flex justify-center align-middle flex-col">
                <Link href={`/dashboard`}>
                <Image 
                src={user?.imageUrl ?? "/user-solid.svg"}
                alt="profile image"
                width={32}
                height={32}
                className="rounded-sm"
                />
                </Link>
            </div>
            <div className="flex justify-center items-center gap-5 pl-5">
                <div className='text-[16px] flex gap-1'>
                <Image src="/clock-rotate-left-solid.svg" width={16} height={13} alt="edit"/>
                    Most recent
                </div>
                <div className='text-[16px] flex gap-1 '>
                <Image src="/backward-fast-solid.svg" width={16} height={13} alt="edit"/>
                    Oldest
                </div>
                <UploadDropDown />
            </div>
        </div>
        <ImageCollection
          data={images?.data ?? []}
         />
    </section>
  )
}

export default Dashboard
