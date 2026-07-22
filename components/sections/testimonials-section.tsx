"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: "1",
    content: "Hasni Developers transformed our online presence with a beautiful, functional website that perfectly captures our brand. Their SEO services have significantly increased our organic traffic and leads.",
    author: "Sarah Johnson",
    position: "CEO, StyleHub Boutique",
    avatar: "/avatar-placeholder.jpg"
  },
  {
    id: "2",
    content: "We hired Hasni Developers for a custom software solution and they exceeded our expectations. Their team understood our complex requirements and delivered a system that has streamlined our operations.",
    author: "Michael Chen",
    position: "CTO, TechInnovate",
    avatar: "/avatar-placeholder.jpg"
  },
  {
    id: "3",
    content: "The mobile app developed by Hasni Developers has been a game-changer for our customer engagement. It's intuitive, fast, and has received excellent feedback from our users.",
    author: "Jessica Williams",
    position: "Marketing Director, FitLife",
    avatar: "/avatar-placeholder.jpg"
  },
  {
    id: "4",
    content: "Working with Hasni Developers on our WordPress site was a pleasure. They were responsive, attentive to detail, and delivered a site that perfectly meets our needs while being easy to maintain.",
    author: "David Rodriguez",
    position: "Owner, Artisan Bakery",
    avatar: "/avatar-placeholder.jpg"
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section className="section-padding bg-muted/50" ref={ref}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it – hear what our clients have to say about
            their experiences working with Hasni Developers.
          </p>
        </div>
        
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border bg-card h-full">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary/20 mb-4" />
                      <p className="text-card-foreground mb-6">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-secondary/20 flex items-center justify-center">
                          <span className="text-xs font-semibold">{testimonial.author.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative static md:absolute" />
              <CarouselNext className="relative static md:absolute" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}