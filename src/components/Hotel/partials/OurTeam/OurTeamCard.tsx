import AvatarCard from '@/components/global/AvatarCard';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface OurTeamCardProps {
  id?: number;
  attributes: {
    image: { data: { attributes: { url: string } } };
    fullname: string;
    position: string;
    email: string;
  };
}

const OurTeamCard = ({ id, attributes }: OurTeamCardProps) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap bg-primary-switch rounded-lg p-4 gap-6 w-full items-center overflow-hidden">
      <Image
        className="rounded-[50%] w-[100px] h-[100px] object-cover"
        src={
          attributes?.image?.data?.attributes?.url
            ? getImagePath(attributes?.image?.data?.attributes?.url)
            : EmptyImage
        }
        width={0}
        height={0}
        alt=""
      />
      <div className="w-fit">
        <p className="font-[Lora] text-[20px] leading-6 pb-2 w-fit">{attributes?.fullname}</p>
        <p className="text-MidGrey w-fit">{attributes?.position}</p>
        <Link
          className="text-PrimaryBlue hover:text-MidGrey w-fit"
          href={'mailto:' + attributes?.email}
        >
          {attributes?.email}
        </Link>
      </div>
    </div>
  );
};

export default OurTeamCard;
