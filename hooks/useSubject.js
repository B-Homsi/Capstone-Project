import { useRouter } from "next/router";

export function useTopic(subjects) {
  const router = useRouter();
  const { id } = router.query;

  const subject = subjects?.find((s) => s.id === id);

  return { subject, id };
}
