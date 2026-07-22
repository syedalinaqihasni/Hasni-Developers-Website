import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions",
  description: "Find answers to common questions about our digital marketing and web development services.",
};

async function getFAQs() {
  return client.fetch(`*[_type == "faq"] | order(order asc) {
    question,
    answer,
    category,
    tags
  }`);
}

async function getCategories() {
  return client.fetch(`*[_type == "faq"].category`);
}

export default async function FAQPage() {
  const faqs = await getFAQs();
  const categories = Array.from(new Set(await getCategories()));

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Find answers to common questions about our services, processes, and solutions.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <Button variant="outline" className="rounded-full">All Categories</Button>
            {categories.map((category: string) => (
              <Button
                key={category}
                variant="outline"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {categories.map((category: string) => {
              const categoryFaqs = faqs.filter((faq: any) => faq.category === category);
              
              return (
                <div key={category}>
                  <h2 className="text-2xl font-bold mb-6">{category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {categoryFaqs.map((faq: any, index: number) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose dark:prose-invert max-w-none pt-4">
                            <PortableText value={faq.answer} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="rounded-2xl p-8 md:p-12 lg:p-16 hero-gradient text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-white mb-4">Still Have Questions?</h2>
              <p className="text-white/90 text-lg mb-8">
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}