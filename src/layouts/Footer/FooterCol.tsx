import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { EmptyImage } from '@/constants/imageUrl';
import { ChervRightIcon } from '@/library';
import getImagePath from '@/util/getImagePath';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';

export interface FooterColProps {
  title: string;
  entries?: {
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
  flexRow?: boolean;
  showTitle?: boolean;
}

const FooterCol = ({ title, entries, flexRow, showTitle }: FooterColProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  return (
    <div className="pb-4 lg:pb-0">
      <h4 className="pb-2 lg:pb-6 font-normal">{title}</h4>
      <div
        className={clsx(
          flexRow ? 'flex flex-row gap-8' : 'flex flex-col gap-y-2',
          title === 'Hotels & Resorts' && 'grid grid-cols-1 lg:grid-cols-2 gap-x-5'
        )}
      >
        {entries?.map((titles) => {
          const icon = selected === ThemeType.default ? titles?.icon : titles?.icon_white;
          return (
            <div key={titles.title} className="flex items-center gap-4">
              {showTitle && <ChervRightIcon />}
              <Link
                className="w-fit text-primary-switch hover:text-PrimaryBlue text-base leading-5"
                href={titles.link}
              >
                {showTitle ? (
                  titles.title
                ) : (
                  <div className="relative">
                    <Image
                      className="w-full h-[25px]"
                      src={icon?.data ? getImagePath(icon?.data?.attributes?.url) : EmptyImage}
                      alt={'icon'}
                      width={0}
                      height={0}
                    />
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterCol;
