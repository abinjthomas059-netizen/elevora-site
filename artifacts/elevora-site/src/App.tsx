import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Layers3,
  LifeBuoy,
  Mail,
  Menu,
  MonitorSmartphone,
  MoveUpRight,
  SearchCheck,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import brandBoard from '@assets/1787634103587_1787634748486.png';
import founderPhoto from '@assets/IMG_20260713_175045395_(1)_1787634800612.jpg';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', project: '', details: '' });

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setFormSent(true);
    } catch (error) {
      setSubmitError('Something went wrong — please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-noise min-h-[100dvh] overflow-x-hidden bg-[#f2f0ec] text-[#24262a]">
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-[#24262a]/10 bg-[#f2f0ec]/85 px-4 py-3 backdrop-blur-md sm:px-6">
          <button type="button" onClick={() => jumpTo('top')} className="flex items-center gap-3" data-testid="button-home">
            <LogoMark small />
            <span className="font-display text-lg font-semibold tracking-[-.04em]">ELEVORA</span>
          </button>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#435b71] md:flex">
            <button onClick={() => jumpTo('work')} data-testid="link-work">Work</button>
            <button onClick={() => jumpTo('approach')} data-testid="link-approach">Approach</button>
            <button onClick={() => jumpTo('about')} data-testid="link-about">About</button>
            <button onClick={() => jumpTo('contact')} data-testid="link-contact">Contact</button>
          </div>
          <button onClick={() => jumpTo('contact')} className="blue-button hidden items-center gap-2 rounded-full bg-[#1686ff] px-5 py-2.5 text-sm font-semibold text-white md:flex" data-testid="button-start-project">
            Start a project <ArrowUpRight size={15} />
          </button>
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-[#24262a]/15 p-2.5 md:hidden" aria-label="Toggle navigation" data-testid="button-menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-[1400px] rounded-3xl border border-[#24262a]/10 bg-[#f2f0ec] p-5 shadow-lg md:hidden">
            {['work', 'approach', 'about', 'contact'].map((item) => (
              <button key={item} onClick={() => jumpTo(item)} className="block w-full border-b border-[#24262a]/10 py-3 text-left text-sm font-semibold capitalize last:border-0" data-testid={`mobile-link-${item}`}>
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative grid min-h-[780px] grid-cols-1 overflow-hidden px-6 pb-16 pt-36 sm:px-10 lg:min-h-[900px] lg:grid-cols-[1.1fr_.9fr] lg:px-16 lg:pt-40">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="pointer-events-none absolute -right-40 top-28 h-[34rem] w-[34rem] rounded-full bg-[#1686ff]/10 blur-3xl" />
          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center lg:col-span-2">
            <div className="max-w-3xl">
              <div className="reveal mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-[#435b71]">
                <span className="h-2 w-2 rounded-full bg-[#1686ff]" /> Digital design &amp; websites
              </div>
              <h1 className="reveal font-display text-[clamp(4.2rem,11vw,10rem)] font-semibold leading-[.88] tracking-[-.085em] text-[#24262a]" style={{ transitionDelay: '80ms' }}>
                Make your<br /><span className="text-[#1686ff]">presence</span><br />matter.
              </h1>
              <p className="reveal mt-10 max-w-md text-lg leading-8 text-[#435b71]" style={{ transitionDelay: '160ms' }}>
                Elevora turns good ideas into clear, credible online experiences — made to feel like you, only sharper.
              </p>
              <div className="reveal mt-9 flex flex-wrap items-center gap-5" style={{ transitionDelay: '240ms' }}>
                <button onClick={() => jumpTo('contact')} className="blue-button flex items-center gap-3 rounded-full bg-[#1686ff] px-6 py-3.5 text-sm font-semibold text-white" data-testid="button-hero-contact">
                  Tell us what you&apos;re building <ArrowRight size={16} />
                </button>
                <button onClick={() => jumpTo('work')} className="group flex items-center gap-2 text-sm font-semibold text-[#24262a]" data-testid="button-see-work">
                  See the work <span className="transition-transform group-hover:translate-x-1"><ArrowDown size={15} /></span>
                </button>
              </div>
            </div>
            <div className="reveal mt-24 flex items-end justify-between border-t border-[#24262a]/15 pt-5 lg:mt-28" style={{ transitionDelay: '320ms' }}>
              <span className="text-xs font-semibold uppercase tracking-[.18em] text-[#435b71]">Based in India · Working everywhere</span>
              <LogoMark className="hidden opacity-20 sm:block" />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-14 right-10 hidden h-72 w-72 lg:block">
            <LogoMark className="h-full w-full text-[#1686ff]/90" />
          </div>
        </section>

        <section className="border-y border-[#f2f0ec]/20 bg-[#24262a] px-6 py-6 text-[#f2f0ec] sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-5 text-xs font-medium uppercase tracking-[.18em] text-[#f2f0ec]/65">
            <span>For ideas with somewhere to go</span>
            <span className="hidden h-px flex-1 bg-[#f2f0ec]/20 sm:block" />
            <span className="text-[#1686ff]">Websites · Presence · Direction</span>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
          <div className="mx-auto max-w-[1400px]">
            <SectionIntro eyebrow="Selected directions" title={<>Designed to be <span className="text-[#1686ff]">remembered.</span></>} copy="A website should do more than exist. It should make the right people pause, understand, and take the next step." />
            <div className="mt-16 grid gap-6 md:grid-cols-[1.25fr_.75fr]">
              <WorkCard number="01" title="The local standard" category="Business website · Strategy + design" className="bg-[#435b71] text-[#f2f0ec]" visual="local" />
              <WorkCard number="02" title="A clearer point of view" category="Personal brand · Portfolio" className="bg-[#d6e4ef] text-[#24262a]" visual="portfolio" />
              <WorkCard number="03" title="From interest to action" category="Launch page · Conversion" className="bg-[#1686ff] text-white md:col-span-2" visual="launch" />
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 bg-[#24262a] px-6 py-28 text-[#f2f0ec] sm:px-10 lg:px-16 lg:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="reveal grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#1686ff]">The Elevora approach</p>
                <h2 className="font-display text-5xl font-semibold leading-[.98] tracking-[-.07em] sm:text-7xl">A good process<br /><span className="text-[#1686ff]">shows in the work.</span></h2>
              </div>
              <div className="lg:pt-16">
                <p className="max-w-xl text-lg leading-8 text-[#f2f0ec]/65">You bring the ambition. We bring the questions, the structure, and the care to make it land. No black boxes. No handoffs to decipher.</p>
                <div className="mt-12 grid border-t border-[#f2f0ec]/20 sm:grid-cols-2">
                  {[
                    ['01', 'Understand', 'Your business, audience, and the thing you want people to feel.'],
                    ['02', 'Shape', 'A clear direction for content, structure, and visual language.'],
                    ['03', 'Create', 'A considered website that holds up on every screen.'],
                    ['04', 'Refine', 'Thoughtful rounds of review, testing, and polish.'],
                    ['05', 'Launch', 'A calm handover, ready for the real world.'],
                    ['06', 'Support', 'A partner for the next chapter, not just launch day.'],
                  ].map(([number, title, copy]) => (
                    <div key={number} className="border-b border-[#f2f0ec]/20 py-6 sm:pr-8">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs text-[#1686ff]">{number}</span>
                        <Check size={15} className="text-[#1686ff]" />
                      </div>
                      <h3 className="font-display text-xl font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#f2f0ec]/55">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#d6e4ef] px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="reveal relative overflow-hidden rounded-[2rem] bg-[#435b71] p-5 sm:p-8">
              <img src={brandBoard} alt="Elevora brand concept board" className="aspect-[1.2/1] w-full rounded-[1.35rem] object-cover object-center opacity-90 mix-blend-screen" data-testid="img-brand-board" />
              <span className="absolute bottom-9 left-9 rounded-full bg-[#24262a] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.15em] text-[#f2f0ec]">The visual language</span>
            </div>
            <div id="about" className="reveal scroll-mt-24 lg:pl-12">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#435b71]">Not just a website</p>
              <h2 className="font-display text-5xl font-semibold leading-[.98] tracking-[-.07em] sm:text-7xl">Clarity is a<br /><span className="text-[#1686ff]">competitive edge.</span></h2>
              <p className="mt-8 max-w-lg text-lg leading-8 text-[#435b71]">The strongest online presence is rarely the loudest. It is the one that makes a business feel understood — and makes choosing it feel easy.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Business websites', 'Portfolios', 'Landing pages', 'Redesigns', 'Launch support'].map((item) => <span key={item} className="rounded-full border border-[#435b71]/25 px-4 py-2 text-sm text-[#435b71]">{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
          <div className="mx-auto max-w-[1400px]">
            <div className="reveal grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#435b71]">Built for your next move</p>
                <h2 className="font-display text-5xl font-semibold leading-[.98] tracking-[-.07em] sm:text-7xl">Everything you need.<br /><span className="text-[#1686ff]">Nothing you don&apos;t.</span></h2>
              </div>
              <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-[#24262a]/15 bg-[#24262a]/15 sm:grid-cols-2">
                <Feature icon={<MonitorSmartphone />} title="Responsive by nature" copy="A polished experience on a phone, tablet, and the biggest screen in the room." />
                <Feature icon={<Layers3 />} title="A system, not a page" copy="Flexible foundations that can grow with the business you are building." />
                <Feature icon={<SearchCheck />} title="Easy to find" copy="Clear content, sensible structure, and the basics that help search work harder." />
                <Feature icon={<LifeBuoy />} title="Support after launch" copy="A real person to help when you need a tweak, a question answered, or a next step." />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#24262a]/10 bg-[#f2f0ec] px-6 py-28 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="reveal order-2 lg:order-1">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#435b71]">A note from the studio</p>
              <blockquote className="font-display text-4xl font-medium leading-[1.05] tracking-[-.055em] sm:text-6xl">“The best work starts with listening closely.”</blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-10 bg-[#1686ff]" />
                <div><p className="font-semibold">Abin J Thomas</p><p className="text-sm text-[#435b71]">Founder, Elevora</p></div>
              </div>
              <p className="mt-8 max-w-md text-base leading-7 text-[#435b71]">I started Elevora for people with good work and a website that does not quite show it yet. The goal is simple: give your ideas a digital home that feels as thoughtful as the work behind it.</p>
            </div>
            <div className="reveal image-hover order-1 relative mx-auto w-full max-w-md lg:order-2 lg:justify-self-end">
              <div className="absolute -bottom-5 -left-5 h-28 w-28 border-b border-l border-[#1686ff]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#435b71]">
                <img src={founderPhoto} alt="Abin J Thomas, founder of Elevora" className="h-full w-full object-cover object-[50%_20%] grayscale-[15%]" data-testid="img-founder" />
              </div>
              <div className="absolute -right-4 top-7 rounded-full bg-[#1686ff] px-4 py-2 text-xs font-semibold text-white">Hello, I&apos;m Abin</div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-[#1686ff] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[.85fr_1.15fr]">
            <div className="reveal">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-white/70">Let&apos;s make it real</p>
              <h2 className="font-display text-6xl font-semibold leading-[.9] tracking-[-.08em] sm:text-8xl">Have a<br />good idea?</h2>
              <p className="mt-8 max-w-sm text-lg leading-8 text-white/80">Tell us where you are and where you want to go. We&apos;ll reply with a thoughtful next step.</p>
              <a href="mailto:hello@elevora.in" className="mt-10 flex w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold" data-testid="link-email"><Mail size={16} /> hello@elevora.in</a>
            </div>
            <div className="reveal rounded-[1.5rem] bg-[#f2f0ec] p-6 text-[#24262a] sm:p-9">
              {formSent ? (
                <div className="flex min-h-[390px] flex-col items-start justify-center">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#1686ff] text-white"><Check size={22} /></div>
                  <h3 className="font-display text-4xl font-semibold tracking-[-.05em]">Message received.</h3>
                  <p className="mt-4 max-w-sm leading-7 text-[#435b71]">Thanks for sharing a little of what you&apos;re building. We&apos;ll be in touch soon with a clear next step.</p>
                  <button onClick={() => { setFormSent(false); setForm({ name: '', email: '', project: '', details: '' }); }} className="mt-8 text-sm font-semibold text-[#1686ff]" data-testid="button-send-another">Send another note <ArrowRight className="ml-1 inline" size={15} /></button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7" data-testid="form-contact">
                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="Your name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required id="input-name" />
                    <Field label="Email address" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required id="input-email" />
                  </div>
                  <Field label="What are you building?" value={form.project} onChange={(value) => setForm({ ...form, project: value })} required id="input-project" />
                  <label className="block text-sm font-semibold" htmlFor="input-details">A little more about it <span className="font-normal text-[#435b71]">(optional)</span>
                    <textarea id="input-details" value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} rows={4} className="mt-3 block w-full resize-none border-b border-[#24262a]/25 bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#1686ff]" data-testid="input-details" />
                  </label>
                  <button type="submit" disabled={submitting} className="blue-button flex w-full items-center justify-center gap-3 rounded-full bg-[#24262a] px-6 py-4 text-sm font-semibold text-[#f2f0ec] disabled:opacity-60" data-testid="button-submit-contact">{submitting ? 'Sending...' : 'Send your note'} <ArrowUpRight size={16} /></button>
                  {submitError && <p className="text-center text-xs text-red-500" data-testid="text-submit-error">{submitError}</p>}
                  <p className="text-center text-xs text-[#435b71]">No sales pitch. Just a considered reply.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#24262a] px-6 py-10 text-[#f2f0ec] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-10 border-b border-[#f2f0ec]/15 pb-12 md:flex-row md:items-end md:justify-between">
            <div><div className="flex items-center gap-3"><LogoMark small /><span className="font-display text-2xl font-semibold tracking-[-.05em]">ELEVORA</span></div><p className="mt-4 text-sm text-[#f2f0ec]/55">Your Vision. Elevated.</p></div>
            <button onClick={() => jumpTo('top')} className="flex items-center gap-2 text-sm font-semibold text-[#1686ff]" data-testid="button-back-top">Back to top <ArrowUpRight size={15} /></button>
          </div>
          <div className="flex flex-col gap-5 pt-7 text-xs text-[#f2f0ec]/45 sm:flex-row sm:items-center sm:justify-between"><span>© 2025 Elevora Studio. Made for the next chapter.</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1686ff]" /> Available for select projects</span></div>
        </div>
      </footer>
    </div>
  );
}

function LogoMark({ small = false, className = '' }: { small?: boolean; className?: string }) {
  return <svg viewBox="0 0 100 100" className={`${small ? 'h-6 w-6' : 'h-20 w-20'} ${className}`} fill="none" aria-hidden="true">
    <path d="M50 7 91 48H71L50 27 29 48H9L50 7Z" fill="currentColor" />
    <path d="m50 29 28 28H60L50 47 40 57H22l28-28Z" fill="currentColor" />
    <path d="m50 50 18 18-18 18-18-18 18-18Z" stroke="currentColor" strokeWidth="7" />
  </svg>;
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <div className="reveal grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
    <div><p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-[#435b71]">{eyebrow}</p><h2 className="font-display text-5xl font-semibold leading-[.96] tracking-[-.07em] sm:text-7xl">{title}</h2></div>
    <p className="max-w-md text-lg leading-8 text-[#435b71] lg:justify-self-end">{copy}</p>
  </div>;
}

function WorkCard({ number, title, category, className, visual }: { number: string; title: string; category: string; className: string; visual: string }) {
  return <article className={`group reveal relative min-h-[360px] overflow-hidden rounded-[1.5rem] p-7 sm:min-h-[460px] sm:p-10 ${className}`} data-testid={`card-work-${number}`}>
    <div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="text-xs font-semibold tracking-[.2em] opacity-60">{number}</span><MoveUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] opacity-65">{category}</p><h3 className="font-display text-4xl font-semibold leading-none tracking-[-.06em] sm:text-6xl">{title}</h3></div></div>
    <div className={`pointer-events-none absolute transition-transform duration-700 group-hover:scale-105 ${visual === 'local' ? 'bottom-[-4rem] right-[-2rem] h-64 w-64 rotate-12 border-[24px] border-[#1686ff]/80' : visual === 'portfolio' ? 'bottom-[-5rem] right-[-3rem] h-72 w-72 rounded-full border-[32px] border-[#f2f0ec]/75' : 'bottom-[-5rem] right-[12%] h-72 w-72 rotate-45 border-[34px] border-[#f2f0ec]/25'}`} />
  </article>;
}

function Feature({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return <div className="bg-[#f2f0ec] p-7 transition-colors duration-300 hover:bg-[#d6e4ef] sm:p-9"><div className="mb-16 flex h-10 w-10 items-center justify-center rounded-full bg-[#1686ff] text-white">{icon}</div><h3 className="font-display text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#435b71]">{copy}</p></div>;
}

function Field({ label, value, onChange, type = 'text', required = false, id }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; id: string }) {
  return <label className="block text-sm font-semibold" htmlFor={id}>{label}{required && <span className="ml-1 text-[#1686ff]">*</span>}<input id={id} type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 block w-full border-b border-[#24262a]/25 bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#1686ff]" data-testid={id} /></label>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
