"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 dark:from-primary/5 dark:to-secondary/5 -z-10"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 -z-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="mb-4 font-bold leading-tight">
              Transform Your Digital Presence With{" "}
              <span className="text-gradient">Innovative Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              We create cutting-edge websites, powerful applications, and results-driven 
              marketing strategies that help businesses grow and succeed in the digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            
            <div className="mt-8 md:mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="flex items-center">
                <div className="mr-3 flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full border-2 border-background bg-secondary/20 flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-xs font-semibold">HD</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-medium">500+ Clients</p>
                  <p className="text-muted-foreground">Trusted Worldwide</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 mr-3 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success">★</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium">5-Star Agency</p>
                  <p className="text-muted-foreground">100+ Reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-full aspect-video max-w-lg mx-auto rounded-xl overflow-hidden shadow-2xl">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center">
                <p className="text-white text-2xl font-bold">Digital Solutions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}