import IMG_URL, { EmptyImage } from '@/constants/imageUrl';
import languages from '@/json/languages';

import title from '@/json/title';
import { useAppSelector } from '@/store/hooks';
import getImagePath from '@/util/getImagePath';
import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import styles from '../CreateBooking.module.scss';
interface IProps {
  content?: any;
  logo?: string;
}
const InfoContainer = ({ content, logo }: IProps) => {
  const { booker } = useAppSelector((state) => state.bookingSlice);
  const { detail } = useAppSelector((state) => state.offerSlice);
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { bundlePrice } = useAppSelector((state) => state.invoiceSlice);
  const countryCode = booker?.address?.countryCode?.toUpperCase();
  const titleCode = booker?.title?.toUpperCase();
  return (
    <>
      <div>
        <h3 className="text-xl font-medium mb-2">{content?.stayInfo?.title}</h3>
        <p className="text-base mb-1">
          {searchValue?.arrival
            ? moment(moment.unix(searchValue?.arrival)).format('DD.MM.YYYY')
            : 0}{' '}
          -{' '}
          {searchValue?.departure
            ? moment(moment.unix(searchValue?.departure)).format('DD.MM.YYYY')
            : 0}
        </p>
        <p className="text-base mb-1">
          {searchValue?.departure
            ? moment
                .duration(
                  moment(
                    moment.unix(searchValue?.departure).format('DD.MM.YYYY'),
                    'DD.MM.YYYY'
                  ).diff(
                    moment(
                      moment.unix(searchValue?.arrival || 0).format('DD.MM.YYYY'),
                      'DD.MM.YYYY'
                    )
                  )
                )
                .asDays()
            : 0}{' '}
          {content?.stayInfo?.unit?.night}
        </p>
        <p className="text-base mb-1">
          {searchValue ? searchValue?.adults * searchValue?.rooms : ''}{' '}
          {content?.stayInfo?.unit?.adults},{' '}
          {searchValue ? searchValue?.children * searchValue?.rooms : ''}{' '}
          {content?.stayInfo?.unit?.childrens}
        </p>
      </div>
      <div className="botBorder py-7 !border-SecondaryGrey dark:!border-SecondaryBlack">
        <h3 className="text-xl font-medium mb-2">{`${
          titleCode ? title[titleCode as keyof typeof title] : ''
        } ${booker?.firstName} ${booker?.lastName}`}</h3>
        <p className="text-base mb-1">{booker?.email}</p>
        <p className="text-base mb-1">
          {booker?.address?.addressLine1}, {booker?.address?.city},{' '}
          {countryCode ? languages[countryCode as keyof typeof languages] : ''}.
        </p>
        <p className="text-base mb-1">{booker?.phone}</p>
      </div>
      <div className="py-7">
        <div className="w-fit h-16 mb-3">
          <Image
            src={logo ? getImagePath(logo)  : EmptyImage}
            width={0}
            height={0}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-[Lora] text-xl leading-[26px] font-medium pb-2">
          {detail?.property?.name || bundlePrice?.propertyName}
        </h3>
        <span className="text-base">{detail?.property?.location?.addressLine1 || bundlePrice?.propertyAddress}</span>
        <span className="text-base">{detail?.property?.location?.city || bundlePrice?.propertyCity}, {detail?.property?.country || bundlePrice?.propertyCountry}.
        </span>
      </div>
    </>
  );
};

export default InfoContainer;
