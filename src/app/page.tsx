import { AuroraText } from "@/components/ui/aurora-text";
import CustomInput from "@/components/ui/custom-input";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="text-center">
        <p className="font-semibold text-2xl">Your GitHub</p>
        <h1 className="font-extrabold text-6xl ">
          Reimagined with <AuroraText>GitGaze</AuroraText>
        </h1>
      </div>
      <CustomInput />
    </main>
  );
}
