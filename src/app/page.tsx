import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-screen h-screen p-8">
      <div className="flex gap-2">
        <Link href="/create">
          <Button>Create</Button>
        </Link>
        <Link href="/edit">
          <Button>Edit</Button>
        </Link>
        <Link href="/cocktail">
          <Button>Cocktail</Button>
        </Link>
      </div>
    </main>
  );
}
