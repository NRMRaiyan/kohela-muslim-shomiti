import type { Metadata } from "next";
import CommitteeContent from "@/components/CommitteeContent";
import { getCommittee } from "@/lib/data";

export const metadata: Metadata = {
  title: "Committee",
  description: "Meet the committee members of Kohela Muslim Shomitti.",
};

export default async function CommitteePage() {
  const members = await getCommittee();
  return <CommitteeContent members={members} />;
}
