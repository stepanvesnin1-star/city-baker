import { prisma } from "@/lib/prisma";
import BlogClient from "@/components/BlogClient";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <BlogClient posts={posts} />;
}