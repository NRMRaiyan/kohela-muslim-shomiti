import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailContent from "@/components/NewsDetailContent";
import { getNewsBySlug } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.shortDescription,
    openGraph: {
      title: item.title,
      description: item.shortDescription,
      images: item.featuredImage ? [item.featuredImage] : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();
  return <NewsDetailContent item={item} />;
}
