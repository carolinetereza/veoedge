import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Globe, PenTool, Bot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Palette,
    title: 'Brand Systems',
    description: 'Identity, guidelines, and visual language that commands attention.',
  },
  {
    icon: Globe,
    title: 'Web Experiences',
    description: 'Fast, accessible sites with editorial layouts and high-converting architecture.',
  },
  {
    icon: PenTool,
    title: 'Content Direction',
    description: 'Photography, typography, and UI copy that feels cohesive and sharp.',
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    description: 'Custom chatbots and intelligent workflows designed to streamline operations and elevate customer experience.',
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headline,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );

      // Cards animation with stagger
      const cardElements = cards.querySelectorAll('.capability-card');
      gsap.fromTo(
        cardElements,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Subtle parallax on cards
      gsap.to(cardElements, {
        y: '-4vh',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full py-24 lg:py-32 bg-veo-dark"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Headline Block */}
        <div ref={headlineRef} className="mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <span className="font-mono text-xs text-veo-muted mb-4 block">
            WHAT WE DO
          </span>
          <h2 className="font-display text-display-2 text-veo-light max-w-2xl">
            STRATEGY, DESIGN, AND AUTOMATION—BUILT TO LAST AND SCALE.
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {capabilities.map((cap, index) => (
            <div
              key={cap.title}
              className="capability-card glass rounded-2xl p-8 lg:p-10 group hover:border-veo-indigo/30 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-veo-indigo/10 flex items-center justify-center group-hover:bg-veo-indigo/20 transition-colors duration-300">
                  <cap.icon
                    size={24}
                    className="text-veo-indigo"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-lg text-veo-light mb-4 tracking-wider">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="text-veo-muted text-sm leading-relaxed">
                {cap.description}
              </p>

              {/* Card number */}
              <div className="mt-8 pt-6 border-t border-veo-light/10">
                <span className="font-mono text-xs text-veo-muted">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
