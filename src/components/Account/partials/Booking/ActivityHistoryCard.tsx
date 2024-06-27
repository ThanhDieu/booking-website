import ButtonShare, { ButtonStyle } from '@/components/global/ButtonShare';
import { pathPage } from '@/constants';
import { defaultParamsSearch } from '@/constants/bundleConst';
import { EmptyImage } from '@/constants/imageUrl';
import { useIbeTranslation } from '@/hooks';
import { BedIcon, LocationIcon } from '@/library';
import { timeInPeriodsDefault } from '@/util/bundle';
import getImagePath from '@/util/getImagePath';
import { querySearchParams } from '@/util/searchParams';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './../../Account.module.scss';

type ActivityHistoryCardProps = {
  activityInfomation?: any;
};
const ActivityHistoryCard = ({ activityInfomation }: ActivityHistoryCardProps) => {
  const router = useRouter();

  const handleBundleDetail = () => {
    const defaultTime = timeInPeriodsDefault(
      activityInfomation?.bundle?.periods,
      activityInfomation?.bundle?.minimumStay || 1,
    );
    router.push({
      pathname: `/${pathPage.result}/${activityInfomation?.bundle?.bundleId}`,
      query: querySearchParams({
        ...defaultParamsSearch,
        propertyId: activityInfomation?.property?.id || '',
        countryCode: activityInfomation?.property?.countryCode || '',
        adults: activityInfomation?.adults || 1,
        arrival: defaultTime?.start || undefined,
        departure: defaultTime?.end || undefined,
      }),
    });
  }

  const accountPage = useIbeTranslation('accountPage');
  return (
    <div className="grid grid-cols-12 gap-4 p-4 bg-secondary-switch rounded-2xl relative">
      <div className="col-span-12 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          <LocationIcon />
          <span className="text-[12px] text-primary-switch font-normal">
            {activityInfomation?.property?.name}
          </span>
        </div>
        {!activityInfomation?.property?.disabled && <ButtonShare
          onClick={() => router.push(`/hotel${activityInfomation?.property?.extId}`)}
          size="small"
          className="font-medium text-[10px]"
          content={accountPage?.yourBookingPage?.bookingHistory?.hotelButton}
        />}
      </div>
      {/* image */}
      <div className="lg:col-span-3 md:col-span-4 col-span-6 relative h-28 overflow-hidden">
        {/* image return form BE is a list of string WARNING! */}
        <Image
          src={
            activityInfomation?.bundle?.media?.length > 0
              ? getImagePath(activityInfomation?.bundle?.media[0])
              : EmptyImage
          }
          className="w-full h-full rounded-md"
          alt={activityInfomation?.bundle?.name}
          width={0}
          height={0}
        />
      </div>
      {/* content */}
      <div className="lg:col-span-6 col-span-10 flex flex-col gap-y-2">
        {/* information */}
        <p className={styles?.baseText}>{activityInfomation?.bundle?.name}</p>
        {/* unit group */}
        <div className="flex flex-row gap-1 pb-4">
          <BedIcon className="w-4 h-4" />
          <p className={styles?.textExSmall}>{activityInfomation?.bundleUpgrade?.name}</p>
        </div>
        {/* time booking */}
        <div className="flex flex-row flex-wrap gap-8 justify-start align-top">
          <div className="flex flex-col gap-y-1">
            <span className="text-[10px] leading-3">
              {accountPage?.yourBookingPage?.bookingHistory?.duration}
            </span>
            <p className={styles.textExSmall}>
              {moment.unix(activityInfomation?.arrival).format('DD.MM.YYYY')} -{' '}
              {moment.unix(activityInfomation?.departure).format('DD.MM.YYYY')}
            </p>
          </div>
          {/* guest */}
          <div className="flex gap-8 justify-start align-top">
            <div className="flex flex-col gap-y-1">
              <span className="text-[10px] leading-3">
                {accountPage?.yourBookingPage?.bookingHistory?.guest}
              </span>
              <p className={styles.textExSmall}>
                {activityInfomation.adults}{' '}{accountPage?.yourBookingPage?.bookingHistory?.adults},{' '}
                {activityInfomation?.childs}{' '}{accountPage?.yourBookingPage?.bookingHistory?.childs}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* action */}
      <div className="lg:col-span-3 col-span-6 text-right flex flex-col items-stretch justify-around">
        <div className="flex flex-col gap-y-1">
          {/* <h3 className={styles.bundleTitle}>EUR 510.00</h3> */}
        </div>
        {!activityInfomation?.property?.disabled && <div>
          <div className="flex lg:justify-end justify-start gap-4">
            <ButtonShare
              onClick={handleBundleDetail}
              size="small"
              style={ButtonStyle.DARK}
              content={accountPage?.yourBookingPage?.bookingHistory?.bookButton}
            />
          </div>
        </div>}
      </div>
    </div>
  );
};
export default ActivityHistoryCard;
