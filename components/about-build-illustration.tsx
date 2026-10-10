import Image from "next/image";

export function AboutBuildIllustration() {
  return (
    <div className="about-build">
      <div className="about-build__artwork">
        <Image
          src="/design-to-build-workflow.png"
          alt="From idea to shipped: Design, Prototype, and Build, shown over code and a product interface."
          fill
          sizes="(max-width: 800px) 90vw, 420px"
        />
      </div>
    </div>
  );
}
