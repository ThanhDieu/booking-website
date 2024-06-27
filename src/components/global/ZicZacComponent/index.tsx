import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Headlines from '../Headlines';

export type ZicZacComponentProps = {
  isTextFirst: boolean;
  image: { data: { attributes: { url: string } } };
  title?: string;
  text1?: string;
  text2?: string;
};

const ZicZacComponent = ({ image, title, text1, text2, isTextFirst }: ZicZacComponentProps) => {
  return (
    <section className="container pt-12">
      <div
        className={clsx(
          isTextFirst && 'md:flex-row-reverse flex-col-reverse',
          'flex flex-col-reverse md:flex-row gap-6 '
        )}
      >
        <div className="w-full md:w-1/2">
          <div className="w-full h-[360px] overflow-hidden">
            <Image
              src={image?.data ? getImagePath(image?.data?.attributes?.url) : EmptyImage}
              alt=""
              height={0}
              width={0}
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
        <div
          className={clsx(
            'w-full md:w-1/2 flex flex-col gap-y-4 justify-center',
            isTextFirst ? 'md:pr-5' : 'md:pl-5'
          )}
        >
          {title ? (
            <>
              <Headlines title={'About us'} subtitle={title} className="text-left" />
            </>
          ) : null}
          {text1 && <p className="body1 h-fit text-primary-switch">{text1}</p>}
          {text2 && <p className="body1 h-fit text-primary-switch">{text2}</p>}
        </div>
      </div>
    </section>
  );
};

export default ZicZacComponent;
