import BentoComponent from "@/components/bento-component";
import { AuroraText } from "@/components/ui/aurora-text";
import CustomInput from "@/components/ui/custom-input";

export default function Home() {
  return (
    <section className="mx-auto flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <p className="font-semibold text-lg lg:text-2xl">Your GitHub</p>
        <h1 className="font-extrabold text-4xl lg:text-5xl xl:text-6xl">
          Reimagined with <AuroraText>GitGaze</AuroraText>
        </h1>
      </div>
      <CustomInput />
    </section>
  );
}
