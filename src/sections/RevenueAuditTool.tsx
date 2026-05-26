import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Zap, TrendingUp, Users, Clock, ArrowRight, X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AuditResult {
  score: number;
  revenueLoss: string;
  metrics: {
    ux: number;
    performance: number;
    conversion: number;
    accessibility: number;
  };
}

export default function RevenueAuditTool() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate analysis with cinematic loading
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate mock result
    const mockResult: AuditResult = {
      score: 48,
      revenueLoss: '$305K',
      metrics: {
        ux: 76,
        performance: 63,
        conversion: 65,
        accessibility: 63,
      },
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const handleUnlock = () => {
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setIsSubmitted(false);
      setEmail('');
    }, 2000);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="analysis"
        className="relative w-full py-24 lg:py-32 bg-veo-dark overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-veo-indigo/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative w-full px-6 lg:px-12">
          <div
            ref={contentRef}
            className="max-w-4xl mx-auto"
            style={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-veo-indigo mb-4 block">
                REVENUE LEAKAGE ANALYSIS
              </span>
              <h2 className="font-display text-display-2 text-veo-light mb-4">
                DISCOVER HIDDEN REVENUE.
              </h2>
              <p className="text-veo-muted text-sm max-w-md mx-auto">
                See how much potential revenue your business is losing due to poor
                design, broken UX, and inefficient workflows.
              </p>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleAnalyze}
              className="relative max-w-2xl mx-auto mb-12"
            >
              <div className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-veo-muted"
                  />
                  <input
                    type="text"
                    placeholder="Enter your website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-veo-light placeholder-veo-muted/50 font-mono text-sm focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="magnetic px-8 py-4 rounded-xl bg-veo-indigo text-veo-light font-mono text-xs tracking-wider hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-veo-light/30 border-t-veo-light rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

              {/* Loading Animation */}
              {isAnalyzing && (
                <div className="mt-8 glass rounded-2xl p-8">
                  <div className="scan-line" />
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-veo-muted">
                      Scanning...
                    </span>
                    <span className="font-mono text-xs text-veo-indigo animate-pulse">
                      Processing data
                    </span>
                  </div>
                  <div className="space-y-4">
                    {[
                      'UX Patterns',
                      'Performance Metrics',
                      'Conversion Funnels',
                      'Accessibility Score',
                    ].map((item, i) => (
                      <div
                        key={item}
                        className="flex items-center gap-4"
                        style={{ animationDelay: `${i * 200}ms` }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            i < 2 ? 'bg-veo-indigo' : 'bg-veo-muted/30'
                          }`}
                        />
                        <span
                          className={`font-mono text-xs ${
                            i < 2 ? 'text-veo-light' : 'text-veo-muted'
                          }`}
                        >
                          {item}
                        </span>
                        {i < 2 && (
                          <div className="flex-1 h-px bg-gradient-to-r from-veo-indigo/50 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {result && !isAnalyzing && (
                <div className="mt-8 glass rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Score */}
                    <div className="text-center md:text-left">
                      <span className="font-mono text-xs text-veo-muted mb-2 block">
                        ELITE PERFORMANCE SCORE
                      </span>
                      <div className="flex items-baseline gap-2 justify-center md:justify-start">
                        <span
                          className={`font-display text-6xl ${
                            result.score < 50
                              ? 'text-red-400'
                              : result.score < 70
                              ? 'text-yellow-400'
                              : 'text-veo-indigo'
                          }`}
                        >
                          {result.score}
                        </span>
                        <span className="font-mono text-sm text-veo-muted">
                          /100
                        </span>
                      </div>
                    </div>

                    {/* Revenue Loss */}
                    <div className="text-center md:text-left">
                      <span className="font-mono text-xs text-veo-muted mb-2 block">
                        ESTIMATED REVENUE LEFT ON THE TABLE
                      </span>
                      <span className="font-display text-4xl text-veo-light">
                        {result.revenueLoss}
                      </span>
                      <span className="font-mono text-sm text-veo-muted ml-2">
                        /year
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'UX Design', value: result.metrics.ux, icon: Zap },
                      {
                        label: 'Performance',
                        value: result.metrics.performance,
                        icon: TrendingUp,
                      },
                      {
                        label: 'Conversion',
                        value: result.metrics.conversion,
                        icon: Users,
                      },
                      {
                        label: 'System Efficiency',
                        value: result.metrics.accessibility,
                        icon: Clock,
                      },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="glass rounded-xl p-4 text-center"
                      >
                        <metric.icon
                          size={18}
                          className="text-veo-indigo mx-auto mb-2"
                        />
                        <span className="font-display text-2xl text-veo-light block mb-1">
                          {metric.value}
                        </span>
                        <span className="font-mono text-xs text-veo-muted">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleUnlock}
                    className="magnetic w-full btn-glow px-8 py-4 rounded-xl bg-veo-indigo text-veo-light font-mono text-xs tracking-wider hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Unlock Full Custom Audit
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </form>

            {/* Trust indicators */}
            {!result && !isAnalyzing && (
              <div className="flex flex-wrap items-center justify-center gap-6 text-veo-muted">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-veo-indigo" />
                  <span className="font-mono text-xs">Free Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-veo-indigo" />
                  <span className="font-mono text-xs">No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-veo-indigo" />
                  <span className="font-mono text-xs">Results in 30s</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Email Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-veo-dark/80 backdrop-blur-xl"
            onClick={() => setShowModal(false)}
          />
          <div className="relative glass-strong rounded-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-veo-muted hover:text-veo-light transition-colors"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-veo-indigo/20 flex items-center justify-center mx-auto mb-4">
                    <Zap size={24} className="text-veo-indigo" />
                  </div>
                  <h3 className="font-display text-xl text-veo-light mb-2">
                    GET YOUR FULL AUDIT
                  </h3>
                  <p className="text-veo-muted text-sm">
                    Receive a comprehensive 20-page report with actionable
                    recommendations.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-veo-dark/50 border border-veo-light/10 text-veo-light placeholder-veo-muted/50 font-mono text-sm focus:outline-none focus:border-veo-indigo transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="magnetic w-full btn-glow px-8 py-4 rounded-xl bg-veo-indigo text-veo-light font-mono text-xs tracking-wider hover:bg-opacity-90 transition-all duration-300"
                  >
                    Get My Revenue Recovery Plan
                  </button>
                </form>

                <p className="text-center text-veo-muted text-xs mt-4">
                  We respect your privacy. No spam, ever.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-400" />
                </div>
                <h3 className="font-display text-xl text-veo-light mb-2">
                  YOU&apos;RE ON THE LIST
                </h3>
                <p className="text-veo-muted text-sm">
                  Check your inbox for your comprehensive audit report.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
