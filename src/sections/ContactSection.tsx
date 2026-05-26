import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const budgetOptions = [
  'Under $25K',
  '$25K - $50K',
  '$50K - $100K',
  '$100K - $250K',
  '$250K+',
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        left,
        { x: '-6vw', opacity: 0 },
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

      // Form animation
      gsap.fromTo(
        form,
        { x: '6vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
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

      // Form fields stagger
      const fields = form.querySelectorAll('.form-field');
      gsap.fromTo(
        fields,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      await fetch("https://formsubmit.co/ajax/carolineveo3ro@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Company: formData.company,
          Budget: formData.budget,
          Message: formData.message,
          _subject: `New Lead from Veo Edge Studio - ${formData.company || formData.name}`
        })
      });
    } catch (error) {
      console.error("Error submitting form to FormSubmit", error);
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 lg:py-32 bg-veo-dark"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Content */}
          <div
            ref={leftRef}
            className="w-full lg:w-2/5"
            style={{ opacity: 0 }}
          >
            <span className="font-mono text-xs text-veo-muted mb-4 block">
              CONTACT
            </span>
            <h2 className="font-display text-display-2 text-veo-light mb-6">
              LET&apos;S BUILD SOMETHING SHARP.
            </h2>
            <p className="text-veo-muted text-sm leading-relaxed mb-12 max-w-sm">
              Tell us what you&apos;re making or what process needs optimizing. We&apos;ll respond within two business days with next steps.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-veo-indigo/10 flex items-center justify-center">
                  <Mail size={18} className="text-veo-indigo" />
                </div>
                <div>
                  <span className="font-mono text-xs text-veo-muted block mb-1">
                    EMAIL
                  </span>
                  <a
                    href="mailto:hello@veoedge.co.uk"
                    className="text-veo-light hover:text-veo-indigo transition-colors"
                  >
                    hello@veoedge.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-veo-indigo/10 flex items-center justify-center">
                  <MapPin size={18} className="text-veo-indigo" />
                </div>
                <div>
                  <span className="font-mono text-xs text-veo-muted block mb-1">
                    LOCATION
                  </span>
                  <span className="text-veo-light">
                    London / Remote
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            ref={formRef}
            className="w-full lg:w-3/5"
            style={{ opacity: 0 }}
          >
            <div className="glass rounded-2xl p-8 lg:p-10">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div className="form-field">
                      <label className="font-mono text-xs text-veo-muted mb-2 block">
                        NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-veo-dark/50 border border-veo-light/10 text-veo-light placeholder-veo-muted/50 font-mono text-sm focus:outline-none focus:border-veo-indigo transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="form-field">
                      <label className="font-mono text-xs text-veo-muted mb-2 block">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-veo-dark/50 border border-veo-light/10 text-veo-light placeholder-veo-muted/50 font-mono text-sm focus:outline-none focus:border-veo-indigo transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    {/* Company */}
                    <div className="form-field">
                      <label className="font-mono text-xs text-veo-muted mb-2 block">
                        COMPANY
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-veo-dark/50 border border-veo-light/10 text-veo-light placeholder-veo-muted/50 font-mono text-sm focus:outline-none focus:border-veo-indigo transition-colors"
                        placeholder="Your company"
                      />
                    </div>

                    {/* Budget */}
                    <div className="form-field">
                      <label className="font-mono text-xs text-veo-muted mb-2 block">
                        BUDGET
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-veo-dark/50 border border-veo-light/10 text-veo-light font-mono text-sm focus:outline-none focus:border-veo-indigo transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-veo-dark">
                          Select budget range
                        </option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option} className="bg-veo-dark">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field mb-8">
                    <label className="font-mono text-xs text-veo-muted mb-2 block">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-veo-dark/50 border border-veo-light/10 text-veo-light placeholder-veo-muted/50 font-mono text-sm focus:outline-none focus:border-veo-indigo transition-colors resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="magnetic w-full btn-glow px-8 py-4 rounded-xl bg-veo-indigo text-veo-light font-mono text-xs tracking-wider hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Send inquiry
                    <Send size={14} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-display text-xl text-veo-light mb-2">
                    MESSAGE SENT
                  </h3>
                  <p className="text-veo-muted text-sm">
                    We&apos;ll be in touch within two business days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
