import { Wrapper } from '@/components/global/Wrapper';
import { EmptyImage } from '@/constants/imageUrl';
import clsx from 'clsx';
import Image from 'next/image';
import styles from '../../Hotel.module.scss';
import getImagePath from '@/util/getImagePath';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';

type FeatureSectionProps = {
  items: {
    text: string;
    icon: { data: { attributes: { url: string } } };
    whiteIcon: { data: { attributes: { url: string } } };
  }[];
};
const FeatureSection = ({ items }: FeatureSectionProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  return items ? (
    <div className="bg-primary-switch">
      <Wrapper>
        <div className="grid grid-cols-4 gap-6">
          {items?.map((item, idx) => (
            <div key={idx} className="lg:col-span-1 col-span-2 flex items-center gap-2 py-auto">
              <Image
                className="w-6 h-6"
                src={
                  selected === ThemeType.default
                    ? item?.icon?.data?.attributes?.url
                      ? getImagePath(item?.icon?.data?.attributes?.url)
                      : EmptyImage
                    : item?.whiteIcon?.data?.attributes?.url
                    ? getImagePath(item?.whiteIcon?.data?.attributes?.url)
                    : EmptyImage
                }
                height={0}
                width={0}
                alt={''}
              />
              <p className={clsx(styles.featureItem, 'textDesc-1')}>{item.text}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  ) : (
    <div className="hidden"></div>
  );
};

export default FeatureSection;
