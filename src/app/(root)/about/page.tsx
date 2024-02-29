import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center text-black bg-blue pt-44">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">About</h1>
      </div>
      
      <div className="max-w-md text-center">
        <p className="text-lg mb-4">
          Welcome to my simple image uploading project! This project is built with Next.js, Tailwind CSS, MongoDB, UploadThing, and Clerk for authentication.
        </p>
        <p className="text-base mb-4">
          If you encounter issues with account authentication, please note that it could be due to various reasons, and I apologize for any inconvenience. It might be related to Clerk or Google authentication services.
        </p>
        <p className="text-sm">
          Thank you for checking out my practice project. The website design is inspired by ImgBB.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
