import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <section className="mx-auto flex flex-col items-center justify-center space-y-8">
      <Loader size={44} />
    </section>
  );
}
