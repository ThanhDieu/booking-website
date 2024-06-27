import { EmptyImage } from '@/constants/imageUrl';
import EnvVariable from '@/constants/imageUrl';
import { CheckIconBlue } from '@/library';
import { ImageType } from '@/types/propertyType.ts/propertyType';
import getImagePath from '@/util/getImagePath';
import Image from 'next/image';
import React from 'react';

interface IconInterface {
  text: string;
  iconId: string;
}

export interface ServiceCardProps {
  image: ImageType;
  title: string;
  text: string;
  icon: IconInterface[];
  linkText: string;
  link: string;
}

const ServiceCard = ({ image, title, text, icon, linkText, link }: ServiceCardProps) => {
  const imgSrc = image.data?.attributes?.url;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl overflow-hidden bg-primary-switch">
      <Image
        alt={'service-card'}
        className="w-full h-full lg:rounded-l-xl"
        unoptimized
        width={0}
        height={0}
        src={imgSrc ? getImagePath(imgSrc) : EmptyImage}
      />
      <div className="flex flex-col gap-y-5 px-4 pb-4 lg:pl-0 lg:pt-4 xl:p-8">
        <h3 className="text-[24px] leading-[32px] font-normal font-[Lora]">{title}</h3>
        <p className="leading-[28px]">{text}</p>
        <div className="flex flex-col gap-y-4">
          {icon?.map((item, index) => (
            <div key={`icon_item_${index}`} className="flex flex-row gap-2">
              <CheckIconBlue />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
