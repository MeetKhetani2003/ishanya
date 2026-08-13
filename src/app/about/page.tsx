import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { STATS, SERVICES, BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ishanaya Realty is a private luxury real estate advisory representing buyers across the Mumbai Metropolitan Region.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Integrity",
      desc: "We conduct every transaction with complete transparency, providing comprehensive documentation, verified payment schedules, and clear legal title breakdowns."
    },
    {
      title: "Innovation",
      desc: "We leverage technology, local micro-market analytics, commuting models, and flat decibel-level test data to give our clients an unfair analytical advantage."
    },
    {
      title: "Community",
      desc: "We believe in building relationships, not closing transactions. Our private office guides you long after handover, assisting with leasing, registry, and interior consultation."
    },
    {
      title: "Excellence",
      desc: "We operate on the 3 O's philosophy: Observe client constraints, Operate strictly to add value, and maintain an Objective buy-side focus in all negotiation rooms."
    }
  ];

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-ink-soft border-b border-ivory/5 shadow-sm pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ol className="flex items-center gap-2 text-xs eyebrow tracking-wider">
            <li>
              <Link href="/" className="text-ivory/50 hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gold/50">/</li>
            <li className="text-gold font-medium">About</li>
          </ol>
        </div>
      </nav>

      {/* Page Hero */}
      <section className="relative overflow-hidden bg-ink py-20 border-b border-ivory/5">
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-6">
            <span className="eyebrow text-gold/75 tracking-[0.3em] text-xs">About Ishanaya Realty</span>
            <h1 className="display text-4xl md:text-6xl lg:text-7xl text-ivory leading-tight font-normal">
              We are not brokers. <br/>
              <span className="gold-text italic">We are the buyer&apos;s side.</span>
            </h1>
            <p className="lede max-w-3xl mx-auto mt-6 text-ivory/70 text-md sm:text-lg">
              A private buy-side practice built to behave like a family office: research first, examined inventory second, and an advisory relationship that continues long past handover.
            </p>
          </div>
        </div>
      </section>

      {/* Origin / Building Dreams Section */}
      <section className="py-20 md:py-28 bg-ink-soft border-b border-ivory/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="display text-3xl sm:text-5xl font-bold text-ivory leading-tight">
                Founded on a <br/>
                <span className="gold-text italic">frustration.</span>
              </h2>
              <div className="space-y-6 text-sm text-ivory/60 leading-relaxed">
                <p>
                  India&apos;s finest homes were being sold like commodities — photographed poorly, explained inaccurately, and pushed by intermediaries paid to close the sale rather than advise the buyer. We started Ishanaya Realty to invert that paradigm: a small team, a highly selective collection, and complete commercial alignment with the person writing the check.
                </p>
                <p>
                  Fourteen years later, we have guided the placement of over twelve hundred premium residences, advised on real estate portfolios worth ₹4,300 crore, and declined far more mandates than we have accepted.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-gold/15 aspect-[4/3] w-full shadow-2xl group bg-charcoal">
              <Image
                src="/images/concierge.jpeg"
                alt="Private sales gallery"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Milestones Section */}
      <section className="py-20 bg-ink border-b border-ivory/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow text-gold/70">Milestones</p>
            <h2 className="display text-3xl sm:text-5xl font-bold text-ivory mt-4">Key Achievements</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s, idx) => (
              <div
                key={idx}
                className="bg-charcoal border border-ivory/5 rounded-xl p-8 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  <p className="display text-4xl sm:text-5xl gold-text font-bold mb-4">
                    {s.value}
                  </p>
                  <p className="eyebrow text-xs text-ivory/40 tracking-widest leading-relaxed">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-20 md:py-28 bg-ink-soft border-b border-ivory/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow text-gold/70">Focus</p>
            <h2 className="display text-3xl sm:text-5xl font-bold text-ivory mt-4">Driven By Purpose</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="bg-charcoal border border-ivory/8 rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3 bg-gold/10 rounded text-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>
                <h3 className="display text-2xl text-ivory font-semibold">Our Mission</h3>
              </div>
              <p className="text-sm text-ivory/60 leading-relaxed">
                To transform real estate placement decisions by aligning strictly with buyer interests. We protect our clients&apos; capital and commute structures through rigorous data-driven analysis, detailed legal audits, and complete transparency. We exist to make premium address curation clear, structural, and financially prudent.
              </p>
            </div>

            <div className="bg-charcoal border border-ivory/8 rounded-xl p-8 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3 bg-gold/10 rounded text-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <h3 className="display text-2xl text-ivory font-semibold">Our Vision</h3>
              </div>
              <p className="text-sm text-ivory/60 leading-relaxed">
                To stand as the leading private real estate advisory practice in the Mumbai Metropolitan Region. We aim to set the benchmark for client-side representation, offering structured, objective consulting that connects families and institutions to residences they will cherish for the next twenty years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28 bg-ink border-b border-ivory/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow text-gold/70">Ethics</p>
            <h2 className="display text-3xl sm:text-5xl font-bold text-ivory mt-4">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-charcoal border border-ivory/5 p-6 rounded-xl hover:border-gold/30 hover:shadow-lg transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <h4 className="display text-xl text-gold mb-4 font-semibold group-hover:text-gold-soft transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs text-ivory/55 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Quick Section */}
      <section className="py-20 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="eyebrow text-gold/70">Connect</p>
            <h2 className="display text-3xl sm:text-5xl font-bold text-ivory mt-4">Contact Us</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-charcoal border border-ivory/5 rounded-xl p-8 hover:border-gold/20 transition-all duration-300">
              <p className="eyebrow text-gold/60 text-[0.66rem] mb-4">Phone</p>
              <a
                href={`tel:${BRAND.phoneHref}`}
                className="display text-xl text-ivory hover:text-gold transition-colors block"
              >
                {BRAND.phone}
              </a>
            </div>

            <div className="bg-charcoal border border-ivory/5 rounded-xl p-8 hover:border-gold/20 transition-all duration-300">
              <p className="eyebrow text-gold/60 text-[0.66rem] mb-4">Email</p>
              <a
                href={`mailto:${BRAND.email}`}
                className="display text-xl text-ivory hover:text-gold transition-colors block break-all"
              >
                {BRAND.email}
              </a>
            </div>

            <div className="bg-charcoal border border-ivory/5 rounded-xl p-8 hover:border-gold/20 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <p className="eyebrow text-gold/60 text-[0.66rem] mb-4">Office Address</p>
              <p className="text-sm text-ivory/70 leading-relaxed">
                {BRAND.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
