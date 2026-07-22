"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Globe, Code, BarChart, Smartphone, Monitor, Database } from "lucide-react";

const services = [
  {
    id: "wordpress",
    title: "WordPress Design & Development",
    description: "Custom WordPress websites with responsive designs, optimized performance, and easy content management.",
    icon: Monitor,
    href: "/services/wordpress",
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    description: "Stunning, functional websites built with the latest technologies to create memorable digital experiences.",
    icon: Globe,
    href: "/services/web-design",
  },
  {
    id: "seo",
    title: "SEO & Digital Marketing",
    description: "Comprehensive SEO strategies to improve rankings, drive traffic, and increase conversions for your business.",
    icon: BarChart,
    href: "/services/seo",
  },
  {
    id: "saas",
    title: "SaaS & Custom Software",
    description: "Tailored software solutions to streamline operations, enhance productivity, and solve unique business challenges.",
    icon: Database,
    href: "/services/custom-software",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that provide seamless experiences across all devices.",
    icon: Smartphone,
    href: "/services/mobile-apps",
  },
  {
    id: "application",
    title: "Application Development",
    description: "Robust, scalable applications engineered to deliver exceptional user experiences and business value.",
    icon: Code,
    href: "/services/application-development",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section className="section-padding bg-muted/50" ref={ref}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="mb-4">Our Digital Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital solutions to help your business thrive in the online world.
            From web development to digital marketing, we've got you covered.
          </p>
        </div>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="border bg-card hover:shadow-md transition-shadow overflow-hidden group"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md mb-4 bg-primary/10 flex items-center justify-center text-primary">
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 h-auto group" asChild>
                  <Link href={service.href}>
                    <span className="text-primary font-medium flex items-center">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/services">
              View All Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}