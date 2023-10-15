import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen p-8">
      <ul>
        <li><Link href="/create">Create</Link></li>
        <li><Link href="/edit">Edit</Link></li>
      </ul>
    </main>
  );
}
