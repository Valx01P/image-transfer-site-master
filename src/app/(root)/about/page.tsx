import Link from "next/link";

export default function About() {
  return (
    <div className="h-screen text-black bg-blue">
      <p>about</p>
      <Link href="/">Home</Link>
    </div>
  );
}
