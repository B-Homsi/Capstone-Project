import SubjectCard from "./SubjectCard";
import Link from "next/link";

export default function SubjectList({
  subjects,
  onDeleteSubject,
  onDeleteSubjectClick,
  onEditSubjectClick,
  openedPopup,
  setOpenedPopup,
  setSubjectToDelete,
  options,
  inLearnPage,
}) {
  return (
    <>
      {inLearnPage &&
        subjects.map((subject) => (
          <Link key={subject.id} href={`/learn/${subject.id}`}>
            <SubjectCard key={subject.id} subject={subject} />
          </Link>
        ))}

      {!inLearnPage &&
        subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onDeleteSubject={onDeleteSubject}
            onDeleteSubjectClick={onDeleteSubjectClick}
            setSubjectToDelete={setSubjectToDelete}
            onEditSubjectClick={onEditSubjectClick}
            openedPopup={openedPopup}
            setOpenedPopup={setOpenedPopup}
            options={options}
            inLearnPage={inLearnPage}
          />
        ))}
    </>
  );
}
