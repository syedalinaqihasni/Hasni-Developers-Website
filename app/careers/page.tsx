import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | Join Our Digital Marketing & Development Team",
  description: "Explore career opportunities at Hasni Developers. Join our team of digital experts and work on exciting projects.",
};

async function getCareers() {
  return client.fetch(`*[_type == "career" && status == "open"] | order(publishedAt desc) {
    title,
    slug,
    department,
    location,
    employmentType,
    shortDescription,
    publishedAt,
    featured
  }`);
}

async function getDepartments() {
  return client.fetch(`*[_type == "career" && status == "open"].department`);
}

export default async function CareersPage() {
  const careers = await getCareers();
  const departments = Array.from(new Set(await getDepartments()));
  const featuredJobs = careers.filter((job: any) => job.featured);
  const regularJobs = careers.filter((job: any) => !job.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Join Our Team</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Be part of an innovative team working on exciting projects and
              shaping the future of digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Featured Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredJobs.map((job: any) => (
                <Link
                  key={job.slug.current}
                  href={`/careers/${job.slug.current}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all">
                    <Badge className="mb-4">{job.employmentType}</Badge>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{job.shortDescription}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{job.department}</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      View Position
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Jobs */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button variant="outline" className="rounded-full">All Departments</Button>
            {departments.map((department: string) => (
              <Button
                key={department}
                variant="outline"
                className="rounded-full"
              >
                {department}
              </Button>
            ))}
          </div>

          {/* Jobs Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularJobs.map((job: any) => (
              <Link
                key={job.slug.current}
                href={`/careers/${job.slug.current}`}
                className="group"
              >
                <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow h-full">
                  <Badge className="mb-4">{job.employmentType}</Badge>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{job.shortDescription}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-primary font-medium">
                    View Position
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Why Join Hasni Developers?</h2>
            <p className="text-lg text-muted-foreground">
              We offer more than just a job - we provide opportunities for growth,
              innovation, and making a real impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Growth",
                description: "Continuous learning opportunities and career development paths"
              },
              {
                title: "Innovation Culture",
                description: "Work with cutting-edge technologies and creative solutions"
              },
              {
                title: "Work-Life Balance",
                description: "Flexible working hours and remote work options"
              },
              {
                title: "Collaborative Environment",
                description: "Supportive team culture and knowledge sharing"
              },
              {
                title: "Competitive Benefits",
                description: "Comprehensive healthcare and retirement plans"
              },
              {
                title: "Global Impact",
                description: "Work on projects that make a difference worldwide"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
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
              <h2 className="text-white mb-4">Don't See the Right Fit?</h2>
              <p className="text-white/90 text-lg mb-8">
                We're always looking for talented individuals to join our team.
                Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}