import GlobalStyle from "@/styles";
import Head from "next/head";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

const exampleRoadmaps = [
  {
    id: uid(),
    title: "JavaScript Basics",
    color: "#fab005",
    topics: [
      {
        id: uid(),
        title: "Variables",
        cards: [
          {
            id: uid(),
            question: "List all primitive Types.",
            answer: "number, boolean, string, ...",
          },
        ],
      },
      { id: uid(), title: "Operators" },
      { id: uid(), title: "Functions" },
      { id: uid(), title: "Arrays" },
      { id: uid(), title: "Objects" },
    ],
  },
  {
    id: uid(),
    title: "Backend",
    color: "#228be6",
    topics: [
      { id: uid(), title: "Node.js" },
      { id: uid(), title: "Express" },
      { id: uid(), title: "MongoDB" },
    ],
  },
  {
    id: uid(),
    title: "Mathematics",
    color: "#e64980",
    topics: [
      { id: uid(), title: "Precalculus" },
      { id: uid(), title: "Calculus" },
      { id: uid(), title: "Linear Algebra" },
      { id: uid(), title: "Differential Equations" },
      { id: uid(), title: "Partial Differential Equations" },
    ],
  },
];

export default function App({ Component, pageProps }) {
  const [roadmaps, setRoadmaps] = useLocalStorageState("roadmaps", {
    defaultValue: [...exampleRoadmaps],
  });

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component {...pageProps} roadmaps={roadmaps} setRoadmaps={setRoadmaps} />
    </>
  );
}
