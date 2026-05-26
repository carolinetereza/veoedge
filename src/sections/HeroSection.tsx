import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const hairline = hairlineRef.current;

    if (!section || !image || !content || !headline || !body || !cta || !hairline) return;

    const ctx = gsap.context(() => {
      // Load animation timeline
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Image panel entrance
      loadTl.fromTo(
        image,
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        0
      );

      // Content panel entrance
      loadTl.fromTo(
        content,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.1
      );

      // Headline word reveal
      const words = headline.querySelectorAll('.word');
      loadTl.fromTo(
        words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power2.out' },
        0.2
      );

      // Body + CTA entrance
      loadTl.fromTo(
        [body, cta],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        0.5
      );

      // Hairline draw
      loadTl.fromTo(
        hairline,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out' },
        0.6
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: false,
          scrub: 0.5,
        },
      });

      // Phase 1-2 (0-70%): Hold (content already visible from load)
      // Phase 3 (70-100%): Exit
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [body, cta],
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        image,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-8vw', scale: 1.04, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        hairline,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: 'right center' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-veo-dark overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Image Panel */}
        <div
          ref={imageRef}
          className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen"
          style={{ opacity: 0 }}
        >
          <img
            src="/images/hero_portrait.jpg"
            alt="Creative Director"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-veo-dark/80 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-veo-dark via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right Content Panel */}
        <div
          ref={contentRef}
          className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 pt-32 pb-16 lg:pt-32 lg:pb-16"
          style={{ opacity: 0 }}
        >

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-display-1 text-veo-light mb-8"
          >
            <span className="word inline-block">DESIGN</span>{' '}
            <span className="word inline-block">AND</span>{' '}
            <span className="word inline-block">SYSTEMS</span>
            <br />
            <span className="word inline-block">THAT</span>{' '}
            <span className="word inline-block">DRIVE</span>
            <br />
            <span className="word inline-block">MOMENTUM</span>
          </h1>

          {/* Hairline */}
          <div
            ref={hairlineRef}
            className="hairline w-24 mb-8"
            style={{ transformOrigin: 'left center' }}
          />

          {/* Body */}
          <div ref={bodyRef} />

          {/* CTA Row */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center items-start gap-6 lg:gap-8">
            <a
              href="#contact"
              onClick={(e) => handleCtaClick(e, '#contact')}
              className="magnetic btn-glow inline-flex items-center gap-3 px-8 py-4 rounded-pill bg-veo-indigo text-veo-light font-mono text-xs tracking-wider hover:bg-opacity-90 transition-all duration-300"
            >
              Start a project
              <ArrowRight size={16} />
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleCtaClick(e, '#portfolio')}
              className="inline-flex items-center gap-2 text-veo-muted hover:text-veo-light font-mono text-xs tracking-wider transition-colors duration-300 group"
            >
              See selected work
              <ArrowRight
                size={14}
                className="transform transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
