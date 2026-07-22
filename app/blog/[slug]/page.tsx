import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Hasni Developers Blog`,
    description: post.excerpt,
  };
}

async function getPost(slug: string) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    content,
    excerpt,
    categories[]->,
    author->,
    tags,
    relatedPosts[]-> {
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author->
    }
  }`, { slug });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28 bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {post.categories?.map((category: any) => (
                <Badge key={category.slug.current} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h1 className="mb-6">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
              <span>By {post.author.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-muted mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center">
                  <p className="text-white text-2xl font-bold">{post.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="prose dark:prose-invert max-w-none">
                <PortableText value={post.content} />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center">
                  <div className="mr-4 h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      {post.author.name.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{post.author.name}</h3>
                    <p className="text-muted-foreground">{post.author.position}</p>
                    <p className="text-sm mt-2">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Author Card */}
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {post.author.name.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    <p className="text-sm text-muted-foreground">{post.author.position}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              </div>

              {/* Categories */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {post.categories?.map((category: any) => (
                    <Badge key={category.slug.current} variant="secondary">
                      {category.title}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest insights and trends delivered to your inbox.
                </p>
                <Button className="w-full">Subscribe Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {post.relatedPosts.map((related: any) => (
                <Link
                  key={related.slug.current}
                  href={`/blog/${related.slug.current}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg border p-6 h-full hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{format(new Date(related.publishedAt), 'MMM dd, yyyy')}
                      </span>
                      <span>By {related.author.name}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {related.excerpt}
                    </p>
                    <span className="text-primary font-medium flex items-center text-sm">
                      Read More
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