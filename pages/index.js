import Roadmaps from "../components/Roadmaps/Roadmaps";
export default function Home({ roadmaps, setRoadmaps }) {
  return (
    <main>
      <Roadmaps roadmaps={roadmaps} setRoadmaps={setRoadmaps} />
    </main>
  );
}
