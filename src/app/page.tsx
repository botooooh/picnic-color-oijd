import { Hero } from "@/components/home/hero"
import { Countdown } from "@/components/home/countdown"
import { About } from "@/components/home/about"
import { Activities } from "@/components/home/activities"
import { Program } from "@/components/home/program"
import { Faq } from "@/components/home/faq"
import { Contact } from "@/components/home/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      <About />
      <Activities />
      <Program />
      <Faq />
      <Contact />
    </>
  )
}
