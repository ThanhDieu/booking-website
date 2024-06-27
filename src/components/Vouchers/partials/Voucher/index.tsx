import View from "./View";
import { ImageType } from "@/types/base";

export interface VoucherProps {
  id: string,
  title: string,
  subTitle: string,
  description: string,
  value: number,
  currency: 'USD' | 'EUR',
  photos: {
    file: {
      data: ImageType[]
    }
  },
}


const Voucher = (props: { data: VoucherProps }) => {
  const { id, title, subTitle, description, value, currency } = props.data;
  const photos = props.data.photos?.file?.data?.map((file: any) => file.attributes?.url);
  let photo = '';
  if (photos.length) {
    photo = photos[0]
  }

  const model = {
    id,
    title,
    subTitle,
    description,
    value,
    currency,
    photo
  };

  return <View model={model} />;
}

export default Voucher;
