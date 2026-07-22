import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Our Digital Experts",
  description: "Contact Hasni Developers for your digital marketing and web development needs. We're here to help transform your business.",
};

async function getContactInfo() {
  return client.fetch(`*[_type == "contact"][0] {
    email,
    phoneNumber,
    address,
    officeHours,
    socialLinks,
    formFields
  }`);
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Get in Touch</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-xl border p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Office Address</h3>
                      <p className="text-muted-foreground">{contactInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-muted-foreground">{contactInfo.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div>
                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                <div className="bg-card rounded-lg border p-6">
                  {contactInfo.officeHours?.map((hours: any, index: number) => (
                    <div key={index} className="flex justify-between py-2">
                      <span className="font-medium">{hours.day}</span>
                      <span className="text-muted-foreground">{hours.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Have Questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Check out our frequently asked questions for quick answers to common queries.
                </p>
                <Button variant="outline" asChild>
                  <a href="/faq">Visit FAQ Page</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="rounded-xl overflow-hidden h-[400px] bg-card border">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map Integration Here</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}