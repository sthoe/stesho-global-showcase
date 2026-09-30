import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, MapPin, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import symbol from "@/assets/stesho-symbol.png";
import hero from "@/assets/architectural-home.jpg";
import windowDetail from "@/assets/window-detail.jpg";
import slidingDoors from "@/assets/sliding-doors.jpg";
import rooflight from "@/assets/rooflight.jpg";
import veranda from "@/assets/veranda-doors.png.asset.json";
import entrance from "@/assets/entrance-door.png.asset.json";
import tiltTurn from "@/assets/tilt-turn-interior.png.asset.json";
import videoAsset from "@/assets/parallel_windows.mp4.asset.json";
import videoWebm from "@/assets/parallel_windows.webm.asset.json";
import videoPoster from "@/assets/parallel_windows_poster.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stesho Global | uPVC Tilt N Turn Windows, Doors & Rooftrim — Harare" },
      { name: "description", content: "Southern Africa's No 1 uPVC home improvement provider. Stesho Global manufactures and installs uPVC tilt n turn windows, doors and rooftrim — fascias, gutters, soffits and downpipes. Showroom: 15 Bodle Avenue, Harare. The future is now." },
      { property: "og:title", content: "Stesho Global | uPVC Windows, Doors & Rooftrim — The Future Is Now" },
      { property: "og:description", content: "One-stop manufacturer and installer of uPVC tilt n turn windows, doors and rooftrim. Based in Harare, serving Southern Africa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

type Showcase = { number: string; title: string; detail: string; image: string; alt: string; kind: string };

const showcases: Showcase[] = [
  { number: "01", title: "Tilt n turn windows", detail: "One handle. Two ways to open.", image: tiltTurn.url, alt: "White uPVC tilt and turn windows opening into a bright conservatory interior", kind: "Supplied imagery" },
  { number: "02", title: "Veranda doors", detail: "Fold the whole wall away.", image: veranda.url, alt: "White uPVC bi-fold veranda doors folded open onto a tiled veranda", kind: "Supplied imagery" },
  { number: "03", title: "Entrance doors", detail: "A welcome that seals tight.", image: entrance.url, alt: "White uPVC French entrance doors on a brick home", kind: "Supplied imagery" },
  { number: "04", title: "Sliding doors", detail: "A more open way to live.", image: slidingDoors, alt: "Illustrative sliding glass doors opening onto a garden", kind: "Concept imagery" },
  { number: "05", title: "Roof glazing", detail: "Bring daylight into the plan.", image: rooflight, alt: "Illustrative glass rooflight over a contemporary interior", kind: "Concept imagery" },
  { number: "06", title: "Architectural windows", detail: "Clean lines. Considered views.", image: windowDetail, alt: "Illustrative black-framed architectural window detail", kind: "Concept imagery" },
];

const rooftrim = ["Fascia boards", "Gutters", "Soffits", "Downpipes"];

function Brand({ inverted = false }: { inverted?: boolean }) {
  return <a href="#top" aria-label="Stesho Global, back to top" className="flex shrink-0 items-center gap-2.5">
    <img src={symbol} alt="" width={44} height={44} className="h-9 w-10 object-contain" />
    <span className={`text-[15px] font-extrabold uppercase leading-none ${inverted ? "text-primary-foreground" : "text-foreground"}`}>Stesho <span className="block font-medium">Global</span></span>
  </a>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Showcase | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [briefSaved, setBriefSaved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = () => {
    setVideoStarted(true);
    videoRef.current?.play().catch(() => {});
    document.getElementById("film")?.scrollIntoView({ behavior: "smooth" });
  };

  const saveBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const content = `STESHO GLOBAL — PROJECT INQUIRY\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nProject brief:\n${data.get("brief")}\n`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    link.download = "stesho-global-project-inquiry.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    setBriefSaved(true);
  };

  return <div id="top" className="overflow-x-hidden bg-background text-foreground">
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-6 md:px-10 xl:px-16">
        <Brand />
        <div className="hidden items-center gap-9 font-mono text-[11px] uppercase text-muted-foreground lg:flex">
          <a className="hover:text-accent" href="#company">Company</a>
          <a className="hover:text-accent" href="#gallery">Windows & doors</a>
          <a className="hover:text-accent" href="#tilt">Tilt n turn</a>
          <a className="hover:text-accent" href="#film">In motion</a>
          <a className="hover:text-accent" href="#contact">Your project</a>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="architectural" className="hidden h-10 px-6 sm:inline-flex"><a href="#contact">Enquire <ArrowUpRight /></a></Button>
          <Button variant="architecturalOutline" size="icon" className="h-10 w-10 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <div className="flex flex-col border-t border-border bg-background px-6 py-5 font-mono text-xs uppercase lg:hidden">
        {[["Company", "#company"], ["Windows & doors", "#gallery"], ["Tilt n turn", "#tilt"], ["In motion", "#film"], ["Your project", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3">{label}</a>)}
      </div>}
    </nav>

    <header id="about" className="mx-auto max-w-[1440px] px-6 pb-12 pt-9 md:px-10 md:pb-16 md:pt-20 xl:px-16">
      <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
        <div className="animate-rise md:col-span-9">
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase text-accent"><span className="h-px w-8 bg-accent" /> SOUTHERN AFRICA'S NO 1 uPVC HOME IMPROVEMENT PROVIDER</div>
          <h1 className="max-w-[1000px] font-display text-[clamp(3.5rem,7.1vw,7.6rem)] font-extrabold uppercase leading-[0.93]">
            The future<br /><span className="text-accent">is now.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg">uPVC tilt n turn windows and doors — the ultimate material for the elegant house — manufactured and installed by Stesho Global.</p>
        </div>
        <div className="animate-rise hidden border-t border-border pt-5 font-mono text-[10px] uppercase leading-8 text-muted-foreground md:col-span-3 md:block md:pb-2">
          <div><span className="mr-4 text-accent">01 /</span>Tilt n turn windows</div>
          <div><span className="mr-4 text-accent">02 /</span>Doors</div>
          <div><span className="mr-4 text-accent">03 /</span>Rooftrim & glazing</div>
        </div>
      </div>
      <div className="relative mt-9 overflow-hidden md:mt-16">
        <img src={hero} alt="Illustrative modern home with expansive floor-to-ceiling glass doors at dusk" width={1920} height={1088} className="h-[300px] w-full object-cover sm:h-[430px] lg:h-[560px]" fetchPriority="high" />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-primary/80 px-5 py-4 font-mono text-[10px] uppercase text-primary-foreground backdrop-blur-sm sm:px-7"><span>The future is now</span><span className="hidden sm:inline">Concept imagery / Design inspiration</span><ArrowDown className="size-4" /></div>
      </div>
    </header>

    <section id="company" className="border-y border-border bg-secondary py-16 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 md:grid-cols-12 md:gap-16 md:px-10 xl:px-16">
        <div className="md:col-span-7">
          <p className="mb-4 font-mono text-[10px] uppercase text-accent">01 / THE COMPANY</p>
          <h2 className="text-4xl font-bold uppercase md:text-5xl">One stop. uPVC everything.</h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">Stesho Global is a one-stop manufacturer and installer of uPVC windoors, doors and rooftrim materials. Based at our showroom in Harare, we hold a strategic position to provide our services to the whole of Southern Africa — from a single tilt n turn window to a full rooftrim refit.</p>
          <p className="mt-10 border-t border-border pt-5 font-mono text-[10px] uppercase text-muted-foreground">Rooftrim /</p>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {rooftrim.map(item => <div key={item} className="border-l border-accent pl-3"><p className="font-mono text-[10px] uppercase text-foreground">{item}</p></div>)}
          </div>
        </div>
        <div className="self-start border-t border-border font-mono text-[10px] uppercase md:col-span-5">
          <div className="flex items-start gap-3 border-b border-border py-5"><MapPin className="mt-0.5 size-4 shrink-0 text-accent" /><div><p className="text-muted-foreground">Showroom</p><p className="mt-2 text-xs font-bold normal-case leading-relaxed text-foreground sm:text-sm">15 Bodle Avenue, Harare, Zimbabwe</p></div></div>
          <div className="border-b border-border py-5"><p className="text-muted-foreground">Coverage</p><p className="mt-2 text-xs font-bold leading-relaxed text-foreground sm:text-sm">The whole of Southern Africa</p></div>
          <div className="py-5"><p className="text-muted-foreground">Speciality</p><p className="mt-2 text-xs font-bold leading-relaxed text-foreground sm:text-sm">uPVC tilt n turn windows and doors</p></div>
        </div>
      </div>
    </section>

    <section id="gallery" className="py-16 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end md:mb-16">
          <div><p className="mb-4 font-mono text-[10px] uppercase text-accent">02 / POSSIBILITIES</p><h2 className="text-4xl font-bold uppercase md:text-5xl">Spaces, reimagined.</h2></div>
          <p className="max-w-[290px] text-sm leading-relaxed text-muted-foreground">uPVC windows, doors and glazing in the forms and finishes that shape the way we live.</p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-7 md:gap-y-14 lg:gap-x-9">
          {showcases.map((item, index) => <Button key={item.number} variant="ghost" type="button" onClick={() => setSelected(item)} className={`group h-auto min-w-0 flex-col items-stretch justify-start gap-0 whitespace-normal rounded-none p-0 text-left hover:bg-transparent ${index % 3 === 1 ? "md:translate-y-8" : ""}`} aria-label={`View ${item.title} image`}>
            <div className="overflow-hidden bg-secondary"><img src={item.image} alt={item.alt} width={800} height={1008} loading="lazy" className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035] sm:aspect-[4/5]" /></div>
            <div className="mt-4 flex items-start justify-between gap-4 border-t border-border pt-4"><div><h3 className="text-sm font-bold uppercase text-foreground">{item.title}</h3><p className="mt-1 font-mono text-[11px] font-normal text-muted-foreground">{item.detail}</p><p className="mt-3 font-mono text-[9px] font-normal uppercase text-muted-foreground">{item.kind}</p></div><ArrowUpRight className="size-4 shrink-0 text-accent" /></div>
          </Button>)}
        </div>
        <p className="mt-12 font-mono text-[10px] uppercase leading-relaxed text-muted-foreground md:mt-20">Concept imagery shows design inspiration, not completed Stesho Global projects.</p>
      </div>
    </section>

    <section id="tilt" className="border-y border-border bg-surface py-16 md:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-9 px-6 md:grid-cols-2 md:gap-16 md:px-10 xl:px-16">
        <div className="overflow-hidden bg-secondary"><img src={tiltTurn.url} alt="White uPVC tilt and turn window tilted inward in a bright interior" width={1140} height={894} loading="lazy" className="aspect-[5/4] w-full object-cover sm:aspect-[16/11]" /></div>
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase text-accent">03 / THE MECHANISM</p>
          <h2 className="text-4xl font-bold uppercase leading-tight md:text-5xl">Two turns.<br />Total control.</h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">The unique hinge design of uPVC tilt n turn windows lets you use them in a variety of ways. Turn the handle once and only the top opens, locking into place — so you control the fresh air entering your home even when you're not there, with no worry about security or the weather.</p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">Turn the handle once more and the side hinge swings into action, opening the window fully inward for even more ventilation — and easy access for cleaning, from inside your home.</p>
        </div>
      </div>
    </section>

    <section id="film" className="bg-primary py-16 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10 xl:px-16">
        <div><p className="mb-8 font-mono text-[10px] uppercase text-accent">04 / IN MOTION</p><h2 className="max-w-xl text-4xl font-extrabold uppercase leading-[1.06] md:text-5xl lg:text-6xl">Windows,<br />in motion.</h2><p className="mb-9 mt-7 max-w-md text-base leading-relaxed text-dark-muted">Take a closer look at a uPVC window presentation.</p><Button variant="architecturalDark" className="h-12 gap-4 px-5" onClick={startVideo}><Play className="fill-current" /> Watch the video <ArrowRight /></Button></div>
        <div className="relative overflow-hidden bg-secondary/10"><video ref={videoRef} controls={videoStarted} playsInline preload="metadata" poster={videoPoster.url} onPlay={() => setVideoStarted(true)} className="aspect-[640/352] w-full object-cover" aria-label="Window presentation video"><source src={videoWebm.url} type="video/webm" /><source src={videoAsset.url} type="video/mp4" /></video>{!videoStarted && <Button variant="architecturalDark" size="icon" className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/80" aria-label="Play window presentation video" onClick={startVideo}><Play className="fill-current" /></Button>}</div>
      </div>
    </section>

    <section id="contact" className="px-6 py-16 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto grid max-w-[1312px] gap-10 border-t border-border pt-12 md:grid-cols-12 md:gap-20 md:pt-24">
        <div className="md:col-span-5"><p className="mb-7 font-mono text-[10px] uppercase text-accent">05 / YOUR PROJECT</p><h2 className="max-w-sm text-4xl font-bold uppercase leading-tight md:text-5xl">Plan your project.</h2><p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Planning new windows, doors or rooftrim? Save a brief to bring to our showroom at 15 Bodle Avenue, Harare.</p></div>
        <form onSubmit={saveBrief} className="grid gap-x-6 gap-y-7 md:col-span-7 sm:grid-cols-2">
          <label className="block border-b border-border pb-2 focus-within:border-accent"><span className="font-mono text-[10px] uppercase text-muted-foreground">Your name</span><input name="name" required placeholder="Name" className="mt-2 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60" /></label>
          <label className="block border-b border-border pb-2 focus-within:border-accent"><span className="font-mono text-[10px] uppercase text-muted-foreground">Email address</span><input name="email" type="email" required placeholder="you@example.com" className="mt-2 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60" /></label>
          <label className="block border-b border-border pb-2 focus-within:border-accent sm:col-span-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">Your project</span><textarea name="brief" required rows={4} placeholder="Tell us about your space, your ideas, and what you need..." className="mt-2 w-full resize-y bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60" /></label>
          <div className="flex flex-col items-start gap-3 sm:col-span-2"><Button variant="architectural" className="h-12 px-6" type="submit"><Download /> Save project brief</Button><p role="status" className="text-xs text-muted-foreground">{briefSaved ? "Your brief was downloaded. It has not been sent." : "Your brief downloads to your device; it is not sent yet."}</p></div>
        </form>
      </div>
    </section>

    <footer className="border-t border-border bg-secondary py-10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-6 md:flex-row md:items-end md:px-10 xl:px-16"><div><Brand /><p className="mt-5 max-w-xs text-sm text-muted-foreground">uPVC windows, doors and rooftrim. The future is now.</p><p className="mt-3 font-mono text-[10px] uppercase text-muted-foreground">Showroom: 15 Bodle Avenue, Harare, Zimbabwe</p></div><div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase text-muted-foreground"><a href="#gallery" className="hover:text-accent">Explore</a><a href="#film" className="hover:text-accent">Watch</a><a href="#contact" className="hover:text-accent">Enquire</a><span>© {new Date().getFullYear()} Stesho Global</span></div></div></footer>

    {selected && <div role="dialog" aria-modal="true" aria-label={`${selected.title} image`} className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 p-4" onClick={() => setSelected(null)} onKeyDown={event => { if (event.key === "Escape") setSelected(null); }}><div className="relative max-h-full max-w-4xl" onClick={event => event.stopPropagation()}><Button variant="architecturalDark" size="icon" className="absolute right-0 top-0 z-10 h-10 w-10 bg-primary" aria-label="Close image" onClick={() => setSelected(null)}><X /></Button><img src={selected.image} alt={selected.alt} width={800} height={1008} className="max-h-[78vh] w-auto max-w-full object-contain" /><div className="flex justify-between gap-4 bg-primary py-4 text-primary-foreground"><span className="text-sm font-bold uppercase">{selected.title}</span><span className="font-mono text-[10px] uppercase text-dark-muted">{selected.kind}</span></div></div></div>}
  </div>;
}
