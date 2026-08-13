import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CaseStudyBody,
  CaseStudyPageShell,
  CaseStudyTakeaways,
  type CaseStudySideNavItem,
} from "@/components/case-study-detail";
import { CultCookiesVideo } from "@/components/cult-cookies-video";
import type { CaseStudy } from "@/lib/case-studies";

type CultCookiesCaseStudyPageProps = {
  study: CaseStudy;
};

type CultImage = {
  src: string;
  alt: string;
};

type CultFigureProps = {
  image: CultImage;
  caption?: string;
  aspect?: "wide" | "landscape" | "portrait" | "square" | "tall";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

type CultChallenge = {
  number: string;
  title: string;
  headline: string;
  image: CultImage;
  imageCaption: string;
  imageClassName?: string;
  constraint: string;
  decision: string;
  outcome: string;
  reverse?: boolean;
};

type CultOperatingEnvironment = {
  title: string;
  description: string;
  items: string[];
};

type CultServiceStage = {
  title: string;
  description: string;
};

const assetBase = "/case-studies/cult-cookies";

const sectionLinks: CaseStudySideNavItem[] = [
  { label: "Overview", href: "#intro" },
  { label: "Truck", href: "#truck" },
  { label: "Build", href: "#build" },
  { label: "Decisions", href: "#iterations" },
  { label: "System", href: "#operating-model" },
  { label: "Brand", href: "#brand" },
  { label: "Product", href: "#product" },
  { label: "Customers", href: "#reality" },
  { label: "Operations", href: "#operations" },
  { label: "Reflection", href: "#reflection" },
];

const media = {
  boxedCookies: {
    src: `${assetBase}/boxed-cookies.jpg`,
    alt: "Pink Cult Cookies boxes arranged on a prep counter.",
  },
  boxCookiesTruck: {
    src: `${assetBase}/box-cookies-truck.jpg`,
    alt: "A pink box of cookies held in front of the Cult Cookies truck.",
  },
  cookieProductPlate: {
    src: `${assetBase}/cookie-product-plate.jpg`,
    alt: "A single Cult Cookies cookie photographed on a plate.",
  },
  cookieTruckServing: {
    src: `${assetBase}/cookie-truck-serving.jpg`,
    alt: "A cookie in a pink sleeve held in front of the Cult Cookies truck logo.",
  },
  cookiesSun: {
    src: `${assetBase}/cookies-sun.jpg`,
    alt: "Cookies photographed in direct sunlight on a plate.",
  },
  cookiesTraysClose: {
    src: `${assetBase}/cookies-trays-close.jpg`,
    alt: "Fresh cookies cooling on parchment-lined sheet trays.",
  },
  glazedCookie: {
    src: `${assetBase}/glazed-cookie.jpg`,
    alt: "A glazed cookie cooling on a wire rack.",
  },
  interiorBuildWires: {
    src: `${assetBase}/interior-build-wires.jpg`,
    alt: "Cult Cookies truck interior during construction with ceiling panels and exposed wiring.",
  },
  interiorFinalOpen: {
    src: `${assetBase}/interior-final-open.jpg`,
    alt: "Finished truck interior with stainless work surfaces and service window open.",
  },
  interiorLights: {
    src: `${assetBase}/interior-lights.jpg`,
    alt: "Truck interior sink area lit by small warm ceiling lights.",
  },
  logoFinal: {
    src: `${assetBase}/logo-final.jpg`,
    alt: "Final Cult Cookies logo on a pink background.",
  },
  logoSketch: {
    src: `${assetBase}/logo-sketch.jpg`,
    alt: "Early Cult Cookies logo sketch with hands, cookie, and lettering.",
  },
  menuBoard: {
    src: `${assetBase}/menu-board.jpg`,
    alt: "Handwritten Cult Cookies menu board with cookie and drink options.",
  },
  packagingTable: {
    src: `${assetBase}/packaging-table.jpg`,
    alt: "Cult Cookies stickers, boxes, and point-of-sale materials on a table.",
  },
  paintSpill: {
    src: `${assetBase}/paint-spill.jpg`,
    alt: "A pale pink paint spill on dirt beside a car.",
  },
  popUpTable: {
    src: `${assetBase}/pop-up-table.jpg`,
    alt: "Cult Cookies pop-up table with display case, tablet checkout, and river view.",
  },
  productionScale: {
    src: `${assetBase}/production-scale.jpg`,
    alt: "Multiple trays of cookies lined up on a commercial kitchen prep table.",
  },
  productionTrays: {
    src: `${assetBase}/production-trays.jpg`,
    alt: "Sheet trays of baked cookies on a stainless prep table.",
  },
  serviceWindowTest: {
    src: `${assetBase}/service-window-test.jpg`,
    alt: "People testing the Cult Cookies truck service window.",
  },
  truckFinishedRain: {
    src: `${assetBase}/truck-finished-rain.jpg`,
    alt: "Finished pink Cult Cookies truck parked on a rainy day.",
  },
  truckFinishedSide: {
    src: `${assetBase}/truck-finished-side.jpg`,
    alt: "Finished pink Cult Cookies truck with logo on the side.",
  },
  truckInitialExterior: {
    src: `${assetBase}/truck-initial-exterior.jpg`,
    alt: "Blank utility trailer before the Cult Cookies conversion.",
  },
  truckInitialInterior: {
    src: `${assetBase}/truck-initial-interior.jpg`,
    alt: "Initial trailer interior with unfinished walls, floor tape, and sink placement.",
  },
  truckPaintFinished: {
    src: `${assetBase}/truck-paint-finished.jpg`,
    alt: "Cult Cookies truck after pink exterior paint was applied.",
  },
  truckPaintFirstCoat: {
    src: `${assetBase}/truck-paint-first-coat.jpg`,
    alt: "Trailer shell masked and painted in its first pale pink coat.",
  },
  truckPaintServiceWindow: {
    src: `${assetBase}/truck-paint-service-window.jpg`,
    alt: "Pink truck exterior during paint work with the service window open.",
  },
};

const challenges: CultChallenge[] = [
  {
    number: "01",
    title: "Power + production",
    headline: "The truck couldn't power the business I originally designed.",
    image: media.productionScale,
    imageCaption: "Commercial kitchen production moved energy-heavy work off-truck.",
    constraint:
      "Ovens, refrigeration, and espresso exceeded what I could realistically run from a roughly $1,000 generator.",
    decision:
      "Move baking and gelato production to a commercial kitchen. Keep espresso, reheating, refrigeration, and service onboard.",
    outcome:
      "A power limitation changed the operating model of the business.",
  },
  {
    number: "02",
    title: "Certification",
    headline: "We built it. Inspected it. Then built parts of it again.",
    image: media.interiorBuildWires,
    imageCaption: "Open ceiling panels and wiring during certification-driven revisions.",
    constraint:
      "Seattle certification put electrical, plumbing, accessibility, food-service, and construction requirements into the same system.",
    decision:
      "Rework electrical runs, plumbing, clearances, and construction details as the truck moved through inspection.",
    outcome:
      "Compliance became part of the design process, not a final check.",
    reverse: true,
  },
  {
    number: "03",
    title: "Designed for one",
    headline: "The interior had to work for one person's reach, pace, and limits.",
    image: media.interiorFinalOpen,
    imageCaption: "The finished workspace organized around a single operator.",
    constraint:
      "Serving customers, handling payments, making espresso, reheating cookies, serving gelato, cleaning, restocking, opening, and closing all had to be manageable by one person.",
    decision:
      "Organize equipment placement, storage, working height, reach, movement, and service sequence around what I could physically do alone.",
    outcome:
      "Solo operation became the architecture of the truck.",
  },
  {
    number: "04",
    title: "Durability",
    headline: "Nothing inside could be precious.",
    image: media.interiorLights,
    imageCaption: "Stainless work surfaces, sinks, and simple details built for use.",
    imageClassName: "cult-challenge__image--durability",
    constraint:
      "Everything inside the truck had to survive movement, vibration, heat, grease, repeated cleaning, loading, unloading, and daily use.",
    decision:
      "Favor simple, cleanable, repairable surfaces and details over complicated finishes that would need protection from use.",
    outcome:
      "The truck became a working environment, not an object to protect.",
    reverse: true,
  },
];

const operatingModelEnvironments: CultOperatingEnvironment[] = [
  {
    title: "Commercial kitchen",
    description: "Production happened off-truck.",
    items: [
      "Bake cookies",
      "Produce gelato",
      "Bulk prep",
      "Ingredient storage",
      "Replenishment",
    ],
  },
  {
    title: "Cult Cookies truck",
    description: "Final preparation and service happened on-truck.",
    items: [
      "Reheat and hold cookies",
      "Make espresso",
      "Keep gelato chilled",
      "Take orders and payment",
      "Serve and hand off",
    ],
  },
];

const serviceDayStages: CultServiceStage[] = [
  {
    title: "Production",
    description: "Bake, prep, portion, organize inventory.",
  },
  {
    title: "Load + transport",
    description: "Move product and supplies, load the truck, drive to service.",
  },
  {
    title: "Setup",
    description: "Power, water, equipment, espresso, refrigeration, workspace.",
  },
  {
    title: "Service",
    description:
      "Orders, payment, drinks, cookies, gelato, restocking, customer interaction.",
  },
  {
    title: "Breakdown",
    description: "Clean, pack, secure, unload.",
  },
  {
    title: "Reset",
    description:
      "Inventory, purchasing, maintenance, admin, preparation for the next day.",
  },
];

const reflectionPrinciples = [
  {
    title: "Know your limits and when to ask for help",
    description: [
      "I tried to do nearly everything myself: building the truck, production, service, maintenance, logistics, and the day-to-day work of running the business.",
      "For a while, I could. But being capable of doing something doesn't mean it makes sense to keep doing it alone. At its busiest, I was working roughly 14-hour days, and the limits of that model became impossible to ignore.",
      "One of the biggest things I took from the project was learning to recognize where my time and energy are actually valuable—and when bringing in someone with more capacity or expertise makes the work better.",
    ],
  },
  {
    title: "A system can work and still be unsustainable",
    description:
      "Cult Cookies technically worked. I had built a truck that could be operated alone, developed an off-site production model that worked within the power constraints, passed certification, and created a functioning customer experience. But viability is not only about whether a system can perform its intended function. It also matters what that system asks of the people inside it.",
  },
  {
    title: "Constraints do not sit outside the design",
    description:
      "The most consequential decisions were not aesthetic ones. Generator capacity changed the production model. Certification changed the construction. Solo operation changed the interior layout. Budget changed what could live onboard. Those constraints became the architecture of the project.",
  },
  {
    title: "Making is how I find the real problem",
    description:
      "Many of the important questions only became visible once something existed. Build it. Use it. Find the point where reality disagrees with the plan. Change it. That loop happened at every scale, from physical construction to workflow to the structure of the business itself.",
  },
  {
    title: "Operation is part of design",
    description:
      "A drawing can tell you whether something fits. A prototype can tell you whether something works. Repeated use tells you what it costs. Operating Cult Cookies exposed friction, maintenance, repetition, fatigue, and dependencies that were not visible during the build.",
  },
];

function CultFigure({
  image,
  caption,
  aspect = "landscape",
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 760px",
}: CultFigureProps): ReactElement {
  return (
    <figure
      className={["cult-figure", `cult-figure--${aspect}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="cult-figure__frame">
        <Image
          className={imageClassName}
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function CultStatement({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: string;
}): ReactElement {
  return (
    <aside className="cult-statement">
      <p>{eyebrow}</p>
      <blockquote>{children}</blockquote>
    </aside>
  );
}

function CultChallengeMoment({ challenge }: { challenge: CultChallenge }) {
  return (
    <article
      className={[
        "cult-challenge",
        challenge.reverse ? "cult-challenge--reverse" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="cult-challenge__media">
        <CultFigure
          imageClassName={challenge.imageClassName}
          image={challenge.image}
          caption={challenge.imageCaption}
          aspect="landscape"
          sizes="(max-width: 900px) 100vw, 420px"
        />
      </div>
      <div className="cult-challenge__content">
        <div className="cult-challenge__kicker">
          <span>{challenge.number}</span>
          <span>{challenge.title}</span>
        </div>
        <h3>{challenge.headline}</h3>
        <div className="cult-challenge__flow">
          <section>
            <p>Constraint</p>
            <p>{challenge.constraint}</p>
          </section>
          <section>
            <p>Decision</p>
            <p>{challenge.decision}</p>
          </section>
          <section className="cult-challenge__outcome">
            <p>Outcome</p>
            <p>{challenge.outcome}</p>
          </section>
        </div>
      </div>
    </article>
  );
}

export function CultCookiesCaseStudyPage({
  study,
}: CultCookiesCaseStudyPageProps): ReactElement {
  return (
    <CaseStudyPageShell links={sectionLinks}>
      <header className="cult-hero" aria-labelledby="case-study-title">
        <div className="cult-hero__media">
          <Image
            src={study.previewImage}
            alt="Finished pink Cult Cookies truck parked in the sun"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 896px"
          />
        </div>
        <div className="cult-hero__overlay">
          <h1 id="case-study-title">Cult Cookies</h1>
          <p>
            I designed, built, branded, and operated a food truck from the ground up.
          </p>
          <dl className="cult-hero__meta" aria-label="Project metadata">
            <div>
              <dt>Role</dt>
              <dd>Founder / Designer / Builder / Operator</dd>
            </div>
            <div>
              <dt>Disciplines</dt>
              <dd>
                Spatial Design, Brand Identity, Operations, Fabrication, Brand
                Design, Baking
              </dd>
            </div>
            <div>
              <dt>Project</dt>
              <dd>Independent venture</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>2023</dd>
            </div>
          </dl>
        </div>
      </header>

      <CaseStudyBody>
        <section
          className="case-study-section cult-section cult-section--intro"
          id="intro"
          aria-labelledby="intro-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">01</p>
            <h2 id="intro-heading">From Idea to Reality</h2>
          </div>
          <div className="cult-intro-copy">
            <p>
              Cult Cookies was a food-truck business I built from the ground up,
              from converting the trailer myself, designing the brand and visual
              identity, perfecting the product, and running the show.
            </p>
            <p>
              I have always loved baking. Conveniently, I had also been
              long-allured by entrepreneurship. During my senior year of
              undergrad, all I could think about was starting a food truck.
            </p>
            <p>
              Did I know how to run a food truck? No. Did I know how to run a
              business? Also no. Did I know how to even drive with a trailer?
              Hell no.
            </p>
            <p>
              Did any of those details stop me from trying? Absolutely not.
            </p>
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--wide"
          id="truck"
          aria-labelledby="truck-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              02 <span>Starting the Build</span>
            </p>
            <h2 id="truck-heading">Starting the build</h2>
            <p>
              The project began with a blank utility trailer that needed to
              become a working kitchen, storefront, and brand surface all at the
              same time. I spent countless hours analyzing every appliance, spec,
              layout, fastener, and an endless list of safety and licensing
              requirements.
            </p>
          </div>
          <div className="cult-progression">
            <CultFigure
              image={media.truckInitialExterior}
              caption="Initial exterior condition"
              aspect="portrait"
              sizes="(max-width: 900px) 100vw, 280px"
            />
            <CultFigure
              image={media.truckInitialInterior}
              caption="Initial interior condition"
              aspect="portrait"
              sizes="(max-width: 900px) 100vw, 280px"
            />
            <CultFigure
              image={media.truckFinishedSide}
              caption="Final mobile kitchen"
              aspect="portrait"
              sizes="(max-width: 900px) 100vw, 280px"
            />
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--build"
          id="build"
          aria-labelledby="build-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              03 <span>Making It</span>
            </p>
            <h2 id="build-heading">Building the d*mn thing</h2>
            <p>
              The build moved from electrical, flooring, walls, ceiling,
              plumbing, appliances, signage, and the ordinary and obvious
              mistakes that appear when you are physically creating something. I
              learned either from YouTube or my dad. Big shoutout to Dad.
            </p>
          </div>

          <div className="cult-build-grid">
            <CultFigure
              className="cult-span-full"
              image={media.serviceWindowTest}
              caption="Window test"
              aspect="wide"
              sizes="(max-width: 900px) 100vw, 896px"
            />

            <CultStatement eyebrow="Design by making">
              In the late evening hours I spent caulking gaps or pulling nails, I
              often thought about the idea that I was making something permanent,
              a structure that would exist in some capacity over time, whether or
              not the business succeeded.
            </CultStatement>

            <div className="cult-pair cult-span-full">
              <CultFigure
                image={media.interiorBuildWires}
                caption="Interior layout and wiring before the ceiling was closed"
                aspect="portrait"
              />
              <CultFigure
                image={media.interiorFinalOpen}
                caption="A cleaner interior state after equipment and surfaces settled"
                aspect="portrait"
              />
            </div>

            <figure className="cult-video-block cult-video-block--paint-sprayer cult-span-full">
              <CultCookiesVideo
                src={`${assetBase}/cult-process-video.mov`}
                poster={media.truckPaintServiceWindow.src}
                label="Cult Cookies paint sprayer process video"
              />
              <figcaption>Me learning how to use an industrial paint sprayer</figcaption>
            </figure>

            <div className="cult-contact-sheet cult-span-full" aria-label="Build process contact sheet">
              <CultFigure image={media.paintSpill} caption="Paint mistake" aspect="square" />
              <CultFigure image={media.truckPaintFirstCoat} caption="Paint prep" aspect="square" />
              <CultFigure image={media.truckPaintServiceWindow} caption="Paint Progress" aspect="square" />
              <CultFigure image={media.truckPaintFinished} caption="Painted shell" aspect="square" />
            </div>
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--iterations"
          id="iterations"
          aria-labelledby="iterations-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              04 <span>Constraints / Decisions</span>
            </p>
            <h2 id="iterations-heading">Constraints / Decisions</h2>
            <p>
              The design kept changing because reality kept changing the brief.
              Power, certification, solo operation, and durability became inputs
              into the system rather than problems to solve afterward.
            </p>
          </div>
          <div className="cult-challenge-list">
            {challenges.map((challenge) => (
              <CultChallengeMoment challenge={challenge} key={challenge.title} />
            ))}
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--model"
          id="operating-model"
          aria-labelledby="operating-model-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              05 <span>Operating Model</span>
            </p>
            <h2 id="operating-model-heading">The truck was only part of the system</h2>
            <p>
              I originally imagined Cult Cookies as a completely self-contained
              operation: bake the cookies, make the gelato, prepare drinks, and
              serve everything from the truck. The constraints of the build
              changed that.
            </p>
          </div>
          <div className="cult-operating-model">
            <div className="cult-operating-model__lede">
              <p>
                The electrical load required to run ovens, refrigeration,
                espresso equipment, and everything else exceeded what I could
                realistically support with the generator available within my
                budget. Space was limited, every additional appliance
                complicated certification, and the entire truck ultimately had to
                be operable by one person.
              </p>
              <p>So I stopped trying to make the truck do everything.</p>
            </div>
            <div className="cult-operating-model__grid">
              {operatingModelEnvironments.map((environment) => (
                <article className="cult-operating-card" key={environment.title}>
                  <h3>{environment.title}</h3>
                  <p>{environment.description}</p>
                  <ul>
                    {environment.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="cult-operating-model__decision">
              <p>The design decision</p>
              <blockquote>
                Instead of forcing the entire business into one physical object,
                I divided the system around what each environment was actually
                good at.
              </blockquote>
              <p>
                The commercial kitchen handled energy-intensive production. The
                truck became a compact point of final preparation, service, and
                customer interaction. The question changed from "How do I fit a
                kitchen inside a truck?" to "What does the truck actually need to
                do?"
              </p>
            </div>
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--brand"
          id="brand"
          aria-labelledby="brand-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              06 <span>Building the Brand</span>
            </p>
            <h2 id="brand-heading">Creating the world around it</h2>
            <p>
              The identity had to work as a practical system across a moving
              vehicle, packaging, menus, service moments, and product
              photography.
            </p>
          </div>
          <div className="cult-brand-content">
            <p className="cult-brand-statement">
              The goal wasn't simply to design a logo. It was to create a
              coherent world that could stretch across a truck, menu, packaging,
              product, and customer experience.
            </p>
            <div className="cult-brand-sequence">
              <CultFigure image={media.logoSketch} caption="Identity exploration" aspect="square" />
              <CultFigure image={media.logoFinal} caption="Final logo direction" aspect="square" />
              <CultFigure image={media.truckFinishedSide} caption="Physical application" aspect="landscape" />
              <CultFigure
                image={media.menuBoard}
                imageClassName="cult-brand-sequence__image--menu"
                caption="Menu communication"
                aspect="portrait"
              />
              <CultFigure image={media.packagingTable} caption="Point-of-sale materials" aspect="landscape" />
              <CultFigure image={media.cookieTruckServing} caption="Packaged product" aspect="portrait" />
            </div>
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--product"
          id="product"
          aria-labelledby="product-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              07 <span>Product</span>
            </p>
            <h2 id="product-heading">Where a lot of the creative expression lived</h2>
            <p>
              Developing the menu was one of the most creatively open parts of
              Cult Cookies. I could experiment with flavors, textures, seasonal
              ideas, and combinations that felt interesting to me without
              needing every cookie to follow the same formula.
            </p>
            <p>
              Alongside a classic chocolate chip, I developed flavors like
              pumpkin chocolate chip, coffee cake, peppermint chocolate, glazed,
              and pistachio raspberry.
            </p>
          </div>
          <div className="cult-product-content">
            <div className="cult-product-flavors" aria-label="Selected Cult Cookies flavors">
              <span>Chocolate chip</span>
              <span>Pumpkin chocolate chip</span>
              <span>Coffee cake</span>
              <span>Peppermint chocolate</span>
              <span>Glazed</span>
              <span>Pistachio raspberry</span>
            </div>
            <div className="cult-product-gallery">
              <CultFigure
                className="cult-product-gallery__hero"
                image={media.cookiesTraysClose}
                caption="Chocolate chip batches cooling on sheet trays"
                aspect="wide"
                sizes="(max-width: 900px) 100vw, 896px"
              />
              <CultFigure
                image={media.cookieProductPlate}
                caption="Pistachio raspberry test"
                aspect="landscape"
              />
              <CultFigure
                image={media.glazedCookie}
                caption="Coffee cake and glazed development"
                aspect="landscape"
              />
              <CultFigure
                image={media.cookiesSun}
                caption="Pumpkin chocolate chip"
                aspect="portrait"
              />
              <CultFigure
                image={media.productionTrays}
                caption="Production b-roll"
                aspect="portrait"
              />
            </div>
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--reality"
          id="reality"
          aria-labelledby="reality-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              08 <span>From Prototype to Reality</span>
            </p>
            <h2 id="reality-heading">And then I started getting customers</h2>
            <p>
              The work shifted from construction documentation to a functioning
              business: production, packaging, serving, and watching the system
              meet real customers.
            </p>
          </div>
          <div className="cult-reality-content">
            <div className="cult-pair">
              <CultFigure image={media.popUpTable} caption="Pop-up service setup" aspect="portrait" />
              <CultFigure image={media.boxedCookies} caption="Boxed cookie orders laid out for customers" aspect="portrait" />
            </div>
            <CultFigure
              image={media.productionTrays}
              caption="The operational layer: batches, timing, and repetition"
              aspect="wide"
            />
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--operations"
          id="operations"
          aria-labelledby="operations-heading"
        >
          <header className="cult-operations-header">
            <p className="case-study-section__number">
              09 <span>Operating It</span>
            </p>
            <h2 id="operations-heading">Then I had to run the thing</h2>
            <p>
              Designing the system and operating it turned out to be two very
              different problems.
            </p>
          </header>
          <div className="cult-operations-content">
            <div className="cult-operations-copy">
              <p>
                I started getting business before the truck was even legally
                able to be off the ground, so I was working from pop-ups and
                online order requests for events while still working on the
                certification of the truck itself. I was not only serving
                customers. I was also producing inventory, transporting it,
                modifying the truck, setting up, driving, making drinks,
                reheating cookies, cleaning, restocking, troubleshooting
                equipment, buying supplies, handling admin, and preparing to do
                it again the next day.
              </p>
              <p>
                I had dramatically underestimated how much labor existed around
                running this thing. On my busiest days, I worked around 14
                hours.
              </p>
            </div>
            <div className="cult-service-day" aria-label="A service day structure">
              {serviceDayStages.map((stage) => (
                <article key={stage.title}>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </article>
              ))}
            </div>
            <CultFigure
              className="cult-operations-image"
              image={media.productionScale}
              caption="Production scaled into repeated batches"
              aspect="wide"
            />
            <blockquote>
              The truck had been deliberately designed so one person could
              operate it. What I had not fully accounted for was everything
              surrounding that operation. Designing the workflow was one thing.
              Being the workflow was another.
            </blockquote>
          </div>
        </section>

        <section
          className="case-study-section cult-section cult-section--reflection"
          id="reflection"
          aria-labelledby="reflection-heading"
        >
          <div className="case-study-section__intro">
            <p className="case-study-section__number">
              10 <span>Reflection</span>
            </p>
            <h2 id="reflection-heading">What stayed with me</h2>
          </div>
          <CaseStudyTakeaways takeaways={reflectionPrinciples} />
        </section>

        <section className="cult-closing" aria-labelledby="closing-heading">
          <div className="cult-closing__media">
            <Image
              src={media.truckFinishedRain.src}
              alt={media.truckFinishedRain.alt}
              fill
              sizes="(max-width: 900px) 100vw, 896px"
            />
          </div>
          <div className="cult-closing__copy">
            <h2 id="closing-heading">Cult Cookies was ostensibly a food truck.</h2>
            <p>
              For me, it became an exercise in building an entire system from
              scratch, and a project that taught me some of the most valuable
              lessons in my life.
            </p>
          </div>
        </section>

        <div className="case-study-next-action">
          <Link className="primary-button case-study-next-button" href="/#work">
            <span>Back to Work</span>
            <ArrowRight aria-hidden="true" size={14} strokeWidth={1.8} />
          </Link>
        </div>
      </CaseStudyBody>
    </CaseStudyPageShell>
  );
}
