import React from 'react';
import { Wrapper } from '../global/Wrapper';
import FormContent from './partials/FormContent';
import TextContent from './partials/TextContent';

import AboutBanner from '../AboutUs/partial/Banner';
import getImagePath from '@/util/getImagePath';
import { EmptyImage } from '@/constants/imageUrl';
import { ContactKey } from './@types';

type ContactPageProps = {
  data?: any;
  contactKey?: ContactKey[];
};

const ContactPage = ({ data, contactKey }: ContactPageProps) => {
  return (
    <section>
      <div className="h-[500px] overflow-hidden">
        <AboutBanner
          contentStyle="p-4"
          image={
            data && data.cover?.data?.attributes?.url
              ? getImagePath(data?.cover?.data?.attributes?.url)
              : EmptyImage
          }
          title={data && data.title ? data.title : 'Contact'}
          text={data && data.subtitle ? data.subtitle : 'Contact'}
        />
      </div>
      <Wrapper>
        <div className="py-6 grid grid-cols-12 gap-9">
          <TextContent />
          <FormContent contactKey={contactKey} />
        </div>
      </Wrapper>
    </section>
  );
};

export default ContactPage;
