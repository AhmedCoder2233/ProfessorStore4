'use client'

import Contact from "./Contact/page"
import Footer from "./Footer/page"
import Hero from "./Hero/page"
import Navbar from "./Navbar/page"
import Portfolio from "./Portfolio/page"
import Services from "./Services/page"
import Stats from "./Stats/page"


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />

      <Footer />
    </main>
  )
}