import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NoticeDetailContent from "@/components/NoticeDetailContent";
import { getNoticeById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getNoticeById(Number(id));
  if (!item) return {};
  return { title: item.title, description: item.description };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getNoticeById(Number(id));
  if (!item) notFound();
  return <NoticeDetailContent item={item} />;
}
