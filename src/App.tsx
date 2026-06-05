import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import PinnedSection from './sections/PinnedSection';
import PortfolioSection from './sections/PortfolioSection';
import RevenueAuditTool from './sections/RevenueAuditTool';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Section data for pinned sections
const pinnedSectionsData = [
  {
    id: 'atmosphere',
    image: '/images/feature_workshop.jpg',
    microCaption: '01 / ATMOSPHERE',
    eyebrow: 'THE SETTING',
    headline: 'A SPACE WHERE IDEAS TURN INTO FUNCTIONAL OBJECTS.',
    isFullBleed: true,
  },
  {
    id: 'process',
    image: '/images/process_workspace.jpg',
    microCaption: '02 / PROCESS',
    eyebrow: 'THE WORKSPACE',
    headline: 'TOOLS ARE ONLY AS GOOD AS THE CLARITY BEHIND THEM.',
    isFullBleed: false,
  },
  {
    id: 'culture',
    image: '/images/culture_collaboration.png',
    microCaption: '03 / CULTURE',
    eyebrow: 'THE TEAM',
    headline: 'COLLABORATION BUILT ON TRUST—AND A SHARED STANDARD OF EXCELLENCE.',
    isFullBleed: false,
  },
  {
    id: 'craft',
    image: '/images/craft_direction.png',
    microCaption: '04 / CRAFT',
    eyebrow: 'THE EYE',
    headline: 'DIRECTION THAT KEEPS THE WORK HONEST AND MEMORABLE.',
    isFullBleed: false,
  },
  {
    id: 'polish',
    image: '/images/polish_refinement.jpg',
    microCaption: '05 / POLISH',
    eyebrow: 'THE DETAILS',
    headline: 'RESTRAINT IS WHAT MAKES THE DETAILS STAND OUT.',
    isFullBleed: false,
  },
  {
    id: 'launch',
    image: '/images/launch_delivery.png',
    microCaption: '06 / LAUNCH',
    eyebrow: 'THE HANDOFF',
    headline: 'A CLEAN BUILD, A CLEAR SYSTEM, AND A CONFIDENT LAUNCH.',
    isFullBleed: false,
  },
  {
    id: 'growth',
    image: '/images/growth_iteration.jpg',
    microCaption: '07 / GROWTH',
    eyebrow: 'THE ITERATION',
    headline: 'MEASURE. LEARN. REFINE. REPEAT WITHOUT LOSING THE VISION.',
    isFullBleed: false,
  },
  {
    id: 'impact',
    image: '/images/impact_results.png',
    microCaption: '08 / IMPACT',
    eyebrow: 'THE OUTCOME',
    headline: 'CLARITY THAT SPEAKS. PERFORMANCE THAT DELIVERS.',
    isFullBleed: false,
  },
  {
    id: 'systems',
    image: '/images/systems_scale.jpg',
    microCaption: '09 / SYSTEMS',
    eyebrow: 'THE FOUNDATION',
    headline: "INTELLIGENT WORKFLOWS AND AUTOMATED PROCESSES THAT SCALE YOUR OPERATIONS WITHOUT LOSING THE BRAND'S SOUL.",
    isFullBleed: false,
  },
];

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Disable snapping on touch devices to prevent scroll locks or freezing issues
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Setup global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const firstRange = pinnedRanges[0];
            const lastRange = pinnedRanges[pinnedRanges.length - 1];
            if (!firstRange || !lastRange) return value;

            // If we are before the first pinned section or after the last pinned section, do not snap!
            if (value < firstRange.start || value > lastRange.end) {
              return value;
            }

            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay snap setup to ensure all ScrollTriggers are created
    const snapTimer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(snapTimer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isLoaded]);

  return (
    <div ref={mainRef} className="relative bg-veo-dark min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Capabilities Section */}
        <CapabilitiesSection />
        
        {/* Pinned Sections */}
        {pinnedSectionsData.map((section, index) => (
          <PinnedSection
            key={section.id}
            {...section}
            zIndex={20 + index}
          />
        ))}
        
        {/* Portfolio Section */}
        <PortfolioSection />
        
        {/* Revenue Audit Tool */}
        <RevenueAuditTool />
        
        {/* Contact Section */}
        <ContactSection />
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
