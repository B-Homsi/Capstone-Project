import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import { exampleData } from "@/assets/exampleData";

export default function App({ Component, pageProps }) {
  const [subjects, setSubjects] = useLocalStorageState("subjects", {
    defaultValue: [...exampleData],
  });


  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Bilals Capstone Project</title>
      </Head>
      <Component {...pageProps} subjects={subjects} setSubjects={setSubjects} />
    </>
  );
}
