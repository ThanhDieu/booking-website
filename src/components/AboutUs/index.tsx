import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import Image from 'next/image';
import React from 'react';
import ContentWithNumberCard, { ContentWithNumberCardProps } from '../global/ContentWithNumberCard';
import Headlines from '../global/Headlines';
import QuoteComponent from '../global/QuoteComponent';
import ScrollToTop from '../global/ScrollTop';
import { Wrapper } from '../global/Wrapper';
import ZicZacComponent, { ZicZacComponentProps } from '../global/ZicZacComponent';
import AboutBanner from './partial/Banner';
import SEOComponent from '../global/SEO';

type AboutPageProps = { attributes: any };

const AboutPage = ({ attributes }: AboutPageProps) => {
  const { ourVision, hero, ourCorporate, ourValues, sectionBanner, ziczacComponent } = attributes;

  return (<>
    <SEOComponent data={{seo: attributes.seo}} />
      
    <div className="bg-secondary-switch">
      <ScrollToTop />
      <AboutBanner
        contentStyle=" p-4"
        image={
          hero?.image?.data?.attributes?.url
            ? getImagePath(hero?.image?.data?.attributes?.url)
            : EmptyImage
        }
        title={hero ? hero?.title : ''}
        text={hero ? hero?.subtitle : ''}
      />
      <div className="pt-12 text-primary-switch">
        {ziczacComponent?.map((item: ZicZacComponentProps, index: number) => (
          <div key={index}>
            <ZicZacComponent
              isTextFirst={item?.isTextFirst}
              image={item?.image || ''}
              title={item?.title}
              text1={item?.text1}
              text2={item?.text2}
            />
          </div>
        ))}
      </div>
      <section className="pt-12">
        <Wrapper>
          <div className="bg-primary-switch rounded-2xl py-12 px-4 md:px-24 xl:px-56 " id="vision">
            <Headlines
              title={ourVision ? ourVision?.title : ''}
              subtitle={ourVision ? ourVision?.subtitle : ''}
            />
            <QuoteComponent
              className="text-center font-[Lora] text-2xl "
              content={ourVision ? ourVision?.text1 : ''}
            />
          </div>
        </Wrapper>
      </section>
      <section className="container pt-12 " id="values">
        <Headlines
          title={ourValues ? ourValues?.title : ''}
          subtitle={ourValues ? ourValues?.subtitle : ''}
        />
        <p className="text-center md:text-left">{ourValues ? ourValues.text1 : ''}</p>
        <p className="pt-4 text-center md:text-left">{ourValues ? ourValues?.text2 : ''}</p>
      </section>
      <Image
        className="pt-12 w-full h-[350px] md:h-[576px] object-cover"
        src={
          sectionBanner?.data?.attributes?.url
            ? getImagePath(sectionBanner?.data?.attributes?.url)
            : EmptyImage
        }
        alt="section banner"
        width={0}
        height={0}
      />
      <Wrapper id="corporate">
        <div className="md:grid md:grid-cols-3 gap-6 py-6">
          <Headlines subtitle={ourCorporate ? ourCorporate?.title : ''} className="pr-12 " />
          {ourCorporate &&
            ourCorporate.content?.map((item: ContentWithNumberCardProps) => (
              <ContentWithNumberCard
                key={item.cardTitle}
                cardTitle={item.cardTitle}
                cardSubtitle={item.cardSubtitle}
                cardContent={item.cardContent}
              />
            ))}
        </div>
      </Wrapper>
    </div>
  </>
  );
};

export default AboutPage;
