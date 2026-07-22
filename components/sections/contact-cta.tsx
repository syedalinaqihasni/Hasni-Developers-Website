"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <div 
          className="rounded-2xl p-8 md:p-12 lg:p-16 hero-gradient text-white relative overflow-hidden"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-4">Ready to Transform Your Digital Presence?</h2>
            <p className="text-white/90 text-lg mb-8">
              Let's discuss how we can help your business grow with our expert digital solutions.
              Contact us today for a consultation and free quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}