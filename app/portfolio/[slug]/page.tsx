import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, ChevronRight } from "lucide-react";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Hasni Developers Portfolio`,
    description: project.summary,
  };
}

async function getProject(slug: string) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0] {
    title,
    client,
    mainImage,
    additionalImages,
    summary,
    content,
    technologies,
    websiteUrl,
    challenges,
    solutions,
    results,
    testimonial->,
    serviceCategory->,
    relatedProjects[]->{ title, slug, summary, mainImage }
  }`, { slug });
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {project.summary}
            </p>
            {project.websiteUrl && (
              <Button size="lg" asChild>
                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Image */}
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold">{project.title}</p>
                </div>
              </div>

              {/* Project Description */}
              <div className="prose dark:prose-invert max-w-none">
                <PortableText value={project.content} />
              </div>

              {/* Challenges & Solutions */}
              {(project.challenges || project.solutions) && (
                <div className="grid md:grid-cols-2 gap-8">
                  {project.challenges && (
                    <div className="bg-card rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-4">Challenges</h3>
                      <p className="text-muted-foreground">{project.challenges}</p>
                    </div>
                  )}
                  {project.solutions && (
                    <div className="bg-card rounded-lg border p-6">
                      <h3 className="text-xl font-semibold mb-4">Solutions</h3>
                      <p className="text-muted-foreground">{project.solutions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {project.results && (
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-xl font-semibold mb-4">Results & Impact</h3>
                  <p className="text-muted-foreground">{project.results}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                <div className="space-y-4">
                  {project.client && (
                    <div>
                      <h4 className="font-medium mb-1">Client</h4>
                      <p className="text-muted-foreground">{project.client}</p>
                    </div>
                  )}
                  {project.serviceCategory && (
                    <div>
                      <h4 className="font-medium mb-1">Service Category</h4>
                      <p className="text-muted-foreground">{project.serviceCategory.title}</p>
                    </div>
                  )}
                  {project.technologies && (
                    <div>
                      <h4 className="font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Testimonial */}
              {project.testimonial && (
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
                  <blockquote className="text-muted-foreground">
                    "{project.testimonial.content}"
                  </blockquote>
                  <div className="mt-4 flex items-center">
                    <div className="mr-3 h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold">
                        {project.testimonial.name.split(" ").map((n: string) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{project.testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.testimonial.position}
                        {project.testimonial.company && `, ${project.testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Start Your Project</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to transform your business with our expertise? Let's discuss
                  your project requirements.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.relatedProjects.map((related: any) => (
                <Link
                  key={related.slug.current}
                  href={`/portfolio/${related.slug.current}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg border p-6 h-full hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {related.summary}
                    </p>
                    <span className="text-primary font-medium flex items-center text-sm">
                      View Project
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}