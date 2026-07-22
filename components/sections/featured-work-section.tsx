"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const projects = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A fully-featured online store with product catalog, shopping cart, and secure payment processing.",
    image: "/placeholder-project.jpg",
    tags: ["Web Development", "E-Commerce", "UI/UX Design"],
    href: "/portfolio/ecommerce-platform",
  },
  {
    id: "real-estate-app",
    title: "Real Estate Application",
    description: "Mobile app for property listings with advanced search, virtual tours, and agent messaging.",
    image: "/placeholder-project.jpg",
    tags: ["Mobile App", "React Native", "API Integration"],
    href: "/portfolio/real-estate-app",
  },
  {
    id: "healthcare-portal",
    title: "Healthcare Patient Portal",
    description: "Secure patient management system with appointment scheduling and medical records access.",
    image: "/placeholder-project.jpg",
    tags: ["Web App", "Security", "User Experience"],
    href: "/portfolio/healthcare-portal",
  },
];

export default function FeaturedWorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="mb-4">Our Featured Work</h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of successful projects delivering exceptional results
            for clients across various industries.
          </p>
        </div>
        
        <div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {projects.map((project, index) => (
            <Link 
              key={project.id}
              href={project.href}
              className="group"
            >
              <div className="rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 flex items-center justify-center">
                    <p className="text-white font-medium">{project.title}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="inline-flex items-center text-primary font-medium">
                    View Project
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/portfolio">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}