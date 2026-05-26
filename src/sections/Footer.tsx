import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram, Globe, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/veo-edge/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/veoegde/', label: 'Instagram' },
  { icon: Globe, href: 'https://www.veoegde.co.uk', label: 'Website' },
];

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'Work', href: '#portfolio' },
      { label: 'Services', href: '#capabilities' },
      { label: 'Analysis', href: '#analysis' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Brand Systems', href: '#capabilities' },
      { label: 'Web Experiences', href: '#capabilities' },
      { label: 'Content Direction', href: '#capabilities' },
      { label: 'AI & Automation', href: '#capabilities' },
      { label: 'Design Systems', href: '#capabilities' },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 lg:py-24 bg-veo-dark border-t border-veo-light/5"
    >
      <div className="w-full px-6 lg:px-12">
        <div ref={contentRef} style={{ opacity: 0 }}>
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
            {/* Brand Column */}
            <div className="max-w-sm">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="font-display text-2xl tracking-[0.2em] text-veo-light hover:text-veo-indigo transition-colors duration-300 mb-6 block"
              >
                Veo Edge
              </a>
              <p className="text-veo-muted text-sm leading-relaxed mb-8">
                We craft brand identities, digital experiences, and intelligent automations for teams who demand clarity, contrast, and momentum.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-veo-light/5 flex items-center justify-center text-veo-muted hover:bg-veo-indigo/20 hover:text-veo-indigo transition-all duration-300"
                  >
                    <social.icon size={18} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="flex flex-wrap gap-12 lg:gap-20">
              {footerLinks.map((column) => (
                <div key={column.title}>
                  <h4 className="font-mono text-xs text-veo-muted mb-4">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className="text-veo-light text-sm hover:text-veo-indigo transition-colors duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-veo-light/5">
            <p className="font-mono text-xs text-veo-muted">
              &copy; {new Date().getFullYear()} Veo Edge Studio. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="font-mono text-xs text-veo-muted hover:text-veo-light transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-mono text-xs text-veo-muted hover:text-veo-light transition-colors"
              >
                Terms of Service
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="magnetic w-10 h-10 rounded-full border border-veo-light/20 flex items-center justify-center text-veo-muted hover:border-veo-indigo hover:text-veo-indigo transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
