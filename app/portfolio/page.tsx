import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Portfolio | Digital Marketing & Web Development Projects",
  description: "Explore our portfolio of successful digital projects, including web development, mobile apps, and digital marketing case studies.",
};

async function getProjects() {
  return client.fetch(`*[_type == "project"] {
    title,
    slug,
    client,
    mainImage,
    summary,
    technologies,
    serviceCategory->,
    featured,
    publishedAt
  }`);
}

async function getCategories() {
  return client.fetch(`*[_type == "service"] {
    title,
    slug
  }`);
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  const categories = await getCategories();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Our Portfolio</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Explore our collection of successful projects delivering exceptional
              results for clients across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button variant="outline" className="rounded-full">All Projects</Button>
            {categories.map((category: any) => (
              <Button
                key={category.slug.current}
                variant="outline"
                className="rounded-full"
              >
                {category.title}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Link
                key={project.slug.current}
                href={`/portfolio/${project.slug.current}`}
                className="group"
              >
                <div className="bg-card rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center">
                      <p className="text-white text-xl font-bold">{project.title}</p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.client && `Client: ${project.client}`}
                      </p>
                      <p className="text-muted-foreground">
                        {project.summary}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-primary font-medium">
                        View Project Details
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="rounded-2xl p-8 md:p-12 lg:p-16 hero-gradient text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-white mb-4">Ready to Start Your Project?</h2>
              <p className="text-white/90 text-lg mb-8">
                Let's discuss how we can help bring your vision to life with our expertise
                in digital solutions.
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
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}