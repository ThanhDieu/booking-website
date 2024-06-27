import { NextSeo } from "next-seo"
import { SEO } from "./type";
import getImagePath from "@/util/getImagePath";

interface ViewProps {
  model: SEO
}

const View = (props: ViewProps) => {
  const {
    model: {
      metaTitle,
      metaDescription,
      shareImage
    }
} = props;

  return (
  <>
    <NextSeo
      title={metaTitle}
      description={metaDescription}
      openGraph={{
        images: [
          {
            url: getImagePath(shareImage?.data?.attributes?.url),
            alt: shareImage?.data?.attributes?.alternativeText ?? "",
            type: shareImage?.data?.attributes?.mime ?? "jpeg",
          }
        ]
      }}
    />
  </>)
}

export default View;
