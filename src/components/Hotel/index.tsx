import iqCheckRequester from '@/clientApi/requester/iqCheckRequester';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import { deepFieldObjStarpi } from '@/util/object';
import { useScrollspy } from '@/util/useScrollspy';
import { useEffect, useMemo, useState } from 'react';
import Gallery from '../global/Gallery/Gallery';
import ScrollToTop from '../global/ScrollTop';
import AboutSection from './partials/AboutSection';
import Banner from './partials/Banner';
import DiningSection from './partials/DiningSection';
import FeatureSection from './partials/FeatureSection';
import HighlightSection from './partials/HighlightSection';
import HistorySection from './partials/History';
import MenuBarSection from './partials/MenuBarSection';
import OurTeamSlider from './partials/OurTeam';
import { ReviewSection } from './partials/ReviewSection';
import RoomSection from './partials/RoomSection';
import ServicesSection from './partials/ServicesSection';
import TitleBarSection from './partials/TitleBarSection';
interface DetailData {
  data: any;
  bundleData: any;
}
const ids = [
  'about',
  'rooms',
  'dining',
  'services',
  'highlights',
  'history',
  'hosts',
  'reviews',
];

export interface FeedbackProps {
  id: string;
  score: number;
  comment: string;
  departure: string;
  showmoreText?: string;
  showlessText?: string;
}
interface ReviewSectionProps {
  total: number;
  overallRating: number;
  reviewCards: FeedbackProps[];
}

const HotelFeature = ({ data, bundleData }: DetailData) => {
  const { attributes } = data;
  const heroBanner = attributes?.hero;
  const property = attributes?.property?.data?.attributes;
  const serviceHeading = attributes?.serviceHeading;
  const services = attributes?.services;
  const about = attributes?.about;
  const historyData = attributes?.history;
  const roomData = attributes?.rooms;
  const roomSection = attributes?.roomSection;
  const activeId = useScrollspy(ids, 400);
  const highlightData = attributes?.highlight;
  const team = attributes?.team;
  const reviewHeading = attributes?.reviewHeading;
  const reviewButton = attributes?.reviewButton;
  const featureSection = attributes?.about?.icons;
  const diningSection = attributes?.dinningSection
  const culinary = attributes?.culinary
  const gallery = attributes?.gallery
  const [aboutSection, setAboutSection] = useState({ ratings: 4 });
  const [reviewSection, setReviewSection] = useState<ReviewSectionProps>({
    overallRating: 0,
    total: 0,
    reviewCards: [],
  });
  const [isFetchingReviews, setIsFetchingReviews] = useState(true);

  const renderMedia = property?.media?.data?.map((media: any, index: number) => {
    return media.attributes?.url;
  });

  const convertRooms = useMemo(() => {
    const specialRoomId = deepFieldObjStarpi(roomSection?.activity)?.activity_id
    if (specialRoomId) {
      return roomData?.map((room: any) => ({
        ...room,
        activityId: specialRoomId,
      }));
    }
    return roomData;
  }, [roomData, roomSection?.activity]);

  useEffect(() => {
    async function fetchReviewsData() {
      const overview = (await iqCheckRequester.fetchOverall(data?.iqCheckId))?.data;
      const feedbacks = (await iqCheckRequester.fetchReviews(data?.iqCheckId))?.data;
      const score = overview?.score || 0;
      const total = overview?.reviews_count || 0;
      setReviewSection({
        overallRating: Math.round(score * 10) / 10,
        reviewCards: feedbacks?.feedbacks || [],
        total,
      });
      if (score) {
        setAboutSection({ ratings: Math.round(score) });
      }
      setIsFetchingReviews(false);
    }
    if (data?.iqCheckId) {
      fetchReviewsData();
    } else {
      setIsFetchingReviews(false);
    }
  }, [data?.iqCheckId]);
  return (
    <div className="bg-secondary-switch">
      <ScrollToTop />
      <Banner
        title={heroBanner?.title}
        subTitle={heroBanner.subtitle}
        media={heroBanner?.media}
        whiteLogo={property?.media?.data && getImagePath(renderMedia[1])}
      />
      <TitleBarSection
        isFetchingReviews={isFetchingReviews}
        name={heroBanner?.title}
        ratings={reviewSection?.overallRating}
        reviews={reviewSection?.total}
        media={property?.media?.data}
      />
      <MenuBarSection
        activeId={activeId}
        menu={attributes?.menu?.link}
        buttonText={attributes?.menu?.buttonText}
        buttonLink={attributes?.menu?.buttonLink}
      />
      <FeatureSection items={featureSection} />
      <AboutSection
        blackLogo={property?.media?.data ? getImagePath(renderMedia[0]) : ''}
        whiteLogo={property?.media?.data ? getImagePath(renderMedia[1]) : ''}
        ratings={aboutSection?.ratings}
        contactInfo={about?.contactInfo}
        name={heroBanner?.title}
        description={about?.text}
      />
      {roomData?.length ? (
        <RoomSection
          sliderCard={convertRooms}
          title={roomSection?.header?.title}
          subtitle={roomSection?.header?.subtitle}
          icon={
            roomSection?.header?.media?.data?.attributes
              ? getImagePath(roomSection?.header.media.data.attributes.url)
              : EmptyImage
          }
        />
      ) : (
        <div className="hidden"></div>
      )}
      {highlightData ? (
        <HighlightSection
          title={highlightData?.title}
          desc={highlightData?.description}
          primaryContent={highlightData?.primary}
          icon={
            highlightData?.icon?.data?.attributes
              ? getImagePath(highlightData?.icon?.data?.attributes?.url)
              : EmptyImage
          }
          highlightSecondaryContent={bundleData}
        />
      ) : (
        <div className="hidden"></div>
      )}

      {diningSection ? (
        <DiningSection
          title={diningSection?.title}
          desc={diningSection?.subtitle}
          sliderCardContent={culinary}
          icon={
            diningSection?.media?.data?.attributes
              ? getImagePath(diningSection?.media?.data?.attributes?.url)
              : EmptyImage
          }
        />
      ) : (
        <div className="hidden"></div>
      )}
      {serviceHeading ? (
        <ServicesSection
          title={serviceHeading?.title}
          icon={
            serviceHeading?.icon?.data?.attributes
              ? getImagePath(serviceHeading?.icon?.data?.attributes?.url)
              : EmptyImage
          }
          services={services?.service}
          text={serviceHeading?.description}
        />
      ) : (
        <div className="hidden"></div>
      )}

      {historyData ? (
        <HistorySection
          title={historyData?.title}
          text={historyData?.text}
          entries={historyData?.entries}
          icon={
            historyData?.icon?.data?.attributes
              ? getImagePath(historyData?.icon?.data?.attributes?.url)
              : EmptyImage
          }
        />
      ) : (
        <div className="hidden"></div>
      )}
      {team ? (
        <OurTeamSlider
          title={team?.title}
          icon={
            team?.icon?.data?.attributes
              ? getImagePath(team?.icon?.data?.attributes?.url)
              : EmptyImage
          }
          memberCards={team?.members?.data}
        />
      ) : (
        <div className="hidden"></div>
      )}
    
      <ReviewSection
        total={reviewSection?.total}
        reviewCards={reviewSection?.reviewCards}
        overallRating={reviewSection?.overallRating}
        title={reviewHeading?.title}
        icon={
          reviewHeading?.icon?.data?.attributes
            ? getImagePath(reviewHeading?.icon?.data?.attributes?.url)
            : EmptyImage
        }
        showmoreText={reviewButton && reviewButton[0]?.title || ""}
        showLessText={reviewButton && reviewButton[1]?.title || ""}
        hotelId={property?.code}
      />
      
      { gallery?.media && gallery?.media?.data?.length > 0 
          ? <Gallery gallery={gallery?.media}/>
          : <div className="hidden"></div>
      }
    </div>
  );
};

export default HotelFeature;
