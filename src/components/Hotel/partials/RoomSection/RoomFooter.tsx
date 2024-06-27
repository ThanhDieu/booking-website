import Currency from '@/components/global/CurrencyComponent';
import { defaultParamsSearch } from '@/constants/bundleConst';
import { EmptyImage } from '@/constants/imageUrl';
import { useAppSelector } from '@/store/hooks';
import getImagePath from '@/util/getImagePath';
import { querySearchParams } from '@/util/searchParams';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../Hotel.module.scss';
import { RoomCardType } from './roomCardType';
import { ThemeType } from '@/store/slice/themeSlice';
import ButtonShare from '@/components/global/ButtonShare';
import { pathPage } from '@/constants';
import { deepFieldObjStarpi } from '@/util/object';

const RoomFooter = ({
  name,
  text,
  capacity,
  icons,
  rate,
  rateDescription,
  button,
  activityId,
  unit_group
}: RoomCardType) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const router = useRouter();
  const { searchValue } = useAppSelector((state) => state.bundleSlice);

  const newUnitGroupId = deepFieldObjStarpi(unit_group)?.unit_group_id
  return (
    <div
      className={clsx('flex-col p-4 lg:p-8 bg-primary-switch', newUnitGroupId ? 'cursor-pointer' : '')}
      onClick={() => {
        newUnitGroupId &&
          router.push({
            pathname: `/${pathPage.result}/all`,
            query: querySearchParams({
              ...defaultParamsSearch,
              countryCode: searchValue?.countryCode,
              propertyId: searchValue?.propertyId,
              unitGroupId: newUnitGroupId,
              specialBundle: activityId || undefined,
            }),
          });
      }}
    >
      <div className="min-h-[96px]">
        <div className="flex justify-between">
          <div className="max-w-[440px]">
            <h3 className={clsx(styles.roomTitle, 'font-[Lora] mb-2 overflow-hidden textDesc-1')}>
              {name}
            </h3>
          </div>
          {capacity && (
            <div>
              <span
                className={clsx(styles.roomSize, 'bg-secondary-switch py-1 px-2 rounded-[32px]')}
              >
                {capacity}
              </span>
            </div>
          )}
        </div>
        <p className={clsx('textDesc-2 leading-[22px]')}>{text}</p>
      </div>
      <div className={clsx(styles.topBorder, 'flex justify-between py-3')}>
        <div className="flex basis-1/2">
          <Image
            src={
              (selected === ThemeType.default &&
                icons &&
                icons[0] &&
                getImagePath(icons[0]?.icon?.data?.attributes?.url)) ||
              (selected === ThemeType.dark &&
                icons &&
                icons[0] &&
                getImagePath(icons[0]?.whiteIcon?.data?.attributes?.url)) ||
              EmptyImage
            }
            alt="icon"
            width={25}
            height={25}
          />
          <p className="ml-[24px] textDesc-1 text-sm lg:leading-[18px] h-5">{icons[0]?.text}</p>
        </div>
        <div className="flex basis-1/2">
          <Image
            src={
              (selected === ThemeType.default &&
                icons &&
                icons[1] &&
                getImagePath(icons[1]?.icon?.data?.attributes?.url)) ||
              (selected === ThemeType.dark &&
                icons &&
                icons[1] &&
                getImagePath(icons[1]?.whiteIcon?.data?.attributes?.url)) ||
              EmptyImage
            }
            alt="icon"
            width={25}
            height={25}
          />
          <p className="ml-[24px] textDesc-1 text-sm lg:leading-[18px] h-5">{icons[1]?.text}</p>
        </div>
      </div>
      <div className={clsx(styles.topBorder, 'flex pt-6 justify-between')}>
        <div className={clsx(styles.roomCapacity, 'flex flex-col')}>
          <Image
            src={
              (selected === ThemeType.default &&
                icons &&
                icons[2] &&
                getImagePath(icons[2]?.icon?.data?.attributes?.url)) ||
              (selected === ThemeType.dark &&
                icons &&
                icons[2] &&
                getImagePath(icons[2]?.whiteIcon?.data?.attributes?.url)) ||
              EmptyImage
            }
            alt="icon"
            width={25}
            height={25}
          />
          <p className="mt-1">{icons[2]?.text}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="mr-3">
            <p className="align-middle text-[14px] text-Deactive">{rateDescription} </p>
          </div>
          <div className="text-[24px] font-[400] text-PrimaryBlack">
            <Currency
              fontSize="text-[24px]"
              fontWeight="font-400]"
              // color="text-PrimaryBlack"
              price={rate}
            />
          </div>
          {button?.title && (
            <ButtonShare className="ml-2" size="medium" htmlType="submit" content={button?.title} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomFooter;
