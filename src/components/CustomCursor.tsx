import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    // Initial position off-screen
    gsap.set([cursor, trail], { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      
      // Fast cursor follow
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      
      // Trail with slight delay
      gsap.to(trail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, trail], {
        opacity: 1,
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, trail], {
        opacity: 0,
        duration: 0.2,
      });
    };

    // Magnetic hover effect for interactive elements
    const handleElementMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      isHoveringRef.current = true;
      
      cursor.classList.add('hover');
      trail.classList.add('hover');
      
      // Scale up effect
      gsap.to(cursor, {
        scale: 2.5,
        duration: 0.2,
        ease: 'power2.out',
      });
      
      gsap.to(trail, {
        scale: 1.5,
        duration: 0.2,
        ease: 'power2.out',
      });

      // Magnetic pull for buttons and links
      if (target.classList.contains('magnetic')) {
        target.addEventListener('mousemove', handleMagneticMove);
        target.addEventListener('mouseleave', handleMagneticLeave);
      }
    };

    const handleElementMouseLeave = () => {
      isHoveringRef.current = false;
      
      cursor.classList.remove('hover');
      trail.classList.remove('hover');
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
      
      gsap.to(trail, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      
      gsap.to(target, {
        x: deltaX,
        y: deltaY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
      target.removeEventListener('mousemove', handleMagneticMove);
      target.removeEventListener('mouseleave', handleMagneticLeave);
    };

    // Add listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementMouseEnter);
      el.addEventListener('mouseleave', handleElementMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{ opacity: 0 }}
      />
      <div
        ref={trailRef}
        className="custom-cursor-trail hidden md:block"
        style={{ opacity: 0 }}
      />
    </>
  );
}
