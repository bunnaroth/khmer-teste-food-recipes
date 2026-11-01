import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { storyEditorial } from "@/data/editorial";
import kitchenImage from "@/assets/images/khmer-kitchen.png";
import sharedMealImage from "@/assets/images/shared-meal.jpg";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Explore the flavours, ingredients, and everyday traditions of Cambodian cuisine.",
};

export default function StoryPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-[7%] pt-[78px] pb-[56px] max-[680px]:px-[6%] max-[680px]:pt-[55px]">
        <div className="max-w-[900px]">
          <p className="mb-[19px] text-[10px] font-bold tracking-[0.18em] text-muted">{storyEditorial.heroEyebrow}</p>
          <h1 className="mb-[22px] m-0 text-[clamp(58px,9vw,116px)] font-bold leading-[0.94] tracking-[-0.07em] max-[680px]:text-[58px]">
            {storyEditorial.heroTitleLead}
            <br />
            <em className="not-italic">{storyEditorial.heroTitleAccent}</em>
          </h1>
          <p className="m-0 max-w-[560px] text-[15px] leading-[1.8] text-muted">{storyEditorial.heroDescription}</p>
        </div>
        <figure className="relative mt-[45px] mb-0 aspect-[2.1] bg-black max-[680px]:aspect-[1.25]">
          <Image
            className="object-cover"
            src={kitchenImage}
            alt="Neutral local placeholder illustration for a Khmer kitchen"
            fill
            priority
            sizes="100vw"
          />
        </figure>
      </section>

      <section className="mx-auto max-w-[1000px] px-[7%] py-[92px] pb-[100px] text-center max-[680px]:py-[70px] max-[680px]:pb-[72px]">
        <p className="mb-[19px] text-[10px] font-bold tracking-[0.18em] text-muted">{storyEditorial.introductionEyebrow}</p>
        <h2 className="m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em] text-green max-[680px]:text-[45px]">
          {storyEditorial.introductionTitleLead}
          <br />
          <em className="not-italic">{storyEditorial.introductionTitleAccent}</em>
        </h2>
        <div className="mx-auto mt-[27px] max-w-[650px] text-center">
          <p className="m-0 text-xs leading-[1.9] text-muted">{storyEditorial.introductionBody}</p>
        </div>
      </section>

      <section className="grid grid-cols-2 bg-black max-[680px]:grid-cols-1" id="table">
        <div className="relative min-h-[500px] max-[680px]:min-h-[330px]">
          <Image
            className="object-cover"
            src={sharedMealImage}
            alt="Neutral local placeholder illustration of a shared meal"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
        <div className="max-w-[650px] self-center px-[12%] py-[70px] max-[680px]:px-[7%] max-[680px]:py-[55px] max-[680px]:pb-[65px]">
          <p className="mb-[19px] text-[10px] font-bold tracking-[0.18em] text-muted">{storyEditorial.tableEyebrow}</p>
          <h2 className="mb-[22px] m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em] text-green max-[680px]:text-[45px]">
            {storyEditorial.tableTitleLead}
            <br />
            <em className="not-italic">{storyEditorial.tableTitleAccent}</em>
          </h2>
          <p className="m-0 text-xs leading-[1.9] text-muted">{storyEditorial.tableBody}</p>
        </div>
      </section>

      <section className="bg-black px-[6%] py-[75px] text-center text-white">
        <p className="mb-[19px] text-[10px] font-bold tracking-[0.18em] text-white">LET’S START WITH A DISH</p>
        <h2 className="mb-[25px] m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em] text-white max-[680px]:text-[45px]">
          Find a recipe to
          <br />
          make <em className="not-italic">your own.</em>
        </h2>
        <Link className="interactive-button inline-flex min-h-[49px] items-center gap-[17px] border border-white px-[21px] text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-black" href="/cuisine">
          Discover Cambodian cuisine <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
