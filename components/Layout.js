import React from "react";
import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Showcase from "./Showcase";
export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase></Showcase>}
      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "Blood Quests | Let's create blood relations",
  description: "Request blood and donate",
  keywords: "blood,donate,request",
};
