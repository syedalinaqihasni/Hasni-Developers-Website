import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Code, Globe, BarChart, Smartphone, Monitor, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Digital Marketing & Web Development Solutions",
  description: "Explore our comprehensive range of digital services including web development, SEO, mobile apps, and custom software solutions.",
};

const iconMap: { [key: string]: any } = {
  code: Code,
  globe: Globe,
  barChart: BarChart,
  smartphone: Smartphone,
  monitor: Monitor,
  database: Database,
};

async function getServices() {
  return client.fetch(`*[_type == "service"] {
    title,
    slug,
    description,
    icon,
    features[] {
      title,
      description,
      icon
    }
  }`);
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Our Digital Services</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Comprehensive digital solutions to help your business thrive online.
              From web development to digital marketing, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => {
              const IconComponent = iconMap[service.icon] || Globe;
              
              return (
                <Card 
                  key={service.slug.current}
                  className="border bg-card hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-md mb-4 bg-primary/10 flex items-center justify-center text-primary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features?.slice(0, 3).map((feature: any, index: number) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature.title}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="p-0 h-auto group" asChild>
                      <Link href={`/services/${service.slug.current}`}>
                        <span className="text-primary font-medium flex items-center">
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="rounded-2xl p-8 md:p-12 lg:p-16 hero-gradient text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-white mb-4">Ready to Transform Your Business?</h2>
              <p className="text-white/90 text-lg mb-8">
                Let's discuss how our services can help you achieve your digital goals.
                Contact us today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}