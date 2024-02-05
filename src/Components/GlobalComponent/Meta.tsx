import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";

interface meta {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  pathName?: string;
}

const Meta = ({
  title,
  description,
  keywords,
  ogImage,
  ogType,
  pathName,
}: meta) => {
  const { t } = useTranslation();
  // const { global } = useSelector((state) => state.globalSettings)
  // const origin =
  //     typeof window !== 'undefined' && window.location.origin
  //         ? window.location.origin
  //         : ''
  // const business_name = global?.business_name
  return (
    <Head>
      <title>{title}</title>
      {/*<meta name="description" content={description} />*/}
      {/* <meta name="theme-color" content="lab(29.2345% 39.3825 20.0664)" /> */}
      {/* <meta name="google-site-verification" content="google4884317e3a83871a" /> */}
      {/*<!-- Google / Search Engine Tags -->*/}
      <meta charSet="UTF-8" />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={ogImage} />
      <meta property="og:type" content="website" />
      {/* <meta
                name="keywords"
                content={'talabate , talabatee , order , food-delivery'}
            /> */}
      <meta
        name="keywords"
        content={
          "talabate,talabatee,order,food-delivery,order-Edelivery,delivery,gahez,hungerStation,otlob"
        }
      />
      <meta name="description" content={title} />
      <meta name="author" content={title} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/*<!-- Facebook Meta Tags -->*/}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:width" content="1080" />
      <meta property="og:image:height" content="608" />
      <meta property="og:url" content={pathName} />
      <meta property="og:type" content="website" />

      {/*<!-- Twitter Meta Tags -->*/}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Meta;
