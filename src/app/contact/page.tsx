import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ishanaya Realty — Powai sales gallery, phone, WhatsApp and email.",
};

export default function ContactPage() {
  const mapIframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.7972826435345!2d72.90998817609204!3d19.116524350875412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f66a877543%3A0xe54cb11ef62241cf!2sGalleria%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

  const services = [
    "Private Acquisition",
    "Investment Structuring",
    "Legal & Due Diligence",
    "NRI Curation Desk",
    "Interior Curation Desk",
    "Post-Handover Portfolio Management"
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
            <li className="text-gold font-medium">Contact</li>
          </ol>
        </div>
      </nav>

      {/* Page Hero */}
      <section className="relative overflow-hidden bg-ink py-20 border-b border-ivory/5">
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-6">
            <span className="eyebrow text-gold/75 tracking-[0.3em] text-xs">Contact Ishanaya Realty</span>
            <h1 className="display text-4xl md:text-6xl lg:text-7xl text-ivory leading-tight font-normal">
              Let&apos;s Connect
            </h1>
            <p className="lede max-w-3xl mx-auto mt-6 text-ivory/70 text-md sm:text-lg">
              We help buyers, family offices, and investors discover properties they will truly love, backed by deep commute indices and legal due diligence.
            </p>
          </div>
        </div>
      </section>

      {/* Content Layout Grid */}
      <section className="py-16 md:py-24 bg-ink-soft">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side details */}
            <div className="space-y-8">
              {/* Contact Info Card */}
              <div className="bg-charcoal border border-ivory/8 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h2 className="display text-2xl text-ivory">Ishanaya Realty</h2>
                </div>
                
                <p className="text-sm text-ivory/60 leading-relaxed mb-8">
                  A private buy-side practice based in Mumbai, specializing in finding you a distinctly neighborly place by representing your interests — never the transaction.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="eyebrow text-gold/70 text-[0.6rem] mb-2">Email</h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-ivory hover:text-gold text-sm transition-colors break-all"
                    >
                      {BRAND.email}
                    </a>
                  </div>

                  <div>
                    <h3 className="eyebrow text-gold/70 text-[0.6rem] mb-2">Phone</h3>
                    <a
                      href={`tel:${BRAND.phoneHref}`}
                      className="text-ivory hover:text-gold text-sm transition-colors"
                    >
                      {BRAND.phone}
                    </a>
                  </div>

                  <div>
                    <h3 className="eyebrow text-gold/70 text-[0.6rem] mb-2">Business Hours</h3>
                    <div className="text-xs text-ivory/50 space-y-1">
                      <p>{BRAND.hours}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="eyebrow text-gold/70 text-[0.6rem] mb-2">Office Address</h3>
                    <p className="text-xs text-ivory/50 leading-relaxed">
                      {BRAND.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Services Card */}
              <div className="bg-charcoal border border-ivory/8 rounded-2xl p-8 shadow-xl">
                <h2 className="display text-2xl text-ivory mb-6">Our Key Disciplines</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-ink/30 border border-ivory/5 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                      <span className="text-xs text-ivory/70">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side Map */}
            <div className="space-y-8">
              <div className="bg-charcoal border border-gold/15 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h2 className="display text-2xl text-ivory">Find Us</h2>
                </div>
                
                <p className="text-sm text-ivory/60 leading-relaxed mb-6">
                  Visit our private sales gallery at Powai for portfolio review and virtual walkthrough assistance.
                </p>

                <div className="relative w-full h-[350px] rounded-xl overflow-hidden border border-ivory/10 shadow-inner">
                  <iframe
                    src={mapIframeSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ishanaya Realty Office Location Map"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="https://maps.google.com/?q=Galleria+Shopping+Mall+Powai+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gold hover:bg-gold-soft text-ink font-semibold rounded text-xs eyebrow shadow-md transition-colors"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:${BRAND.phoneHref}`}
                    className="inline-flex items-center px-6 py-3 bg-charcoal border border-ivory/20 hover:border-gold hover:text-gold text-ivory/80 font-semibold rounded text-xs eyebrow transition-colors"
                  >
                    Call Private Gallery
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
