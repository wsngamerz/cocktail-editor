import { EditEditor } from "@/app/edit/EditEditor";

export default function CreateEditor() {
  return (
    <main className="w-screen h-screen p-8">
      <section className="max-w-full lg:max-w-4xl xl:max-w-6xl mx-auto h-full">
        <EditEditor />
      </section>
    </main>
  );
}
