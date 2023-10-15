import { CreateEditor } from "@/app/create/CreateEditor";

export default function CreatePage() {
  return (
    <main className="w-screen h-screen p-8">
      <section className="max-w-full lg:max-w-4xl xl:max-w-6xl mx-auto h-full">
        <CreateEditor />
      </section>
    </main>
  );
}
