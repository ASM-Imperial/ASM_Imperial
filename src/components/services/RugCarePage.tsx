import React from 'react'

const RugCarePage = () => {
  return (
    <div className="mt-4 bg-[#faf9f7] text-gray-800 ">

      {/* ================= MAIN HEADING ================= */}
      {/* Less vertical space on mobile/tablet, keep roomy on desktop */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-20 text-center">
        <h1 className="text-4xl font-serif font-semibold leading-tight">
          Hand-Knotted Rug Care Guide
        </h1>
        {/* Wider paragraph on large screens while keeping good readability on mobile */}
        <p className="text-base text-gray-600 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed text-justify mt-8">
          Hand-knotted rugs are timeless works of art that bring warmth, elegance,
          and cultural heritage into your home. Each handcrafted rug is made by
          skilled artisans using traditional techniques, making every piece unique.
          With proper care and regular maintenance, your hand-knotted rug will
          retain its beauty, durability, and value for generations.
          <br />
          <br />
            Beyond their visual appeal, these rugs tell stories of craftsmanship,
            patience, and tradition passed down through centuries. The natural 
            fibers and dyes used in hand-knotted rugs age gracefully, developing 
            character and richness over time. Whether placed in a living room, bedroom, 
            or hallway, a hand-knotted rug adds depth, comfort, and a sense of authenticity to any space.
        </p>

      </section>

      {[
        {
          title: "Shedding in Hand-Knotted Rugs",
          text:
            "Light shedding is natural in new hand-knotted rugs, especially during the first few months of use. The amount of shedding depends on the rug’s construction and fiber type. With regular vacuuming and daily use, shedding gradually reduces and stops over time. As the wool pile settles, it becomes softer and develops a natural sheen. Controlled exposure to light enhances color depth and brings out the rug’s intricate design. Well-maintained handmade rugs often appreciate in value.",
          img: "/rugcare/1.jpeg",
          reverse: false,
        },
        {
          title: "Rotate Your Rug & Sunlight Care",
          text:
            "Rotate your hand-knotted rug once or twice a year to distribute wear evenly and prevent traffic marks. Moderate sunlight helps keep rug fibers healthy and naturally discourages insects. To avoid permanent dents, use soft furniture cups under legs and always move furniture in the direction of the pile.",
          img: "/rugcare/2.jpeg",
          reverse: true,
        },
        {
          title: "Vacuuming Your Hand-Knotted Rug",
          text:
            "Regular vacuuming is essential for maintaining hand-knotted rugs and preventing dust buildup. Vacuum 3–4 times per month using a suction-only setting. Avoid beater bars, as they can damage delicate fibers. Always vacuum in the direction of the pile first, then gently in other directions if needed.",
          img: "/rugcare/3.jpeg",
          reverse: false,
        },
        {
          title: "Cleaning the Underside of Your Rug",
          text:
            "Clean the back of your rug every 6–12 months by folding in sections, vacuuming and gently beating the underside, then laying it flat and vacuuming the front to remove embedded dust.",
          img: "/rugcare/4.jpeg",
          reverse: true,
        },
        {
          title: "Professional Rug Cleaning",
          text:
            "Professional rug cleaning is recommended every 2–3 years, or sooner for heavy use, pet stains, or spills. Expert cleaning removes deep-set dirt, restores natural luster, and preserves rug structure.",
          img: "/rugcare/5.jpeg",
          reverse: false,
        },
      ].map((section, i) => (
        <section key={i} className="py-6 md:py-10">
          <div
            className={`max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center ${section.reverse ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#e7e3df] rounded-3xl"></div>
              <img
                src={section.img}
                alt={section.title}
                className="relative rounded-3xl shadow-xl w-full h-[360px] object-cover"
              />
            </div>

            {/* Text Card */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed text-justify">{section.text} </p>
            </div>
          </div>
        </section>
      ))}

      {/* ================= SPILLS SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            How to Clean Spills & Stains on Rugs
          </h2>

          <div className="bg-[#faf9f7] rounded-3xl p-5 md:p-10 shadow-md">
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Act quickly when spills occur to prevent permanent staining:
            </p>

            <ol className="grid md:grid-cols-2 gap-4 md:gap-5 text-gray-800 text-sm md:text-base">
              {[
                "Scoop solid residue gently with a spoon or knife.",
                "Blot liquid spills immediately using white paper towels.",
                "Identify the stain and select the appropriate solution.",
                "Always test cleaning agents on a hidden area first.",
                "Blot from the outer edge toward the center.",
                "Avoid rubbing or scrubbing the rug pile.",
                "Allow the rug to dry between steps.",
                "Rinse lightly with lukewarm water.",
                "Blot excess moisture thoroughly.",
                "Keep rug off-limits until dry.",
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white shadow-sm">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Rug Stain Removal Tips & Cleaning Solutions
        </h2>

        <p className="text-base text-center text-gray-600 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed mt-8 mb-8">
          Different stains require different treatments and always test before applying.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Safe Solutions */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
              Safe Cleaning Solutions for Wool Rugs
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Wool-safe detergent & vinegar:</span>{" "}
                  Mix 1 teaspoon of wool-approved detergent with 1 teaspoon of white
                  vinegar in 1 liter of warm water.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Warm water:</span> Ideal for light stains.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Cold water:</span> Best for delicate fibers.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Vinegar or lemon solution:</span> Mild
                  solution for light stains.
                </span>
              </li>
            </ul>
          </div>

          {/* Solvent Based */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
              Solvent-Based Rug Cleaners
              <span className="block text-sm text-gray-500 font-normal">
                (Use Carefully)
              </span>
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  Dry-cleaning fluid, mineral turpentine, or lighter fuel
                  <span className="block text-xs text-gray-500">
                    (use in ventilated areas only)
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  Denatured ethanol
                  <span className="block text-xs text-gray-500">
                    (away from heat or flames)
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  Hydrogen peroxide (20 volume), diluted 1:10
                  <span className="block text-xs text-gray-500">
                    (avoid dark rugs)
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  Dye stripper diluted 1:50 (not for patterned or dark rugs)
                </span>
              </li>
            </ul>
          </div>

          {/* Specialty Treatments */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
              Specialty Rug Stain Treatments
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>Chewing gum removers or freezing agents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>Nail polish remover (apply carefully)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  Absorbent powders (salt or talc)
                  <span className="block text-xs text-gray-500">
                    apply overnight, then vacuum
                  </span>
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>


      {/* ================= FINAL IMAGE + CONCLUSION ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Why Proper Rug Care Matters
          </h2>

          <p className="text-base text-gray-600 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed text-justify mt-8">
            Proper care preserves the texture, color, and structure of hand-knotted
            rugs while extending their lifespan. Regular maintenance enhances
            appearance, protects your investment, and maintains long-term value.
          </p>

          <img
            src="/rugcare/6.jpeg"
            alt="Why Proper Rug Care Matters"
            className="w-full h-auto max-h-[85vh] md:h-[720px] md:max-h-none object-cover rounded-3xl shadow-xl mt-10"
          />

        </div>
      </section>

    </div>


  )
}

export default RugCarePage