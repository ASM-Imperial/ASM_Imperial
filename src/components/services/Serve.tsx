import React from "react";
import { Store, Wrench, Users, Home, Handshake } from "lucide-react";

export default function WhoWeServe() {
  // Reordered: Interior Designers in position 2 so it's in top row on mobile (2 cols)
  const topRowItems = [
    { icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Rug Collectors" },
    { icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Interior Designers" },
    { icon: <Store className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Rug Retailers" },
  ];

  const bottomRowItems = [
    { icon: <Handshake className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Rug Sourcing Agents" },
    { icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Home Owners and Rug Lovers" },
  ];

  const Card = ({ icon, title }) => (
    <div
      className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-md sm:rounded-lg shadow-sm p-3 sm:p-4 md:p-5 lg:p-6
                 flex flex-col items-center justify-center text-center
                 hover:shadow-md hover:bg-white transition-all duration-300
                 w-full h-[80px] sm:h-[100px] md:h-[120px] lg:h-[140px]"
    >
      <span className="text-[#1f3b5c] mb-1 sm:mb-2">{icon}</span>
      <h3 className="text-xs sm:text-sm md:text-base font-medium text-[#1f3b5c]">{title}</h3>
    </div>
  );

  return (
    <section className="relative bg-[url('https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/BegnasLake.webp')] bg-cover bg-center w-full py-10 sm:py-14 md:py-20">
      {/* Glass overlay */}
      <div className="absolute inset-0"></div>
      
      <div className="relative z-10">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-[#1f3b5c] mb-6 sm:mb-8 md:mb-12 drop-shadow-sm">
        WHO WE SERVE ?
      </h2>

        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-10">
          {/* Top row: 1 column on mobile, 2 on sm, 3 on xl */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 sm:[&>*:nth-child(3)]:col-span-2 sm:[&>*:nth-child(3)]:justify-self-center xl:[&>*:nth-child(3)]:col-span-1">
            {topRowItems.map((item, i) => (
            <Card key={i} icon={item.icon} title={item.title} />
          ))}
        </div>

          {/* Bottom row: 1 column on mobile, 2 centered on larger screens */}
          <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 xl:flex xl:justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-16 place-items-center">
            {bottomRowItems.map((item, i) => (
              <div key={i} className="xl:w-[280px] w-full">
                <Card icon={item.icon} title={item.title} />
              </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
