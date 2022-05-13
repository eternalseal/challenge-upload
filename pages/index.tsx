import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import FileUpload from "../components/Upload/UploadFile";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container grid h-full min-h-screen mx-auto place-content-center">
        <FileUpload />
      </div>
    </div>
  );
};

export default Home;
