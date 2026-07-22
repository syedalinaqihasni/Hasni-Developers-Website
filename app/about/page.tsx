import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Digital Marketing & Web Development Experts",
  description: "Learn about Hasni Developers, our mission, values, and the talented team behind our successful digital solutions.",
};

async function getAboutData() {
  return client.fetch(`*[_type == "about"][0] {
    title,
    missionTitle,
    missionContent,
    visionTitle,
    visionContent,
    valuesTitle,
    values,
    storyTitle,
    storyContent,
    timelineTitle,
    timeline,
    teamSectionTitle,
    teamSectionDescription,
    ctaTitle,
    ctaText
  }`);
}

async function getTeamMembers() {
  return client.fetch(`*[_type == "team"] | order(order asc) {
    name,
    position,
    bio,
    image,
    department,
    skills,
    socialLinks
  }`);
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  const teamMembers = await getTeamMembers();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">About Hasni Developers</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We're a team of passionate digital experts committed to delivering
              exceptional solutions that drive business growth and success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2>{aboutData.missionTitle}</h2>
              <div className="prose dark:prose-invert">
                <PortableText value={aboutData.missionContent} />
              </div>
            </div>
            <div className="space-y-6">
              <h2>{aboutData.visionTitle}</h2>
              <div className="prose dark:prose-invert">
                <PortableText value={aboutData.visionContent} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">{aboutData.valuesTitle}</h2>
            <p className="text-lg text-muted-foreground">
              Our core values guide everything we do and shape how we work with our clients.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.values?.map((value: any, index: number) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">{aboutData.teamSectionTitle}</h2>
            <p className="text-lg text-muted-foreground">
              {aboutData.teamSectionDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member: any, index: number) => (
              <div
                key={index}
                className="bg-card rounded-lg border hover:shadow-md transition-all group"
              >
                <div className="aspect-square relative bg-muted rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center">
                    <p className="text-white text-xl font-bold">
                      {member.name.split(" ").map((n: string) => n[0]).join("")}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="mb-1">{member.name}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{member.position}</p>
                  <p className="text-sm line-clamp-3">{member.bio}</p>
                  {member.skills && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {member.skills.slice(0, 3).map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="rounded-2xl p-8 md:p-12 lg:p-16 hero-gradient text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-white mb-4">{aboutData.ctaTitle}</h2>
              <p className="text-white/90 text-lg mb-8">{aboutData.ctaText}</p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}