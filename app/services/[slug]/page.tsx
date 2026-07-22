import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight } from "lucide-react";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Hasni Developers`,
    description: service.description,
  };
}

async function getService(slug: string) {
  return client.fetch(`*[_type == "service" && slug.current == $slug][0] {
    title,
    description,
    content,
    features[] {
      title,
      description,
      icon
    },
    relatedServices[]-> {
      title,
      slug,
      description
    }
  }`, { slug });
}

export default async function ServicePage({ params }: Props) {
  const service = await getService(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">{service.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose dark:prose-invert max-w-none">
              <PortableText value={service.content} />
            </div>
            <div className="space-y-8">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-4">
                  {service.features?.map((feature: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Get Started</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to transform your business with our {service.title.toLowerCase()}? 
                  Contact us today for a free consultation.
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

      {/* Related Services */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Related Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.relatedServices.map((related: any) => (
                <Link
                  key={related.slug.current}
                  href={`/services/${related.slug.current}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg border p-6 h-full hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {related.description}
                    </p>
                    <span className="text-primary font-medium flex items-center text-sm">
                      Learn More
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