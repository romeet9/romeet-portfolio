import Image from "next/image";

/** A premium hero showcase for the final design: framed mockup on the signature
 * Vote IN Paper Bento container backdrop. */
export function FinalDesignShowcase({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl justify-center gap-1.5 p-1 w-full shrink-0 [box-shadow:#00000033_0px_2px_3px_inset] bg-[#242424] [border-width:0.5px] border-solid border-[#FFFFFF0F]">
      <div
        className="rounded-xl overflow-hidden self-stretch flex-1 relative bg-origin-border [border-width:0.5px] border-solid border-[#FFFFFF1A] px-6 py-16 sm:py-24 flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, oklab(20.9% 0 0) 0%, oklab(24.8% 0 0) 100%)",
        }}
      >
        <div className="relative flex justify-center">
          <Image
            src={src}
            alt={alt}
            width={1812}
            height={3648}
            sizes="(min-width: 640px) 330px, 250px"
            quality={95}
            className="h-auto w-[250px] max-w-full select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)] sm:w-[330px]"
          />
        </div>
      </div>
    </div>
  );
}
