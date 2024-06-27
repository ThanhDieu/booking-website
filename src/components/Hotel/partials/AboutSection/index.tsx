import clsx from 'clsx';
import styles from '../../Hotel.module.scss';
import Image from 'next/image';
import { RatingStarIcon } from '@/library';
import ButtonShare from '@/components/global/ButtonShare';
import { EmptyImage } from '@/constants/imageUrl';
import { ImageType } from '@/types/propertyType.ts/propertyType';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useRouter } from 'next/router';
import getImagePath from '@/util/getImagePath';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import { Wrapper } from '@/components/global/Wrapper';

export interface contactData {
  information: string;
  icon: ImageType;
  whiteIcon: ImageType;
}
export interface IProps {
  name: string;
  ratings: number;
  contactInfo: contactData[];
  description: string;
  blackLogo: string;
  whiteLogo: string;
  buttonText?: string;
  buttonLink?: string;
}

const AboutSection = ({
  name,
  ratings,
  description,
  blackLogo,
  contactInfo = [],
  whiteLogo,
  buttonText,
  buttonLink,
}: IProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const router = useRouter();
  const fixedRatings = Number(ratings.toFixed(0));

  return (
      <Wrapper id="about" className={styles.scrollMarginTop}>
        <div className="flex flex-col lg:flex-row gap-8">
          {description && (
            <div className="lg:w-2/3 flex flex-col justify-center text-justify">
              <ReactMarkdown className="!font-normal text-primary-switch">
                {description}
              </ReactMarkdown>
            </div>
          )}
          <div className="bg-primary-switch py-10 px-7 mx-auto lg:w-1/3">
            <div className="flex flex-col text-center mb-5">
              <Image
                className="mx-auto w-36 h-8 object-cover"
                alt="hotel logo"
                height={0}
                width={0}
                src={
                  selected === ThemeType.default
                    ? blackLogo !== ''
                      ? blackLogo
                      : EmptyImage
                    : whiteLogo !== ''
                    ? whiteLogo
                    : EmptyImage
                }
              />
              <h2 className={clsx(styles.aboutContactName, 'font-[lora]')}>{name}</h2>
              <div className="flex mx-auto">
                {[...Array(fixedRatings)]?.map((len, idx) => (
                  <RatingStarIcon key={idx} />
                ))}
              </div>
              <div className="mt-2">
                {contactInfo?.map((ele: contactData, index) => (
                  <div
                    key={index}
                    className={clsx(styles.topBorder, 'flex py-2 items-center text-primary-switch')}
                  >
                    <Image
                      src={
                        selected === ThemeType.default
                          ? ele?.icon?.data?.attributes?.url
                            ? getImagePath(ele?.icon?.data?.attributes?.url)
                            : EmptyImage
                          : ele?.whiteIcon?.data?.attributes?.url
                          ? getImagePath(ele?.whiteIcon?.data?.attributes?.url)
                          : EmptyImage
                      }
                      alt="icon"
                      width={20}
                      height={20}
                    />
                    <span className={clsx(styles.aboutText, 'ml-4 text-left')}>
                      {ele?.information}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-6 w-fit">
                <ButtonShare
                  onClick={() => router.push(buttonLink || '/contact')}
                  style="outline"
                  content={buttonText || 'Send Hotel a Message'}
                  size={'medium'}
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
  );
};

export default AboutSection;
