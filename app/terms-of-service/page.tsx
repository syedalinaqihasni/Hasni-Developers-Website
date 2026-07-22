import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = {
  title: "Terms of Service | Hasni Developers",
  description: "Read our terms of service and conditions for using our digital marketing and web development services.",
};

async function getTermsOfService() {
  return client.fetch(`*[_type == "legal" && slug.current == "terms-of-service"][0] {
    title,
    content,
    lastUpdated
  }`);
}

export default async function TermsOfServicePage() {
  const terms = await getTermsOfService();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1  className="mb-6">Terms of Service</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              <PortableText value={terms?.content} />
            </div>
            {terms?.lastUpdated && (
              <p className="mt-8 text-sm text-muted-foreground">
                Last updated: {new Date(terms.lastUpdated).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}