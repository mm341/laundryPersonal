import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import logo from "../../../public/logo.png";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/redux/store";
const DynamicFavicon = () => {
  const { master } = useAppSelector((state) => state.master);
 

  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href={master?.fav_icon} />
      <link rel="icon"  href={master?.fav_icon} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={master?.fav_icon}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={master?.fav_icon}
      />
    </Head>
  );
};

DynamicFavicon.propTypes = {};

export default DynamicFavicon;
