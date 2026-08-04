import Image from "next/image";
import { LuxLink } from "@/components/ui/Interactive";
import { GoldRule } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink grain vignette">
      <Image
        src="/images/journal-editorial.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/70" />
      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center md:px-12">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display mt-8 text-[clamp(4rem,14vw,11rem)] gold-text">404</h1>
        <p className="display mt-4 text-[clamp(1.5rem,3vw,2.4rem)] italic text-ivory">
          This address does not exist — yet.
        </p>
        <GoldRule className="mx-auto mt-12 max-w-xs text-ivory" />
        <p className="lede mx-auto mt-10 max-w-md">
          The page you were looking for has moved, or was never released to the
          public. Our off-market desk can usually help.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <LuxLink href="/" variant="gold">
            Return Home
          </LuxLink>
          <LuxLink href="/concierge" variant="ghost">
            Speak to the Concierge
          </LuxLink>
        </div>
      </div>
    </section>
  );
}
