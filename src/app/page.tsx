import { CreateCocktailEditor } from "@/components/editors/cocktail";

export default function Home() {
  return (
    <main className="w-screen h-screen p-8">
      <section className="max-w-5xl mx-auto h-full">
        <CreateCocktailEditor />
      </section>
    </main>
  );
}
