import { useSubject } from "@/hooks/useSubject.js";
import { useRouter } from "next/router";

export default function LearnSubject({ subjects, setSubjects }) {
  const router = useRouter();
  const { id } = router.query;

  const subject = subjects?.find((s) => s.id === id);

  if (!id || !subject || !subject.topics) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{subject.id}</h1>
    </>
  );
}
