import { useAppSelector } from '@/store/hooks';
import { HomePageProps } from '@/types/homePage';
import ScrollToTop from '../global/ScrollTop';
import HeroBanner from './partials/HeroBanner';
import HolidaySection from './partials/HolidaySection';
import HotelHighlight from './partials/HotelHighlight';

const Home = ({ attributes, activitiesPackage, homeBundles }: HomePageProps) => {
  const { media } = useAppSelector((state) => state.commonSlice);

  return (
    <div className="bg-secondary-switch">
      <HeroBanner tag={attributes?.hero?.tag} title={attributes?.hero?.title} media={media} />
      <ScrollToTop />
      <HolidaySection
        {...attributes?.packages}
        activitiesPackage={activitiesPackage}
        homeBundles={homeBundles}
      />
      <HotelHighlight highlightHotels={attributes?.highlightHotels} />
    </div>
  );
};

export default Home;
