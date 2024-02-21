import Link from 'next/link';

export default function Home() {
  return (
    <section className='w-11/12'>
      <div className='flex flex-col justify-center items-center mb-20 w-auto'>
        <h1 className="font-bold text-center text-5xl">Upload and share your images</h1>
        <h2 className='text-3xl text-center mt-3 text-gray-600'>Upload images, get unique urls, and share anywhere online for free.</h2>
          <Link href='/sign-in'>
            <button className='px-9 py-4 mt-5 bg-purple-900 rounded-md text-white tracking-wider'>
              START UPLOADING
            </button>
          </Link>
      </div>
    </section>
  );
}