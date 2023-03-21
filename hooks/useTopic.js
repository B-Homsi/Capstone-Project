import { useRouter } from "next/router";

export function useTopic(subjects) {
  const router = useRouter();
  const { id } = router.query;

  const subject = subjects?.find((s) => s.topics.some((t) => t.id === id));
  const topic = subject?.topics.find((t) => t.id === id);

  return { subject, topic, id };
}
