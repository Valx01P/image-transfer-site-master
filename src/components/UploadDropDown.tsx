import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@clerk/nextjs";
import ImageForm from "./ImageForm";
import Link from "next/link";

const UploadDropDown = async () => {
    const user = await currentUser();
    const userId: string = user?.publicMetadata.userId as string;  
  
    return (
        <Sheet>
          <SheetTrigger className="align-middle transform-growth">
            <div className='text-[16px] flex gap-1'>
            <Image src="/cloud-arrow-up-solid.svg" width={16} height={13} alt="edit"/>
                Upload image
            </div>
          </SheetTrigger>
          <SheetContent side={"top"} className="flex flex-col gap-6 bg-white">
            <Link href={`/`}>
            <Image 
              src="/logo.png"
              alt="logo"
              width={105}
              height={43}
            />
            </Link>
            <Separator className="border border-gray-400" />
            <ImageForm userId={userId} />
          </SheetContent>
        </Sheet>

    )
}

export default UploadDropDown