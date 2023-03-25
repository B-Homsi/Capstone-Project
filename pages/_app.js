import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout/Layout";
import { useState } from "react";
import { exampleData } from "@/assets/exampleData";

export default function App({ Component, pageProps }) {
  const [subjects, setSubjects] = useLocalStorageState("subjects", {
    defaultValue: [...exampleData],
  });

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Bilals Capstone Project</title>
      </Head>
      <Layout showForm={showForm} setShowForm={setShowForm}>
        <Component
          {...pageProps}
          subjects={subjects}
          setSubjects={setSubjects}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </Layout>
    </>
  );
}
