import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import FeaturedWorkSection from "@/components/sections/featured-work-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactCTA from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "Digital Marketing & Web Development Company",
  description: "Hasni Developers provides professional web development, SEO, and digital marketing services to help grow your business online.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}