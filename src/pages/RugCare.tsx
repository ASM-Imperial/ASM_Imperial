import RugCarePage from '@/components/services/RugCarePage'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'


const RugCare = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      <RugCarePage />
      <Footer />
    </div>
  )
}

export default RugCare