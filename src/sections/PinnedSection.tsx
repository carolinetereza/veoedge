import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
  id: string;
  image: string;
  microCaption: string;
  eyebrow: string;
  headline: string;
  isFullBleed: boolean;
  zIndex: number;
}

export default function PinnedSection({
  id,
  image,
  microCaption,
  eyebrow,
  headline,
  isFullBleed,
  zIndex,
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const section = sectionRef.current;
    const imageEl = imageRef.current;
    const panel = panelRef.current;
    const text = textRef.current;
    const caption = captionRef.current;
    const hairline = hairlineRef.current;

    if (!section || !imageEl || !text || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      if (isFullBleed) {
        // Full-bleed background image section
        scrollTl.fromTo(
          imageEl,
          { scale: 1.12, opacity: 0.7 },
          { scale: 1, opacity: 1, ease: 'none', duration: 0.3 },
          0
        );

        scrollTl.fromTo(
          text,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.25 },
          0.05
        );

        scrollTl.fromTo(
          caption,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out', duration: 0.2 },
          0
        );

        // Exit animations
        scrollTl.fromTo(
          imageEl,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          text,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          caption,
          { x: 0, opacity: 1 },
          { x: '4vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      } else {
        // Split-screen section
        // Entrance
        scrollTl.fromTo(
          imageEl,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out', duration: 0.3 },
          0
        );

        if (panel) {
          scrollTl.fromTo(
            panel,
            { x: '60vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out', duration: 0.25 },
            0
          );
        }

        scrollTl.fromTo(
          text,
          { y: '12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.2 },
          0.1
        );

        scrollTl.fromTo(
          caption,
          { x: '4vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out', duration: 0.15 },
          0.05
        );

        if (hairline) {
          scrollTl.fromTo(
            hairline,
            { scaleX: 0 },
            { scaleX: 1, ease: 'power2.out', duration: 0.12 },
            0.18
          );
        }

        // Exit
        scrollTl.fromTo(
          imageEl,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        if (panel) {
          scrollTl.fromTo(
            panel,
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.7
          );
        }

        scrollTl.fromTo(
          text,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        if (hairline) {
          scrollTl.fromTo(
            hairline,
            { scaleX: 1 },
            { scaleX: 0, transformOrigin: 'right center' },
            0.75
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, [isFullBleed, isTouch]);

  if (isFullBleed) {
    return (
      <section
        ref={sectionRef}
        id={id}
        className={isTouch ? "relative w-full min-h-[60vh] py-24 bg-veo-dark flex items-center justify-center text-center" : "section-pinned"}
        style={isTouch ? {} : { zIndex }}
      >
        {/* Full-bleed background image */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: isTouch ? 0.3 : 0 }}
        >
          <img
            src={image}
            alt={headline}
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-veo-dark via-veo-dark/60 to-veo-dark" />
        </div>

        {/* Top-right caption */}
        <span
          ref={captionRef}
          className={isTouch ? "absolute top-6 right-6 font-mono text-xs text-veo-muted" : "absolute top-[10vh] right-[8vw] font-mono text-xs text-veo-muted"}
          style={{ opacity: isTouch ? 1 : 0 }}
        >
          {microCaption}
        </span>

        {/* Bottom-left text block */}
        <div
          ref={textRef}
          className={isTouch ? "relative px-6 max-w-xl z-10" : "absolute bottom-[16vh] left-[8vw] max-w-xl"}
          style={{ opacity: isTouch ? 1 : 0 }}
        >
          <span className="font-mono text-xs text-veo-muted mb-4 block">
            {eyebrow}
          </span>
          <h2 className="font-display text-display-3 sm:text-display-2 text-veo-light">
            {headline}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={isTouch ? "relative w-full bg-veo-dark" : "section-pinned bg-veo-dark"}
      style={isTouch ? {} : { zIndex }}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Image */}
        <div
          ref={imageRef}
          className={isTouch ? "relative w-full h-[40vh]" : "relative w-full lg:w-1/2 h-[50vh] lg:h-full"}
          style={{ opacity: isTouch ? 1 : 0 }}
        >
          <img
            src={image}
            alt={headline}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-veo-dark/60 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-veo-dark via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right Panel */}
        <div
          ref={panelRef}
          className={isTouch ? "relative w-full py-16 bg-veo-dark flex items-center" : "relative w-full lg:w-1/2 h-[50vh] lg:h-full bg-veo-dark flex items-center"}
          style={{ opacity: isTouch ? 1 : 0 }}
        >
          {/* Micro caption */}
          <span
            ref={captionRef}
            className={isTouch ? "absolute top-6 left-6 font-mono text-xs text-veo-muted" : "absolute top-[14vh] left-[8vw] lg:left-[8vw] font-mono text-xs text-veo-muted"}
            style={{ opacity: isTouch ? 1 : 0 }}
          >
            {microCaption}
          </span>

          {/* Text content */}
          <div
            ref={textRef}
            className="px-6 lg:px-[8vw] pt-6 lg:pt-0"
            style={{ opacity: isTouch ? 1 : 0 }}
          >
            <span className="font-mono text-xs text-veo-muted mb-4 block">
              {eyebrow}
            </span>
            <h2 className="font-display text-display-3 lg:text-display-2 text-veo-light max-w-md mb-8">
              {headline}
            </h2>
            <div
              ref={hairlineRef}
              className="hairline w-24"
              style={{ transformOrigin: 'left center' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
