import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
// import { BiMessageRoundedDots } from "react-icons/bi";

// Eagerly load main pages for fast initial navigation
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import RugViz from "./components/visualizeRug/RugViz"
import RugVisualizerPage from "./components/visualizeRug/RugVisualizerPage";
import RugCare from "./pages/RugCare";

// Lazy load heavy components - only loaded when user navigates to them
const AllCollections = lazy(() => import("./components/products/Collections/AllCollections"));
const OurExperience = lazy(() => import("./components/home/OurExperience"));

// Lazy load all product customizer pages
const AankhiJhyal = lazy(() => import("./components/products/Customize/AankhiJhyalNew"));
const Attraction = lazy(() => import("./components/products/Customize/AttractionNew"));
const Baasn = lazy(() => import("./components/products/Customize/BaasnNew"));
const BayLeaves = lazy(() => import("./components/products/Customize/BayleavesNew"));
const Beehive = lazy(() => import("./components/products/Customize/BeehiveNew"));
const BegnasLake = lazy(() => import("./components/products/Customize/BegnasLakeNew"));
const BirendraTaal = lazy(() => import("./components/products/Customize/BirendraTaalNew"));
const BrokenMirror = lazy(() => import("./components/products/Customize/BrokenMirrorNew"));
const Bubbles = lazy(() => import("./components/products/Customize/BubblesNew"));
const BudiAunla = lazy(() => import("./components/products/Customize/BudiAunlaNew"));
const BurningRope = lazy(() => import("./components/products/Customize/BurningRopeNew"));
const Cells = lazy(() => import("./components/products/Customize/CellsNew"));
const Chakati = lazy(() => import("./components/products/Customize/ChakatiNew"));
const Childhood = lazy(() => import("./components/products/Customize/ChildhoodNew"));
const Chino = lazy(() => import("./components/products/Customize/ChinoNew"));
const Echo = lazy(() => import("./components/products/Customize/EchoNew"));
const Festival = lazy(() => import("./components/products/Customize/FestivalNew"));
const FountainWater = lazy(() => import("./components/products/Customize/FountainWaterNew"));
const Gurung = lazy(() => import("./components/products/Customize/GurungNew"));
const Holi = lazy(() => import("./components/products/Customize/HoliNew"));
const Illusion = lazy(() => import("./components/products/Customize/IllusionNew"));
const Imagination = lazy(() => import("./components/products/Customize/ImaginationNew"));
const JungleTribes = lazy(() => import("./components/products/Customize/JungleTribesNew"));
const Kaath = lazy(() => import("./components/products/Customize/KaathNew"));
const Kapaal = lazy(() => import("./components/products/Customize/KapaalNew"));
const Kunda = lazy(() => import("./components/products/Customize/KundaNew"));
const LakheFace = lazy(() => import("./components/products/Customize/LakheFaceNew"));
const Lalitpur = lazy(() => import("./components/products/Customize/LalitpurNew"));
const Landmark = lazy(() => import("./components/products/Customize/LandmarkNew"));
const Majesty = lazy(() => import("./components/products/Customize/MajestyNew"));
const ManasluCircuit = lazy(() => import("./components/products/Customize/ManasluCircuitNew"));
const Mandro = lazy(() => import("./components/products/Customize/MandroNew"));
const Maze = lazy(() => import("./components/products/Customize/MazeNew"));
const Mirror = lazy(() => import("./components/products/Customize/MirrorNew"));
const MonkeyTemple = lazy(() => import("./components/products/Customize/MonkeyTempleNew"));
const MorningSun = lazy(() => import("./components/products/Customize/MorningSunNew"));
const NaghDaha = lazy(() => import("./components/products/Customize/NaghDahaNew"));
const NamcheBazar = lazy(() => import("./components/products/Customize/NamcheBazarNew"));
const OnBoard = lazy(() => import("./components/products/Customize/OnBoardNew"));
const OnTheRoad = lazy(() => import("./components/products/Customize/OnTheRoadNew"));
const Paisa = lazy(() => import("./components/products/Customize/PaisaNew"));
const Pari = lazy(() => import("./components/products/Customize/PariNew"));
const Path = lazy(() => import("./components/products/Customize/PathNew"));
const Phulchoki = lazy(() => import("./components/products/Customize/PhulchokiNew"));
const Ping = lazy(() => import("./components/products/Customize/PingNew"));
const PuranoJhyal = lazy(() => import("./components/products/Customize/PuranoJhyalNew"));
const RainForest = lazy(() => import("./components/products/Customize/RainForestNew"));
const Retro = lazy(() => import("./components/products/Customize/RetroNew"));
const Ring = lazy(() => import("./components/products/Customize/RingNew"));
const SherpaLove = lazy(() => import("./components/products/Customize/SherpaLoveNew"));
const Shreepanch = lazy(() => import("./components/products/Customize/ShreepanchNew"));
const Shyala = lazy(() => import("./components/products/Customize/ShyalaNew"));
const Smoke = lazy(() => import("./components/products/Customize/SmokeNew"));
const Sukool = lazy(() => import("./components/products/Customize/SukoolNew"));
const Sweet16 = lazy(() => import("./components/products/Customize/Sweet16New"));
const TeraiFarm = lazy(() => import("./components/products/Customize/TeraiFarmNew"));
const Thaali = lazy(() => import("./components/products/Customize/ThaaliNew"));
const TheWall = lazy(() => import("./components/products/Customize/TheWallNew"));
const Thoughts = lazy(() => import("./components/products/Customize/ThoughtsNew"));
const Tides = lazy(() => import("./components/products/Customize/TidesNew"));
const Tihar = lazy(() => import("./components/products/Customize/TiharNew"));
const Trek = lazy(() => import("./components/products/Customize/TrekNew"));
const TsumValleyPatan = lazy(() => import("./components/products/Customize/TsumValleyNew"));
const UndefinedUniverse = lazy(() => import("./components/products/Customize/UndefinedUniverseNew"));
const Vines = lazy(() => import("./components/products/Customize/VinesNew"));
const WaterBrust = lazy(() => import("./components/products/Customize/WaterBrustNew"));
const WaterCoin = lazy(() => import("./components/products/Customize/WaterCoinNew"));
const WaterLilies = lazy(() => import("./components/products/Customize/WaterLiliesNew"));
const Weave = lazy(() => import("./components/products/Customize/WeaveNew"));
const Kopila = lazy(() => import("./components/products/Customize/KopilaNew"));
const Chaal = lazy(() => import("./components/products/Customize/ChaalNew"));
const AnkhaNani = lazy(() => import("./components/products/Customize/AnkhaNaniNew"));
const Ilusion = lazy(() => import("./components/products/Customize/IlusionNew"));
const Bloom = lazy(() => import("./components/products/Customize/BloomNew"));
const Maya = lazy(() => import("./components/products/Customize/MayaNew"));
const Graha = lazy(() => import("./components/products/Customize/GrahaNew"));
const Scale = lazy(() => import("./components/products/Customize/ScaleNew"));
const TulsiBibaha = lazy(() => import("./components/products/Customize/TulsiBibahaNew"));
const Pooja = lazy(() => import("./components/products/Customize/PoojaNew"));
const Trisul = lazy(() => import("./components/products/Customize/TrisulNew"));
const RoseGarland = lazy(() => import("./components/products/Customize/RoseGarlandNew"));



// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-charcoal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-charcoal/70">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/craftmanship" element={<OurExperience />} />

          <Route path="/collections" element={<AllCollections />} />
          <Route path="/color-customizer" element={<Products />} />

          <Route path="/color-customizer/aankhijhyal" element={<AankhiJhyal />} />
          <Route path="/color-customizer/attraction" element={<Attraction />} />
          <Route path="/color-customizer/baasn" element={<Baasn />} />
          <Route path="/color-customizer/bayleaves" element={<BayLeaves />} />
          <Route path="/color-customizer/beehive" element={<Beehive />} />
          <Route path="/color-customizer/begnaslake" element={<BegnasLake />} />
          <Route path="/color-customizer/birendrataal" element={<BirendraTaal />} />
          <Route path="/color-customizer/brokenmirror" element={<BrokenMirror />} />
          <Route path="/color-customizer/bubbles" element={<Bubbles />} />
          <Route path="/color-customizer/budiaunla" element={<BudiAunla />} />
          <Route path="/color-customizer/burningrope" element={<BurningRope />} />
          <Route path="/color-customizer/cells" element={<Cells />} />
          <Route path="/color-customizer/chakati" element={<Chakati />} />
          <Route path="/color-customizer/childhood" element={<Childhood />} />
          <Route path="/color-customizer/chino" element={<Chino />} />
          <Route path="/color-customizer/echo" element={<Echo />} />
          <Route path="/color-customizer/festival" element={<Festival />} />
          <Route path="/color-customizer/fountainwater" element={<FountainWater />} />
          <Route path="/color-customizer/gurung" element={<Gurung />} />
          <Route path="/color-customizer/holi" element={<Holi />} />
          <Route path="/color-customizer/illusion" element={<Illusion />} />
          <Route path="/color-customizer/imagination" element={<Imagination />} />
          <Route path="/color-customizer/jungletribes" element={<JungleTribes />} />
          <Route path="/color-customizer/kaath" element={<Kaath />} />
          <Route path="/color-customizer/kapaal" element={<Kapaal />} />
          <Route path="/color-customizer/kunda" element={<Kunda />} />
          <Route path="/color-customizer/lakheface" element={<LakheFace />} />
          <Route path="/color-customizer/lalitpur" element={<Lalitpur />} />
          <Route path="/color-customizer/landmark" element={<Landmark />} />
          <Route path="/color-customizer/majesty" element={<Majesty />} />
          <Route path="/color-customizer/manaslucircuit" element={<ManasluCircuit />} />
          <Route path="/color-customizer/mandro" element={<Mandro />} />
          <Route path="/color-customizer/maze" element={<Maze />} />
          <Route path="/color-customizer/mirror" element={<Mirror />} />
          <Route path="/color-customizer/monkeytemple" element={<MonkeyTemple />} />
          <Route path="/color-customizer/morningsun" element={<MorningSun />} />
          <Route path="/color-customizer/naghdaha" element={<NaghDaha />} />
          <Route path="/color-customizer/namchebazar" element={<NamcheBazar />} />
          <Route path="/color-customizer/onboard" element={<OnBoard />} />
          <Route path="/color-customizer/ontheroad" element={<OnTheRoad />} />
          <Route path="/color-customizer/paisa" element={<Paisa />} />
          <Route path="/color-customizer/pari" element={<Pari />} />
          <Route path="/color-customizer/path" element={<Path />} />
          <Route path="/color-customizer/phulchoki" element={<Phulchoki />} />
          <Route path="/color-customizer/ping" element={<Ping />} />
          <Route path="/color-customizer/puranojhyal" element={<PuranoJhyal />} />
          <Route path="/color-customizer/rainforest" element={<RainForest />} />
          <Route path="/color-customizer/retro" element={<Retro />} />
          <Route path="/color-customizer/ring" element={<Ring />} />
          <Route path="/color-customizer/sherpalove" element={<SherpaLove />} />
          <Route path="/color-customizer/shreepanch" element={<Shreepanch />} />
          <Route path="/color-customizer/shyala" element={<Shyala />} />
          <Route path="/color-customizer/smoke" element={<Smoke />} />
          <Route path="/color-customizer/sukool" element={<Sukool />} />
          <Route path="/color-customizer/sweet16" element={<Sweet16 />} />
          <Route path="/color-customizer/teraifarm" element={<TeraiFarm />} />
          <Route path="/color-customizer/thaali" element={<Thaali />} />
          <Route path="/color-customizer/thewall" element={<TheWall />} />
          <Route path="/color-customizer/thoughts" element={<Thoughts />} />
          <Route path="/color-customizer/tides" element={<Tides />} />
          <Route path="/color-customizer/tihar" element={<Tihar />} />
          <Route path="/color-customizer/trek" element={<Trek />} />
          <Route path="/color-customizer/tsumvalleypatan" element={<TsumValleyPatan />} />
          <Route path="/color-customizer/undefineduniverse" element={<UndefinedUniverse />} />
          <Route path="/color-customizer/vines" element={<Vines />} />
          <Route path="/color-customizer/waterbrust" element={<WaterBrust />} />
          <Route path="/color-customizer/watercoin" element={<WaterCoin />} />
          <Route path="/color-customizer/waterlilies" element={<WaterLilies />} />
          <Route path="/color-customizer/weave" element={<Weave />} />
          <Route path="/color-customizer/kopila" element={<Kopila />} />
          <Route path="/color-customizer/chaal" element={<Chaal />} />
          <Route path="/color-customizer/ankhanani" element={<AnkhaNani />} />
          <Route path="/color-customizer/ilusion" element={<Ilusion />} />
          <Route path="/color-customizer/bloom" element={<Bloom />} />
          <Route path="/color-customizer/maya" element={<Maya />} />
          <Route path="/color-customizer/graha" element={<Graha />} />
          <Route path="/color-customizer/scale" element={<Scale />} />
          <Route path="/color-customizer/tulsibibaha" element={<TulsiBibaha />} />
          <Route path="/color-customizer/pooja" element={<Pooja />} />
          <Route path="/color-customizer/trisul" element={<Trisul />} />
          <Route path="/color-customizer/rosegarland" element={<RoseGarland />} />



          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/rug-care" element={<RugCare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rug-visualizer" element={<RugVisualizerPage />} />
        </Routes>
      </Suspense>

      {/* 💬 Chatbot Floating Button */}
      {/* <button
        onClick={() => {
          // TODO: open chatbot modal / widget
          console.log("Open Chatbot");
        }}
        className="fixed bottom-28 right-8 z-50 bg-blue-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:scale-110 transition-transform"
      >
        <BiMessageRoundedDots className="w-7 h-7 sm:w-10 sm:h-10" />
      </button> */}


      {/* 🔥 WhatsApp Floating Button */}

      <a
        href="https://wa.me/9779851197564"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-8 z-50 bg-green-500 text-white rounded-full p-3 sm:p-4 shadow-lg hover:scale-110 transition-transform"
      >
        <FaWhatsapp className="w-7 h-7 sm:w-10 sm:h-10" />
      </a>
    </>
  );
}
