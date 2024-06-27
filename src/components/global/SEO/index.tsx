import View from "./View";
import { SEO } from "./type";

interface SEOComponentProps {
  data: {
    seo: SEO
  }
}

const SEOComponent = (props: SEOComponentProps) => {
  const { seo } = props.data;

  const model = {
    ...seo
  }

  return <View model={model} />;
}

export default SEOComponent;
