import { useEffect, useRef } from 'react';
import explain1 from '../assets/bg/explain1.mp4';
import explain2 from '../assets/bg/explain2.mp4';

const PERKS = [
  { icon: '🎨', title: 'Custom App Icon', desc: 'Get a personalized app icon with your photo or campus branding.' },
  { icon: '🏷️', title: 'Exclusive Banner', desc: 'Your name on a custom banner featured inside the app.' },
  { icon: '⚡', title: 'Light and Dark Mode', desc: 'Switch between light and dark themes based on your preference.' },
  { icon: '🏆', title: 'Beta Badge', desc: 'A permanent beta tester badge on your profile.' },
];

export default function BetaSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="beta" className="relative overflow-hidden bg-slate-950 px-6 py-24 sm:px-8 md:py-28 lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            bottom: '-20%',
            right: '-10%',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            top: '-10%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 lg:gap-24">
        <div className="text-center">
          <p className="mx-auto mb-4 max-w-[24rem] text-xs uppercase tracking-[0.24em] text-violet-400">
            Limited Spots
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Join 100 Beta Testers
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Be among the first 100 users and unlock exclusive benefits — custom banners, personalized icons, and much more.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:items-center">
          <div ref={leftRef} className="scroll-fade grid gap-4 sm:grid-cols-2">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="rounded-[1.125rem] border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-violet-400/30 hover:bg-white/10"
              >
                <div className="mb-3 text-3xl">{perk.icon}</div>
                <div className="mb-2 text-sm font-semibold text-white">{perk.title}</div>
                <div className="text-xs leading-6 text-slate-300">{perk.desc}</div>
              </div>
            ))}


          </div>

          <div ref={rightRef} className="scroll-fade relative overflow-hidden flex items-center justify-center">
            <video autoPlay muted controls src={explain1} className="w-full max-h-[500px] object-contain rounded-xl" />
            {/* <video controls src={explain2} className="w-32 h-32 object-cover rounded-lg" /> */}
          </div>
        </div>

        <div className="flex justify-center w-full mt-4 lg:mt-0">
          <a href="#download" className="btn-silver-glass inline-flex justify-center px-10 py-5 text-base font-semibold sm:w-auto w-full transition-transform hover:scale-105">
            Claim Your Spot →
          </a>
        </div>
      </div>
    </section>
  );
}
