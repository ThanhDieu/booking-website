import FooterCol from './FooterCol';
import { Wrapper } from '@/components';
import Brand from '../Header/Brand';
import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import { ThemeType } from '@/store/slice/themeSlice';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import clsx from 'clsx';
import styles from './Footer.module.scss';

interface IconProp {
  url: string;
  width: string;
  ext: string;
}
export interface footerProps {
  footerMenu: {
    icon_black: { data: { attributes: IconProp; id: number } };
    icon_white: { data: { attributes: IconProp; id: number } };
    title: string;
    name?: string;
    entries: {
      title?: string;
      link: string;
      icon: {
        data: {
          attributes: { url: string };
        };
      };
      icon_white: {
        data: {
          attributes: { url: string };
        };
      };
    }[];
  }[];
}

const Footer = ({ footerMenu }: footerProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);

  const icons = useMemo(() => {
    const connectFooter = footerMenu?.length
      ? footerMenu?.filter((el) => el.name === 'Stay Connected')
      : [];

    const icon_black = connectFooter.length
      ? connectFooter[0]?.icon_black?.data?.attributes?.url
      : '';
    const icon_white = connectFooter.length
      ? connectFooter[0]?.icon_white?.data?.attributes?.url
      : '';

    return { icon_black, icon_white };
  }, [footerMenu]);
  return (
    <footer className="bg-primary-switch relative z-50" id="footer">
      <Wrapper>
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {footerMenu?.map((col, idx) =>
            idx === 3 ? (
              <div key={col.title}>
                <FooterCol flexRow title={col.title} entries={col.entries} />
              </div>
            ) : (
              <div key={col.title}>
                <FooterCol showTitle title={col.title} entries={col.entries} />
              </div>
            )
          )}
        </div>
      </Wrapper>
      <Wrapper
        className={clsx(`md:pt-8 pt-4 flex items-center justify-center`, styles.borderFooter)}
      >
        <Brand
          image={
            selected === ThemeType.default
              ? getImagePath(icons?.icon_black) || EmptyImage
              : getImagePath(icons?.icon_white) || EmptyImage
          }
        />
      </Wrapper>
    </footer>
  );
};

export default Footer;
