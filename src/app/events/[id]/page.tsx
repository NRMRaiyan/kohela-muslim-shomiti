import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailContent from "@/components/EventDetailContent";
import { getEventById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getEventById(Number(id));
  if (!item) return {};
  return { title: item.title, description: item.description };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getEventById(Number(id));
  if (!item) notFound();
  return <EventDetailContent item={item} />;
}
