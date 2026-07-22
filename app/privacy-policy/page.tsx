import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = {
  title: "Privacy Policy | Hasni Developers",
  description: "Learn about how we collect, use, and protect your personal information.",
};

async function getPrivacyPolicy() {
  return client.fetch(`*[_type == "legal" && slug.current == "privacy-policy"][0] {
    title,
    content,
    lastUpdated
  }`);
}

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              How we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              <PortableText value={policy?.content} />
            </div>
            {policy?.lastUpdated && (
              <p className="mt-8 text-sm text-muted-foreground">
                Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}