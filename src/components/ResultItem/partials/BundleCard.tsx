/* eslint-disable react-hooks/exhaustive-deps */
import AvatarCard from '@/components/global/AvatarCard';
import BoxContent from '@/components/global/BoxContent';
import ButtonShare from '@/components/global/ButtonShare';
import CardItem from '@/components/global/CardItem';
import Currency from '@/components/global/CurrencyComponent';
import TagName from '@/components/global/TagName';
import { pathPage } from '@/constants';
import { EmptyImage } from '@/constants/imageUrl';
import { useIbeTranslation } from '@/hooks';
import { InfoIcon } from '@/library';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addBundleId, setSearchValue } from '@/store/slice/bundleSearchSlice';
import { ThemeType } from '@/store/slice/themeSlice';
import getImagePath from '@/util/getImagePath';
import { querySearchParams } from '@/util/searchParams';
import { StarFilled } from '@ant-design/icons';
import { useLocale } from '@m0-0a/next-intl';
import { Typography } from 'antd';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AvatarCardProps, HotelItemProps } from '../@types';
import { SearchValueType } from '@/types/bundle/bundleSearch';

const { Title, Text } = Typography;

const BundleCard = ({ data, onClick, paramsSearch, filterActivity, hideHotel, inOffer }: HotelItemProps) => {
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const accountPage = useIbeTranslation('accountPage');
  const { selected } = useAppSelector((state) => state.themeSlice);

  /** search params valude */
  const arrivalParams = searchParams.get('arrival');
  const departureParams = searchParams.get('departure');

  const router = useRouter();
  const dispatch = useAppDispatch();
  /** booking func set propertyId if it null */
  const handleBookingRoom = () => {
    const dataDispatch = {
      ...paramsSearch,
      propertyId: data?.property.extId,
      periods: data?.periods || [],
    };
    dispatch(addBundleId(data?.bundleId));
    dispatch(setSearchValue(dataDispatch as SearchValueType));
    router.push({
      pathname: `/${pathPage.result}/${data?.bundleId}`,
      query: querySearchParams(
        paramsSearch || {
          countryCode: dataDispatch.countryCode,
          arrival: dataDispatch.arrival,
          departure: dataDispatch.departure,
          rooms: dataDispatch.rooms || 1,
          adults: dataDispatch.adults || 1,
          children: dataDispatch.children || 0,
          childrenAgeBelow: dataDispatch.childrenAgeBelow,
        }
      ),
    });
  };

  const step0 = useIbeTranslation('bookingSteps.step0');

  const activities = useMemo(() => {
    return data?.activities && data.activities?.length
      ? data?.activities
        ?.filter((ele) => filterActivity?.toString() === ele?.activityId)
        ?.slice(0, 3)
      : [];
  }, [filterActivity]);

  const newActivities = useMemo(() => {
    return (
      data?.activities
        ?.filter((ele) => !activities.some((i) => i?.activityId === ele?.activityId))
        ?.slice(0, 3 - activities?.length) || []
    );
  }, [activities]);

  return (
    <>
      {data && (
        <CardItem
          onClick={!inOffer ? handleBookingRoom : undefined}
          image={(data && data?.media?.length ? getImagePath(data?.media[0], 400) : '') }
          // height="628px"
          icon={
            selected === ThemeType.default
              ? data?.landscape?.icons?.dark
                ? getImagePath(data?.landscape?.icons?.light)
                : ''
              : data?.landscape?.icons?.light
                ? getImagePath(data?.landscape?.icons?.dark)
                : ''
          }
          title={
            <div className="flex justify-between pb-4 h-20">
              <p className="text-[20px] leading-[26px] font-medium w-[208px] textDesc-2 pt-2 xl:pt-0 font-[lora] mb-0">
                {data?.extendedData?.title && data?.extendedData?.title?.[locale]
                  ? data?.extendedData?.title?.[locale]
                  : data?.extendedData?.title?.en || data?.name}
              </p>

              {/* {arrivalParams && departureParams ? ( */}
              <div className={clsx('flex flex-col')}>
                {!inOffer && <Text className="text-MidGrey text-xs leading-[18px]">
                  {(!arrivalParams && !departureParams) || data?.price <= 0 ? step0?.from : ''}
                </Text>}
                <TagName
                  className="m-0 !py-[5px]"
                  content={
                    <div className="flex items-center justify-center gap-1 max-h-8">
                      <Currency
                        fontSize="text-base"
                        price={
                          inOffer ? inOffer?.initialPrice
                            : (arrivalParams && departureParams && data?.price > 0
                              ? data?.price
                              : data?.priceMin)
                        }
                        leading="leading-[20px]"
                      />
                    </div>
                  }
                />
                <Text className="text-MidGrey text-xs leading-[18px]">{step0?.perPerson}</Text>
              </div>
            </div>
          }
          content={
            <>
              <div className="h-[172px]">
                {activities && activities?.length
                  ? activities?.map((ele, index: number, records) => {
                    return (
                      <BoxContent
                        style="line"
                        label={ele?.extendedData?.title?.[locale] || ele?.name}
                        icon={
                          (selected === ThemeType.default ? ele?.dark : ele?.light) || ele?.icon
                        }
                        key={index}
                        height="auto"
                        labelStyle="text-[16px] textDesc-1 max-w-[280px]"
                        className={clsx(
                          '!px-0 !py-4 flex-row-reverse !justify-end gap-2 !mt-0 ',
                          {
                            '!border-b': records.length - 1 === index && !newActivities?.length,
                          }
                        )}
                      />
                    );
                  })
                  : ''}
                {newActivities &&
                  newActivities?.length &&
                  (!activities || (activities && activities?.length < 3))
                  ? newActivities?.map((ele, index: number, records) => {
                    return (
                      <BoxContent
                        style="line"
                        label={ele?.extendedData?.title?.[locale] || ele?.name}
                        icon={
                          (selected === ThemeType.default ? ele?.dark : ele?.light) || ele?.icon
                        }
                        key={index}
                        height="auto"
                        labelStyle="text-[16px] textDesc-1 max-w-[280px]"
                        className={clsx('!px-0 !py-4 flex-row-reverse !justify-end gap-2 !mt-0', {
                          '!border-b': records.length - 1 === index,
                        })}
                      />
                    );
                  })
                  : ''}
              </div>
              {inOffer ? <AvatarCardComponent {...{ inOffer, locale, accountPage }} /> : ''}
              {!hideHotel && (
                <AvatarCard
                  penalClass="pt-6 !justify-between"
                  style="horizontal"
                  src={data?.property?.media ? getImagePath(data?.property?.media[0]) : EmptyImage}
                  propertyId={data?.property?.extId}
                  size={44}
                  content={
                    <>
                      <p className="w-[161px] flex-wrap textDesc-1">{data?.property?.name}</p>
                      <StarFilled className="text-PrimaryBlue" />
                      <StarFilled className="text-PrimaryBlue" />
                      <StarFilled className="text-PrimaryBlue" />
                      <StarFilled className="text-PrimaryBlue" />
                    </>
                  }
                  button={
                    <div className="sm:block hidden">
                      <ButtonShare
                        onClick={handleBookingRoom}
                        content={step0?.buttonText?.details}
                        size="small"
                        style="outline"
                        className="!font-[500] w-fit !px-2"
                      />
                    </div>
                  }
                />
              )}

              {(hideHotel && !inOffer) && (
                <ButtonShare
                  onClick={handleBookingRoom}
                  content={step0?.buttonText?.details}
                  size="small"
                  style="outline"
                  className="!font-[500] mt-8 w-fit px-4 mx-auto"
                />
              )}
            </>
          }
        />
      )}
    </>
  );
};

const AvatarCardComponent = ({ inOffer, locale, accountPage }: AvatarCardProps) => {
  return <AvatarCard
    classImage='!rounded-[4px]'
    penalClass="pt-6 !justify-between"
    style="horizontal"
    src={inOffer?.unitGroup?.media ? getImagePath(inOffer?.unitGroup?.media[0]) : EmptyImage}
    size={44}
    content={
      <>
        <p className="w-[161px] flex-wrap textDesc-1">{inOffer?.unitGroup?.extendedData?.name?.[locale]
          ? inOffer?.unitGroup?.extendedData?.name?.[locale]
          : inOffer?.unitGroup?.extendedData?.name?.en ??
          inOffer?.unitGroup?.name}</p>
        <div className="flex flex-row justify-start gap-2">
          <InfoIcon />
          <Text className="!mb-0">
            {inOffer?.adults || 1}{' '}{accountPage?.yourBookingPage?.bookingHistory?.adults},{' '}
            {inOffer?.children?.length || 0}{' '}{accountPage?.yourBookingPage?.bookingHistory?.childs}
          </Text>
        </div>
      </>
    }
    button={
      <div className="sm:block hidden">
        {inOffer?.unitGroup?.size && <div className="rounded-[500px] bg-secondary-switch px-4 py-1">
          {`${inOffer.unitGroup.size}sqm`}
        </div>}
      </div>
    }
  />
}

export default BundleCard;
