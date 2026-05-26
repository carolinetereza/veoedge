import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    image: '/images/portfolio_1.jpg',
    title: 'Nexus Brand Identity',
    category: 'Brand System',
    metric: '+240%',
    metricLabel: 'Brand Recognition',
  },
  {
    id: 2,
    image: '/images/portfolio_2.jpg',
    title: 'Lumina E-Commerce',
    category: 'Web Experience',
    metric: '+185%',
    metricLabel: 'Conversion Rate',
  },
  {
    id: 3,
    image: '/images/portfolio_3.jpg',
    title: 'Aeon Architecture',
    category: 'Brand System',
    metric: '+320%',
    metricLabel: 'Lead Generation',
  },
  {
    id: 4,
    image: '/images/portfolio_4.jpg',
    title: 'Fintech Dashboard',
    category: 'Web Experience',
    metric: '+156%',
    metricLabel: 'User Engagement',
  },
  {
    id: 5,
    image: '/images/portfolio_5.jpg',
    title: 'Luxe Packaging',
    category: 'Content Direction',
    metric: '+410%',
    metricLabel: 'Social Shares',
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const grid = gridRef.current;

    if (!section || !headline || !grid) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Grid items animation
      const items = grid.querySelectorAll('.portfolio-item');
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card.querySelector('.card-inner'), {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });

    setHoveredId(id);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector('.card-inner'), {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredId(null);
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full py-24 lg:py-32 bg-veo-dark"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Headline */}
        <div ref={headlineRef} className="mb-16 lg:mb-20" style={{ opacity: 0 }}>
          <span className="font-mono text-xs text-veo-muted mb-4 block">
            SELECTED WORK
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-display-2 text-veo-light max-w-xl">
              PROJECTS THAT DEFINE STANDARDS.
            </h2>
            <p className="text-veo-muted text-sm max-w-sm">
              Each project is a collaboration—built on trust, craft, and a shared
              vision for what&apos;s possible.
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`portfolio-item card-3d ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              style={{ opacity: 0, perspective: '1000px' }}
              onMouseMove={(e) => handleMouseMove(e, item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="card-inner relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === item.id ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-veo-dark via-veo-dark/40 to-transparent transition-opacity duration-500 ${
                      hoveredId === item.id ? 'opacity-90' : 'opacity-60'
                    }`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                    {/* Top: Category & Arrow */}
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs text-veo-muted">
                        {item.category}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full bg-veo-indigo/20 flex items-center justify-center transition-all duration-300 ${
                          hoveredId === item.id
                            ? 'bg-veo-indigo scale-110'
                            : ''
                        }`}
                      >
                        <ArrowUpRight
                          size={18}
                          className={`text-veo-light transition-transform duration-300 ${
                            hoveredId === item.id
                              ? 'translate-x-0.5 -translate-y-0.5'
                              : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Bottom: Title & Metric */}
                    <div>
                      <h3 className="font-display text-lg lg:text-xl text-veo-light mb-3 tracking-wider">
                        {item.title}
                      </h3>
                      
                      {/* Metric */}
                      <div
                        className={`flex items-center gap-2 transition-all duration-500 ${
                          hoveredId === item.id
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-veo-indigo/20">
                          <TrendingUp size={14} className="text-veo-indigo" />
                          <span className="font-mono text-xs text-veo-indigo">
                            {item.metric}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-veo-muted">
                          {item.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
