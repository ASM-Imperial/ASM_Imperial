
import StudioBanner from '@/components/contact/StudioBanner'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-off-white">
          <Navbar />
          <StudioBanner />
          <Footer />
        </div>
  )
}

export default Contact