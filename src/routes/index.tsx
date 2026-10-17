import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Send, MapPin, Menu, Wind, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import symbol from "@/assets/stesho-symbol.png";
import hero from "@/assets/stesho-garden-home.jpg";
import windowDetail from "@/assets/window-detail.jpg";
import slidingDoors from "@/assets/sliding-doors.jpg";
import rooflight from "@/assets/rooflight.jpg";
import veranda from "@/assets/veranda-doors.png.asset.json";
import entrance from "@/assets/entrance-door.png.asset.json";
import tiltTurn from "@/assets/tilt-turn-interior.png.asset.json";
import livingRoom from "@/assets/stesho-living-room.jpg";
import verandaConcept from "@/assets/stesho-veranda-concept.jpg";

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
  { number: "02", title: "Entrance doors", detail: "A welcome that seals tight.", image: entrance.url, alt: "White uPVC French entrance doors on a brick home", kind: "Supplied imagery" },
  { number: "03", title: "Veranda doors", detail: "Fold the whole wall away.", image: veranda.url, alt: "White uPVC bi-fold veranda doors folded open onto a tiled veranda", kind: "Supplied imagery" },
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
  const [galleryFilter, setGalleryFilter] = useState("All");
  const visibleShowcases = showcases.filter(item => galleryFilter === "All" || (galleryFilter === "Windows" ? item.title.includes("windows") : galleryFilter === "Doors" ? item.title.includes("doors") : item.title.includes("glazing")));
  const [briefStatus, setBriefStatus] = useState<"idle" | "ready">("idle");
  const saveBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const brief = String(data.get("brief") ?? "").trim();
    const subject = encodeURIComponent(`Project inquiry from ${name} — Stesho Global`);
    const body = encodeURIComponent(`Hi Steve,\n\nI'd like to discuss a project with Stesho Global.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nProject details:\n${brief}\n`);
    window.location.href = `mailto:stvshoniwa@yahoo.co.uk?subject=${subject}&body=${body}`;
    setBriefStatus("ready");
  };

  return <div id="top" className="overflow-x-hidden bg-background text-foreground">
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-6 md:px-10 xl:px-16">
        <Brand />
        <div className="hidden items-center gap-9 font-mono text-[11px] uppercase text-muted-foreground lg:flex">
          <a className="hover:text-accent" href="#company">Company</a>
          <a className="hover:text-accent" href="#gallery">Windows & doors</a>
          <a className="hover:text-accent" href="#tilt">Tilt n turn</a>
          <a className="hover:text-accent" href="#inspiration">Inspiration</a>
          <a className="hover:text-accent" href="#contact">Your project</a>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="architectural" className="hidden h-10 px-6 sm:inline-flex"><a href="#contact">Enquire <ArrowUpRight /></a></Button>
          <Button variant="architecturalOutline" size="icon" className="h-10 w-10 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <div className="flex flex-col border-t border-border bg-background px-6 py-5 font-mono text-xs uppercase lg:hidden">
        {[["Company", "#company"], ["Windows & doors", "#gallery"], ["Tilt n turn", "#tilt"], ["Inspiration", "#inspiration"], ["Your project", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3">{label}</a>)}
      </div>}
    </nav>

    <header id="about" className="relative isolate flex min-h-[480px] items-center overflow-hidden text-primary-foreground sm:min-h-[500px] lg:min-h-[560px]">
      <img src={hero} alt="Design inspiration: a garden home with white-framed doors opening onto a bright veranda" width={1920} height={1080} className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" fetchPriority="high" />
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-20 pt-12 md:px-10 lg:py-20 xl:px-16">
        <div className="animate-rise max-w-xl">
          <p className="mb-5 flex items-start gap-3 font-mono text-[10px] uppercase leading-5 text-primary-foreground/85"><span className="mt-2 h-px w-8 shrink-0 bg-accent" />Southern Africa's No 1 uPVC Home Improvement Provider</p>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.98] sm:text-6xl lg:text-7xl">Stesho<br />Global<span className="text-accent">.</span></h1>
          <p className="mt-5 text-lg font-medium sm:text-xl">The future is now.</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/85 sm:text-base">Considered windows. Welcoming doors. uPVC home improvements, manufactured and installed for the way you live.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="architectural" className="h-12 border border-accent bg-accent px-5 text-accent-foreground hover:bg-accent/90"><a href="#gallery">Explore windows & doors <ArrowRight /></a></Button>
            <Button asChild variant="architecturalDark" className="h-12 px-5"><a href="#contact">Your project <ArrowUpRight /></a></Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-primary-foreground/20"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 font-mono text-[9px] uppercase text-primary-foreground/80 md:px-10 xl:px-16"><span>Concept imagery / Design inspiration</span><a href="#gallery" aria-label="Explore windows and doors" className="flex items-center gap-3"><span className="hidden sm:inline">Discover the range</span><ArrowDown className="size-4" /></a></div></div>
    </header>

    <div className="border-b border-border bg-secondary"><div className="mx-auto grid max-w-[1440px] grid-cols-3 px-6 md:px-10 xl:px-16">{[["01", "Windows", "#tilt"], ["02", "Doors", "#gallery"], ["03", "Rooftrim", "#company"]].map(([number, label, href]) => <a key={number} href={href} className="group flex items-center justify-between gap-2 border-r border-border py-5 pr-4 first:pl-0 last:border-0 sm:px-6 sm:py-7"><div><span className="font-mono text-[9px] text-accent">{number} /</span><p className="mt-1 text-sm font-semibold sm:text-lg">{label}</p></div><ArrowUpRight className="size-4 shrink-0 text-accent transition-transform group-hover:-translate-y-1" /></a>)}</div></div>

    <section id="company" className="bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10 xl:gap-24 xl:px-16">
        <figure className="relative">
          <img src={livingRoom} alt="Design inspiration: white French doors opening from a sunlit living room to a garden" width={1536} height={1024} loading="lazy" className="aspect-[5/4] w-full object-cover" />
          <figcaption className="mt-3 font-mono text-[9px] uppercase text-muted-foreground">Design inspiration / The art of coming home</figcaption>
        </figure>
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase text-accent">01 / Meet Stesho Global</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Beautiful homes.<br />Thoughtfully made.</h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">Stesho Global is your one-stop manufacturer and installer of uPVC windows, doors and rooftrim. From our Harare showroom, we serve the whole of Southern Africa.</p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">From the first window to the finishing touches, bring a considered, elegant look to your home. The future is now.</p>
          <div className="mt-7 flex items-start gap-3"><MapPin className="mt-1 size-5 shrink-0 text-accent" /><div><p className="text-sm font-medium">Visit our showroom</p><p className="mt-1 text-sm leading-6 text-muted-foreground">15 Bodle Avenue, Harare, Zimbabwe</p></div></div>
          <div className="mt-7 border-t border-border pt-5"><p className="mb-2 text-xs font-semibold">The finishing details</p><p className="text-sm leading-6 text-muted-foreground">{rooftrim.join(" · ")}</p></div>
          <Button asChild variant="architecturalOutline" className="mt-7 h-11 px-5"><a href="#contact">Let's talk about your home <ArrowUpRight /></a></Button>
        </div>
      </div>
    </section>

    <section id="gallery" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <p className="mb-5 font-mono text-[10px] uppercase text-accent">02 / The collection</p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Open up the possibilities.</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground">A welcoming entrance. A brighter room. A seamless step outside. Find the windows and doors that feel right for your home.</p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-x-4 gap-y-1 sm:gap-x-7" role="group" aria-label="Filter the collection">{["All", "Windows", "Doors", "Glazing"].map(filter => <Button key={filter} variant="ghost" onClick={() => setGalleryFilter(filter)} aria-pressed={galleryFilter === filter} className={`h-11 rounded-none border-b-2 px-2 text-xs hover:bg-transparent hover:text-accent ${galleryFilter === filter ? "border-accent text-accent" : "border-transparent text-muted-foreground"}`}>{filter === "All" ? "All designs" : filter}</Button>)}</div>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:gap-x-12 xl:gap-y-14">
          {visibleShowcases.map(item => <Button key={item.number} variant="ghost" type="button" onClick={() => setSelected(item)} className="group h-auto min-w-0 flex-col items-stretch justify-start gap-0 whitespace-normal rounded-none p-0 text-left hover:bg-transparent" aria-label={`View ${item.title} image`}>
            <div className="relative w-full overflow-hidden bg-secondary"><img src={item.image} alt={item.alt} width={800} height={600} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /><span className="absolute bottom-3 left-3 bg-background/95 px-2.5 py-1.5 font-mono text-[9px] font-normal uppercase text-muted-foreground">{item.kind}</span></div>
            <div className="mt-5 flex items-center justify-between gap-4"><div className="min-w-0"><h3 className="text-xl font-semibold leading-snug text-foreground">{item.title}</h3><p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">{item.detail}</p></div><span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-colors group-hover:border-accent"><ArrowUpRight /></span></div>
          </Button>)}
        </div>
        <p className="mt-10 text-center text-xs leading-6 text-muted-foreground">Concept imagery is design inspiration, not completed Stesho Global projects.</p>
      </div>
    </section>

    <section id="tilt" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-5 font-mono text-[10px] uppercase text-accent">03 / Tilt n turn</p><h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">A little turn.<br />A whole new outlook.</h2></div><p className="max-w-sm text-sm leading-7 text-muted-foreground">Fresh air when you want it. Easy access when you need it. One window, two ways to open.</p></div>
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <figure><img src={tiltTurn.url} alt="Supplied photograph of white tilt and turn windows in a bright interior" width={1140} height={894} loading="lazy" className="aspect-[4/3] w-full object-cover" /><figcaption className="mt-3 font-mono text-[9px] uppercase text-muted-foreground">uPVC tilt n turn windows / Supplied imagery</figcaption></figure>
          <div className="flex flex-col justify-center">
            <div className="flex gap-5 border-b border-border pb-8"><Wind className="mt-1 size-7 shrink-0 text-accent" /><div><p className="mb-2 font-mono text-[10px] uppercase text-accent">01 / Tilt</p><h3 className="text-2xl font-semibold">Let the fresh air in.</h3><p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">Turn the handle to tilt the top inward. A gentle opening brings ventilation into your room while the window stays in its tilted position.</p></div></div>
            <div className="mt-8 flex gap-5"><Maximize2 className="mt-1 size-7 shrink-0 text-accent" /><div><p className="mb-2 font-mono text-[10px] uppercase text-accent">02 / Turn</p><h3 className="text-2xl font-semibold">Open up your view.</h3><p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">Turn again to open the window fully inward on its side hinge. Enjoy more ventilation and easy access for cleaning from inside your home.</p></div></div>
            <Button asChild variant="link" className="mt-7 h-10 self-start p-0 text-sm text-foreground"><a href="#contact">Ask us about tilt n turn <ArrowRight /></a></Button>
          </div>
        </div>
      </div>
    </section>

    <section id="inspiration" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto mb-10 max-w-2xl text-center"><p className="mb-5 font-mono text-[10px] uppercase text-accent">04 / Spaces to inspire</p><h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Picture the possibilities.</h2><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground">Sunlit rooms, welcoming entrances and a closer connection to the outdoors. A little inspiration for your next chapter.</p></div>
        <div className="grid gap-7 md:grid-cols-[1.35fr_1fr]">
          {[{title:"Room to breathe", detail:"Doors that bring the garden closer.", image:livingRoom, alt:"Concept sunlit living room with French doors open to a garden"},{title:"A beautiful arrival", detail:"A considered entrance, from the first step.",image:verandaConcept,alt:"Concept garden home with white French entrance doors and veranda"}].map((item,index) => <Button key={item.title} variant="ghost" className="group h-auto min-w-0 flex-col items-stretch gap-0 whitespace-normal rounded-none p-0 text-left hover:bg-transparent" aria-label={`View ${item.title} inspiration`} onClick={() => setSelected({...item,number:String(index),kind:"Concept imagery"})}><img src={item.image} alt={item.alt} width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full object-cover md:aspect-auto md:h-[380px] lg:h-[460px]" /><div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="text-lg font-semibold text-foreground">{item.title}</h3><p className="mt-1 text-sm font-normal text-muted-foreground">{item.detail}</p><p className="mt-2 font-mono text-[9px] font-normal uppercase text-muted-foreground">Concept imagery / Design inspiration</p></div><ArrowUpRight className="mt-1 shrink-0 text-accent" /></div></Button>)}
        </div>
      </div>
    </section>

    <section id="contact" className="px-6 py-16 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto grid max-w-[1312px] gap-10 border-t border-border pt-12 md:grid-cols-12 md:gap-20 md:pt-24">
        <div className="md:col-span-5"><p className="mb-7 font-mono text-[10px] uppercase text-accent">05 / YOUR PROJECT</p><h2 className="max-w-sm text-4xl font-bold uppercase leading-tight md:text-5xl">Plan your project.</h2><p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Planning new windows, doors or rooftrim? Fill in your details below and your email app will open with everything addressed to Steve at stvshoniwa@yahoo.co.uk — ready to send.</p></div>
        <form onSubmit={saveBrief} className="grid gap-x-6 gap-y-7 md:col-span-7 sm:grid-cols-2">
          <label className="block border-b border-border pb-2 focus-within:border-accent"><span className="font-mono text-[10px] uppercase text-muted-foreground">Your name</span><input name="name" required maxLength={120} placeholder="Name" className="mt-2 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60" /></label>
          <label className="block border-b border-border pb-2 focus-within:border-accent"><span className="font-mono text-[10px] uppercase text-muted-foreground">Phone number</span><input name="phone" type="tel" required minLength={5} maxLength={30} placeholder="+263 ..." className="mt-2 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60" /></label>
          <label className="block border-b border-border pb-2 focus-within:border-accent sm:col-span-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">Email address</span><input name="email" type="email" required maxLength={255} placeholder="you@example.com" className="mt-2 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60" /></label>
          <label className="block border-b border-border pb-2 focus-within:border-accent sm:col-span-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">Your project</span><textarea name="brief" required maxLength={4000} rows={4} placeholder="Tell us about your space, your ideas, and what you need..." className="mt-2 w-full resize-y bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60" /></label>
          <div className="flex flex-col items-start gap-3 sm:col-span-2"><div className="flex flex-wrap items-center gap-3"><Button variant="architectural" className="h-12 px-6" type="submit"><Send /> Email your inquiry</Button></div><p role="status" className="text-xs text-muted-foreground">{briefStatus === "ready" ? "Your email app should now open with your inquiry addressed to Steve — just press send." : "Fill in your details and your email app will open with everything addressed to Steve, ready to send."}</p></div>
        </form>
      </div>
    </section>

    <footer className="border-t border-border bg-secondary py-10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-6 md:flex-row md:items-end md:px-10 xl:px-16"><div><Brand /><p className="mt-5 max-w-xs text-sm text-muted-foreground">uPVC windows, doors and rooftrim. The future is now.</p><p className="mt-3 font-mono text-[10px] uppercase text-muted-foreground">Showroom: 15 Bodle Avenue, Harare, Zimbabwe</p></div><div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase text-muted-foreground"><a href="#gallery" className="hover:text-accent">Explore</a><a href="#inspiration" className="hover:text-accent">Inspiration</a><a href="#contact" className="hover:text-accent">Enquire</a><span>© {new Date().getFullYear()} Stesho Global</span></div></div></footer>

    {selected && <div role="dialog" aria-modal="true" aria-label={`${selected.title} image`} className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 p-4" onClick={() => setSelected(null)} onKeyDown={event => { if (event.key === "Escape") setSelected(null); }}><div className="relative max-h-full max-w-4xl" onClick={event => event.stopPropagation()}><Button variant="architecturalDark" size="icon" className="absolute right-0 top-0 z-10 h-10 w-10 bg-primary" aria-label="Close image" onClick={() => setSelected(null)}><X /></Button><img src={selected.image} alt={selected.alt} width={800} height={1008} className="max-h-[78vh] w-auto max-w-full object-contain" /><div className="flex justify-between gap-4 bg-primary py-4 text-primary-foreground"><span className="text-sm font-bold uppercase">{selected.title}</span><span className="font-mono text-[10px] uppercase text-dark-muted">{selected.kind}</span></div></div></div>}
  </div>;
}
