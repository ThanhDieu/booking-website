import AboutSection from '@/components/Hotel/partials/AboutSection';
import Banner from '@/components/Hotel/partials/Banner';
import MenuBarSection from '@/components/Hotel/partials/MenuBarSection';
import RoomSection from '@/components/Hotel/partials/RoomSection';
import TitleBarSection from '@/components/Hotel/partials/TitleBarSection';
import Headlines from '@/components/global/Headlines';
import ScrollToTop from '@/components/global/ScrollTop';
import SmallCardList from '@/components/shared/SmallCardList';
import { EmptyImage } from '@/constants/imageUrl';
import { useAppSelector } from '@/store/hooks';
import getImagePath from '@/util/getImagePath';
import { useScrollspy } from '@/util/useScrollspy';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { TopicPropertyModel } from '../../pages/topic/[slug]/[hotelId]';
import { SlideOption } from '../HomePage/partials/HotelHighlight';
import BundleCard from '../ResultItem/partials/BundleCard';
import { pathPage } from '@/constants';
import styles from './View.module.scss';
import { Wrapper } from '../global/Wrapper';

interface TopicPropertyViewProps {
  model: TopicPropertyModel;
}

const View = (props: TopicPropertyViewProps) => {
  const {
    model: {
      topicData,
      topicPropertyData,
      topicHighlightData,
      topicHostData,
      propertyContact,
      topicPropertyList,
      slug,
      hotelId,
      bundleList,
    },
  } = props;

  const whiteLogo =
    getImagePath(
      topicData[0]?.attributes?.titleIcon?.data[1]?.attributes?.url ||
      topicData[0]?.attributes?.titleIcon?.data[0]?.attributes?.url
    ) || EmptyImage;

  const menuList = topicData[0]?.attributes?.menu.link.map(
    (item: { title: string; link: string }) => item.link
  );
  const activeId = useScrollspy(menuList, 400);

  const hotelCards = topicPropertyList.map((property: any) => ({
    href: `/${pathPage.topic}/${slug}/${property?.data?.attributes?.code}/`,
    imageUrl:
      property?.data?.attributes?.image?.data?.attributes?.formats?.small?.url ||
      property?.data?.attributes?.image?.data?.attributes?.url,
    title: property?.data?.attributes?.name,
  }));

  const propertyInfo = topicPropertyList.find(
    (property: any) => property?.data?.attributes?.code === hotelId
  );

  const renderMedia = propertyInfo?.data?.attributes?.media?.data?.map((media: any) => {
    return media.attributes?.url;
  });

  const { couponTag } = useAppSelector((state) => state.commonSlice);

  return (
    <>
      <div id="hero" className={styles.scrollMarginTop}>
        <Banner
          title={topicData[0]?.attributes?.title}
          subTitle={topicData[0]?.attributes?.subTitle}
          media={topicData[0]?.attributes?.hero?.image}
          whiteLogo={whiteLogo}
          hideButton={true}
          tag={couponTag}
        />
      </div>
      <ScrollToTop />
      <TitleBarSection
        hideReviews={true}
        name={topicPropertyData[0]?.attributes?.title}
        media={topicPropertyData[0]?.attributes?.titleIcon?.data}
      />
      <MenuBarSection
        activeId={activeId}
        menu={topicData[0]?.attributes?.menu.link}
        buttonText={topicData[0]?.attributes?.menu.buttonText}
      />
      {/* hotels list */}
      <div id="hotels" className={styles.scrollMarginTop}>
          <Wrapper className='holiday'>
            <Headlines title={topicData[0]?.attributes?.hotelsSection?.title} />
            <SmallCardList data={{ cards: hotelCards }} />
          </Wrapper>
      </div>

      <div id="about" className={styles.scrollMarginTop}>
        <AboutSection
          blackLogo={propertyInfo?.data?.attributes?.media?.data && getImagePath(renderMedia[0]) || EmptyImage}
          whiteLogo={propertyInfo?.data?.attributes?.media?.data && getImagePath(renderMedia[1]) || EmptyImage}
          ratings={propertyContact?.ratings}
          contactInfo={propertyContact?.contactInfo}
          name={propertyInfo?.data?.attributes?.name}
          description={topicPropertyData[0]?.attributes?.body}
          buttonText="Go to Hotelpage"
          buttonLink={`/hotel/${hotelId}`}
        />
      </div>

      <div id="highlights" className={styles.scrollMarginTop}>
        <RoomSection
          title={topicData[0]?.attributes?.highlightSection?.title || 'Highlight title'}
          subtitle={topicData[0]?.attributes?.highlightSection?.subtitle || 'Highlight subtitle'}
          icon={
            topicData[0]?.attributes?.highlightSection?.media?.data?.attributes?.url || EmptyImage
          }
          sliderCard={topicHighlightData[0]?.attributes?.highlights || []}
        />
      </div>

      {/* Topic host section */}
      {topicHostData[0] && (
        <div id="hosts" className={styles.scrollMarginTop}>
          {topicHostData[0]?.attributes?.hosts?.map((host: any, index: number) => {
            const { title, content, avatar } = host;

            return (
                <Wrapper key={`host_${index}`} className='flex flex-col md:flex-row gap-x-24 gap-y-8 items-center'>
                <div className="basis-2/3">
                  <div className="text-xl mb-8">{title}</div>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
                <div className="basis-1/3 flex flex-col gap-y-2">
                  <Image
                    src={
                      (avatar?.media?.data && avatar?.media?.data[0].attributes.url) || EmptyImage
                    }
                    width={(avatar?.media?.data && avatar?.media?.data[0].attributes.width) || 500}
                    height={
                      (avatar?.media?.data && avatar?.media?.data[0].attributes.height) || 500
                    }
                    alt={
                      (avatar?.media?.data && avatar?.media?.data[0].attributes.alternativeText) ||
                      'avatar'
                    }
                    />
                  <p>{avatar?.profile}</p>
                </div>
                </Wrapper>
            );
          })}
        </div>
      )}

      {/* bundle list */}
      <div id="bundles" className={styles.scrollMarginTop}>
        {bundleList?.length ? (
          <Wrapper>
            <Headlines title={topicData[0]?.attributes?.bundleSection?.title} />
            <div className="rooms holiday">
              <Splide aria-label="holiday slide" {...SlideOption}>
                {bundleList.map((bundle) => (
                  <SplideSlide key={bundle.bundleId} className="cursor-grab">
                    <BundleCard filterActivity={[]} data={bundle} hideHotel />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </Wrapper>
        ) : null}
      </div>
    </>
  );
};

export default View;
