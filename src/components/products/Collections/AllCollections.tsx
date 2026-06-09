import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

interface Carpet {
  id: string;
  name: string;
  imageUrl: string;
}

const carpets: Carpet[] = [
{ id: 'rug-001', name: 'Aankhi Jhyal', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/AankhiJhyal.webp' },
{ id: 'rug-002', name: 'Attraction', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Attraction.webp' },
{ id: 'rug-003', name: 'Baasn', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/baasn.webp' },
{ id: 'rug-004', name: 'Bayleaves', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/BayLeaves.webp' },
{ id: 'rug-005', name: 'Begnas Lake', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/BegnasLake.webp' },
{ id: 'rug-006', name: 'Beehive', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Beehive.webp' },
{ id: 'rug-007', name: 'Birendra Taal', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/BirendraTaal.webp' },
{ id: 'rug-008', name: 'Broken Mirror', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/BrokenMirror.webp' },
{ id: 'rug-009', name: 'Budi Aunla', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/BudiAunla.webp' },
{ id: 'rug-010', name: 'Bubbles', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Bubbles.webp' },
{ id: 'rug-011', name: 'Burning Rope', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/BurningRope.webp' },
{ id: 'rug-012', name: 'Cells', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Cells.webp' },
{ id: 'rug-013', name: 'Chakati', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Chakati.webp' },
{ id: 'rug-014', name: 'Chino', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Chino.webp' },
{ id: 'rug-015', name: 'Childhood', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Childhood.webp' },
{ id: 'rug-016', name: 'Echo', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Echo.webp' },
{ id: 'rug-017', name: 'Festival', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Festival.webp' },
{ id: 'rug-018', name: 'Fountain Water', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/FountainWater.webp' },
{ id: 'rug-019', name: 'Gurung', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Gurung.webp' },
{ id: 'rug-020', name: 'Holi', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Holi.webp' },
{ id: 'rug-021', name: 'Illusion', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Illusion.webp' },
{ id: 'rug-022', name: 'Imagination', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Imagination.webp' },
{ id: 'rug-023', name: 'Jungle Tribes', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/JungleTribes.webp' },
{ id: 'rug-024', name: 'Kaath', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Kaath.webp' },
{ id: 'rug-025', name: 'Kapaal', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Kapaal.webp' },
{ id: 'rug-026', name: 'Kunda', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Kunda.webp' },
{ id: 'rug-027', name: 'Lakhe Face', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/LakheFace.webp' },
{ id: 'rug-028', name: 'Lalitpur', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Lalitpur.webp' },
{ id: 'rug-029', name: 'Landmark', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Landmark.webp' },
{ id: 'rug-030', name: 'Majesty', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Majesty.webp' },
{ id: 'rug-031', name: 'Manaslu Circuit', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/ManasluCircut.webp' },
{ id: 'rug-032', name: 'Mandro', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Mandro.webp' },
{ id: 'rug-033', name: 'Maze', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Maze.webp' },
{ id: 'rug-034', name: 'Mirror', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Mirror.webp' },
{ id: 'rug-035', name: 'Monkey Temple', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/MonkeyTemple.webp' },
{ id: 'rug-036', name: 'Morning Sun', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/MorningSun.webp' },
{ id: 'rug-037', name: 'Nagh Daha', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/NaghDaha.webp' },
{ id: 'rug-038', name: 'Namche Bazar', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/NamcheBazar.webp' },
{ id: 'rug-039', name: 'On Board', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/OnBoard.webp' },
{ id: 'rug-040', name: 'On The Road', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/OnTheRoad.webp' },
{ id: 'rug-041', name: 'Paisa', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Paisa.webp' },
{ id: 'rug-042', name: 'Pari', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Pari.webp' },
{ id: 'rug-043', name: 'Path', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Path.webp' },
{ id: 'rug-044', name: 'Phulchoki', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Phulchoki.webp' },
{ id: 'rug-045', name: 'Ping', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Ping.webp' },
{ id: 'rug-046', name: 'Purano Jhyal', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/PuranoJhyal.webp' },
{ id: 'rug-047', name: 'Rain Forest', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/RainForest.webp' },
{ id: 'rug-048', name: 'Retro', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Retro.webp' },
{ id: 'rug-049', name: 'Ring', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Ring.webp' },
{ id: 'rug-050', name: 'Sherpa Love', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/SherpaLove.webp' },
{ id: 'rug-051', name: 'Shreepanch', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Shreepanch.webp' },
{ id: 'rug-052', name: 'Shyala', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Shyala.webp' },
{ id: 'rug-053', name: 'Smoke', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Smoke.webp' },
{ id: 'rug-054', name: 'Sweet16', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Sweet16.webp' },
{ id: 'rug-055', name: 'Sukool', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Sukool.webp' },
{ id: 'rug-056', name: 'Terai Farm', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/TeraiFarm.webp' },
{ id: 'rug-057', name: 'Thaali', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Thaali.webp' },
{ id: 'rug-058', name: 'Thoughts', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Thoughts.webp' },
{ id: 'rug-059', name: 'Tides', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Tides.webp' },
{ id: 'rug-060', name: 'Tihar', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Tihar.webp' },
{ id: 'rug-061', name: 'The Wall', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/TheWall.webp' },
{ id: 'rug-062', name: 'Trek', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Trek.webp' },
{ id: 'rug-063', name: 'Tsum Valley Patan', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/TsumValleyPatan.webp' },
{ id: 'rug-064', name: 'Undefined Universe', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/UndefinedUniverse.webp' },
{ id: 'rug-065', name: 'Vines', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Vines.webp' },
{ id: 'rug-066', name: 'Water Brust', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/WaterBrust.webp' },
{ id: 'rug-067', name: 'Water Coin', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/WaterCoin.webp' },
{ id: 'rug-068', name: 'Water Lilies', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/WaterLilies.webp' },
{ id: 'rug-069', name: 'Weave', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Weave.webp' },
{ id: 'rug-070', name: 'Kopila', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Kopila.webp' },
{ id: 'rug-071', name: 'Chaal', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Chaal.webp' },
{ id: 'rug-072', name: 'Ankha Nani', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/AnkhaNani.webp' },
{ id: 'rug-073', name: 'Ilusion', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Ilusion.webp' },
{ id: 'rug-074', name: 'Bloom', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Bloom.webp' },
{ id: 'rug-075', name: 'Maya', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Maya.webp' },
{ id: 'rug-076', name: 'Graha', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Graha.webp' },
{ id: 'rug-077', name: 'Scale', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Scale.webp' },
{ id: 'rug-078', name: 'Tulsi Bibaha', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/TulsiBibaha.webp' },
{ id: 'rug-079', name: 'Pooja', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Pooja.webp' },
{ id: 'rug-080', name: 'Trisul', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/Trisul.webp' },
{ id: 'rug-081', name: 'Rose Garland', imageUrl: 'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/products/RoseGarland.webp' },


];

const AllCollections: React.FC = () => {
  const [activeCarpet, setActiveCarpet] = useState<Carpet | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 20;

  // Memoize filtered carpets to prevent unnecessary recalculations
  const filteredCarpets = useMemo(() => {
    if (searchQuery.trim() === "") return carpets;
    const query = searchQuery.toLowerCase();
    return carpets.filter((carpet) => carpet.name.toLowerCase().startsWith(query));
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredCarpets.length / itemsPerPage);
  
  // Memoize current page carpets
  const currentCarpets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCarpets.slice(startIndex, endIndex);
  }, [filteredCarpets, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearch = useCallback(() => {
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
  }, [totalPages]);

  const handleCarpetClick = useCallback((carpet: Carpet) => {
    setActiveCarpet(carpet);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveCarpet(null);
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#fdfdfb] pt-20 pb-10 sm:py-20">
        {/* Container with responsive width centered */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 [@media(min-width:768px)_and_(max-width:820px)]:w-[90%] [@media(min-width:768px)_and_(max-width:820px)]:px-2">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 sm:mt-6 md:mt-10 mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 max-w-[254.4px] sm:max-w-none mx-auto sm:mx-0">
            {/* Heading - Left */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              All Collections
            </h1>

            {/* Search Input - Right */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="border border-gray-900 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-gray-900 focus:border-gray-900 text-xs sm:text-sm flex-1 sm:flex-none sm:w-40 md:w-48"
              />
              <button 
                onClick={handleSearch}
                className="bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-700 transition text-xs sm:text-sm"
              >
                Search
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 [@media(min-width:768px)_and_(max-width:820px)]:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 [@media(min-width:768px)_and_(max-width:820px)]:gap-6 [@media(min-width:768px)_and_(max-width:820px)]:px-4">
            {currentCarpets.length > 0 ? (
              currentCarpets.map((carpet) => (
                <motion.div
                  key={carpet.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="bg-gray-200 rounded-xl sm:rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition flex flex-col max-w-[254.4px] sm:max-w-[240px] [@media(min-width:768px)_and_(max-width:820px)]:max-w-none md:max-w-[180px] lg:max-w-none mx-auto"
                  onClick={() => handleCarpetClick(carpet)}
                >
                  {/* Image now fills entire card width */}
                  <div className="flex justify-center items-center bg-gray-200 h-[318px] sm:h-[260px] [@media(min-width:768px)_and_(max-width:820px)]:h-[320px] md:h-[240px] lg:h-[280px] xl:h-[380px]">
                    <img
                      src={carpet.imageUrl}
                      alt={carpet.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Carpet name container */}
                  <div className="p-1 text-center bg-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {carpet.name}
                    </h2>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">No carpets found matching "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 sm:mt-10 space-x-1 sm:space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition ${currentPage === index + 1
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeCarpet && (
            <motion.div
              key="modal"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                key={activeCarpet.id}
                className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.95, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 50 }}
                transition={{ duration: 1 }}
              >
                {/* Close Button */}
                <div className="absolute top-0 right-0 m-2 bg-white rounded-full z-10">
                  <button
                    onClick={handleCloseModal}
                    className="p-1 text-gray-600 hover:text-gray-900 transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Image and zoom controls */}
                <TransformWrapper>
                  {({ zoomIn, zoomOut }) => (
                    <>
                      <TransformComponent>
                        <img
                          src={activeCarpet.imageUrl}
                          alt={activeCarpet.name}
                          className="object-contain max-h-[80vh] max-w-[90vw]"
                        />
                      </TransformComponent>
                      {/* Carpet name with zoom controls */}
                      <div className="flex items-center justify-between py-4 bg-gray-200 px-4">
                        <button
                          onClick={() => zoomOut()}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full transition"
                        >
                          <Minus size={20} />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {activeCarpet.name}
                        </h2>
                        <button
                          onClick={() => zoomIn()}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full transition"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </>
                  )}
                </TransformWrapper>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </>
  );
};

export default AllCollections;