import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Digital Marketing & Web Development Insights",
  description: "Stay updated with the latest trends, tips, and insights in digital marketing, web development, and technology.",
};

async function getPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    categories[]->,
    author->,
    featured
  }`);
}

async function getCategories() {
  return client.fetch(`*[_type == "category"] {
    title,
    slug,
    description
  }`);
}

export default async function BlogPage() {
  const posts = await getPosts();
  const categories = await getCategories();

  // Separate featured posts
  const featuredPosts = posts.filter((post: any) => post.featured);
  const regularPosts = posts.filter((post: any) => !post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Our Blog</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Insights, tips, and expert advice on digital marketing, web development,
              and technology trends.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post: any) => (
                <Link
                  key={post.slug.current}
                  href={`/blog/${post.slug.current}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg border hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center">
                        <p className="text-white text-xl font-bold">{post.title}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                        <span>By {post.author.name}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories?.map((category: any) => (
                          <Badge key={category.slug.current} variant="secondary">
                            {category.title}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-primary font-medium">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter & Posts Grid */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button variant="outline" className="rounded-full">All Posts</Button>
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

          {/* Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post: any) => (
              <Link
                key={post.slug.current}
                href={`/blog/${post.slug.current}`}
                className="group"
              >
                <div className="bg-card rounded-lg border hover:shadow-md transition-shadow h-full">
                  <div className="relative h-48 w-full overflow-hidden bg-muted rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center">
                      <p className="text-white text-xl font-bold">{post.title}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                      <span>By {post.author.name}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories?.map((category: any) => (
                        <Badge key={category.slug.current} variant="secondary">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="rounded-2xl p-8 md:p-12 lg:p-16 hero-gradient text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-white mb-4">Stay Updated</h2>
              <p className="text-white/90 text-lg mb-8">
                Subscribe to our newsletter for the latest insights and trends in
                digital marketing and web development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}