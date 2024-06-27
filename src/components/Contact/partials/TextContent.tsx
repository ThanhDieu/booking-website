import Headlines from '@/components/global/Headlines';
import { useIbeTranslation } from '@/hooks';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type TextContentProps = {};

const TextContent = ({}: TextContentProps) => {
  const contactPage = useIbeTranslation('contactPage');

  return (
    <div className="pr-12 col-span-12 md:col-span-5">
      <Headlines subtitle={contactPage?.title || 'Get in touch'} className="text-left" />
      <p className="leading-[26px] pt-4">{contactPage?.contentDearGuests}</p>
      <p className="leading-[26px] pt-4">{contactPage?.contentLookForward}</p>
      <h3 className="pt-12 pb-4  font-[Lora] text-xl font-medium leading-[26px]">
        {contactPage?.contactInfo?.title || 'Contact information'}
      </h3>
      <div className="flex flex-col gap-y-2">
        <Link
          className="text-primary-switch hover:text-PrimaryBlue leading-[26px]"
          href={`tel:${contactPage?.contactInfo?.phoneNumber?.replaceAll(' ', '')}`}
        >
          {contactPage?.contactInfo?.phoneNumber}
        </Link>
        <Link
          className="text-primary-switch hover:text-PrimaryBlue leading-[26px]"
          href={`mailto:${contactPage?.contactInfo?.email}`}
        >
          {contactPage?.contactInfo?.email}
        </Link>
        {contactPage?.contactInfo?.openWork?.length
          ? contactPage.contactInfo.openWork.map((item: string, index: number) => (
              <p key={index} className="leading-[26px]">
                {item}
              </p>
            ))
          : ''}
      </div>
    </div>
  );
};

export default TextContent;
