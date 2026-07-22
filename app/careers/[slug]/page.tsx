import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Mail, MapPin, Clock, Calendar } from "lucide-react";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const career = await getCareer(params.slug);
  
  if (!career) {
    return {
      title: "Position Not Found",
    };
  }

  return {
    title: `${career.title} | Careers at Hasni Developers`,
    description: career.shortDescription,
  };
}

async function getCareer(slug: string) {
  return client.fetch(`*[_type == "career" && slug.current == $slug][0] {
    title,
    department,
    location,
    employmentType,
    shortDescription,
    description,
    responsibilities,
    requirements,
    benefits,
    salary,
    publishedAt,
    closingDate,
    applicationUrl,
    applicationEmail
  }`, { slug });
}

export default async function CareerPage({ params }: Props) {
  const career = await getCareer(params.slug);

  if (!career) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6">{career.employmentType}</Badge>
            <h1 className="mb-6">{career.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {career.shortDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{career.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Posted {format(new Date(career.publishedAt), 'MMMM dd, yyyy')}</span>
              </div>
              {career.closingDate && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Closes {format(new Date(career.closingDate), 'MMMM dd, yyyy')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Job Description */}
              <div className="prose dark:prose-invert max-w-none mb-12">
                <PortableText value={career.description} />
              </div>

              {/* Responsibilities */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Key Responsibilities</h2>
                <ul className="space-y-4">
                  {career.responsibilities?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 mr-3">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-4">
                  {career.requirements?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5 mr-3">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              {career.benefits && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {career.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="bg-card rounded-lg border p-4">
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Info */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-6">Position Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Department</h4>
                    <p className="text-muted-foreground">{career.department}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-muted-foreground">{career.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Employment Type</h4>
                    <p className="text-muted-foreground">{career.employmentType}</p>
                  </div>
                  {career.salary && (
                    <div>
                      <h4 className="font-medium mb-1">Salary Range</h4>
                      <p className="text-muted-foreground">{career.salary}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Application CTA */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Apply Now</h3>
                {career.applicationUrl ? (
                  <Button className="w-full" asChild>
                    <a href={career.applicationUrl} target="_blank" rel="noopener noreferrer">
                      Apply Online
                    </a>
                  </Button>
                ) : career.applicationEmail ? (
                  <Button className="w-full" asChild>
                    <a href={`mailto:${career.applicationEmail}?subject=Application for ${career.title}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Apply via Email
                    </a>
                  </Button>
                ) : (
                  <Button className="w-full" asChild>
                    <a href="/contact">Contact Us</a>
                  </Button>
                )}
              </div>

              {/* Share */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Share Position</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">LinkedIn</Button>
                  <Button variant="outline" className="flex-1">Twitter</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Positions */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8">Similar Positions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for similar positions */}
            <div className="bg-card rounded-lg border p-6">
              <p className="text-muted-foreground">No similar positions available</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}