import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-purple-900  border-t-[1px]">
      <div className="container mx-auto flex items-center justify-between lg:mx-auto md:px-10 xl:px-0 w-full flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/' className="flex flex-center">
          <Image src="/logo.png" width={105} height={43} alt="" />
        </Link>

        <p><strong>2024 iServer. All Rights reserved.</strong></p>
      </div>
    </footer>
  )
}

export default Footer