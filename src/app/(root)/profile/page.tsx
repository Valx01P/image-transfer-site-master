import Link from "next/link";

export default function Profile() {
  return (
    <div className="h-screen text-black bg-blue">
      <p>profile</p>
      <Link href="/">Home</Link>
    </div>
  );
}
