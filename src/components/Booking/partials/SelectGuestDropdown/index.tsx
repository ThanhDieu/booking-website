/* eslint-disable react-hooks/exhaustive-deps */
import { useIbeTranslation } from '@/hooks';
import useDefaultSearch, { STATE_TYPE } from '@/hooks/useDefaultSearch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOpenCalendar, setOpenGuest } from '@/store/slice/commonSlice';
import { GuestRoomsStrapiType } from '@/types/homePage';
import { Popover } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './GuestDropdown.module.scss';
import ChildrenAgeBelow from './GuestTypes/ChildrenAgeBelow';
import GuestTypes from './GuestTypes/GuestTypes';
enum Mode {
  adult = 'adult',
  children = 'children',
  room = 'room',
}

interface SelectGuestDropdownProps {
  onClick?: (value: any) => void;
  defaultGuestData?: {
    room: number;
    adult: number;
    children: number;
    childrenAgeBelow?: number[];
  };
  contentStrappi?: GuestRoomsStrapiType;
  isBookingOffer?: boolean;
}
export const DEFAULT_MAX = 20;
export const DEFAULT_MAX_ROOM = 50;
const SelectGuestDropdown = ({ onClick, contentStrappi, isBookingOffer }: SelectGuestDropdownProps) => {
  const { isOpenGuest } = useAppSelector((state) => state.commonSlice);
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const dispatch = useAppDispatch();
  const [max, setMaxValue] = useState({
    room: DEFAULT_MAX_ROOM,
    adult: DEFAULT_MAX,
  });
  const searchMenu = useIbeTranslation('searchMenu');

  const { stateData: guestValue, handleChange: setGuestValue } = useDefaultSearch(
    undefined,
    STATE_TYPE.Guest,
    {
      room: 1,
      adult: 1,
      children: 0,
      childrenAgeBelow: [],
    }
  );
  useEffect(() => {
    setMaxValue({
      room: searchValue?.maxRooms || DEFAULT_MAX_ROOM,
      adult: searchValue?.maxPersons || DEFAULT_MAX,
    });
  }, [guestValue?.room, searchValue?.maxRooms]);
  useEffect(() => {
    if (guestValue.adult === 0) setGuestValue({ ...guestValue, children: 0 });
  }, [guestValue?.adult]);

  const handleScroll = () => {
    dispatch(setOpenGuest(false));
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleIncrease = (mode: string) => {
    if (mode === Mode.children && guestValue.adult + guestValue.children < max?.adult) {
      setGuestValue({ ...guestValue, children: guestValue.children + 1 });
    } else if (mode === Mode.adult) {
      setGuestValue({ ...guestValue, adult: guestValue.adult + 1 });
    } else if (mode === Mode.room) {
      setGuestValue({ ...guestValue, room: guestValue.room + 1 });
    }
  };

  const handleDescrease = (mode: string, value?: number[] | number) => {
    if (mode === Mode.children) {
      setGuestValue({
        ...guestValue,
        children: guestValue.children - 1,
        childrenAgeBelow: value || [],
      });
    } else if (mode === Mode.adult) {
      setGuestValue({ ...guestValue, adult: guestValue.adult - 1 });
    } else if (mode === Mode.room) {
      setGuestValue({ ...guestValue, room: guestValue.room - 1 });
    }
  };
  /** set age of child */
  const content = (
    <div>
      <div className="guestType w-[272px] flex flex-col gap-y-2">
        <GuestTypes
          guestTitle={contentStrappi?.roomsPlaceholder || searchMenu?.guestAndRoom?.room}
          value={guestValue.room}
          disabledDown={guestValue.room <= 1}
          disabledUp={guestValue.room === max?.room}
          mode={''}
          handleIncrease={() => {
            handleIncrease(Mode.room);
          }}
          handleDescrease={() => {
            const newRooms = guestValue.room > 2 ? guestValue.room : 2;
            handleDescrease(Mode.room, newRooms - 1 > -0 ? newRooms - 1 : 1);
          }}
        />
        <GuestTypes
          guestTitle={contentStrappi?.guestPlaceholder || searchMenu?.guestAndRoom?.adults}
          description={searchMenu?.guestAndRoom?.guestAge}
          value={guestValue.adult}
          disabledUp={
            guestValue.adult === max?.adult || guestValue.adult + guestValue.children === max?.adult
          }
          disabledDown={guestValue.adult <= 1}
          mode={''}
          handleIncrease={() => handleIncrease(Mode.adult)}
          handleDescrease={() => {
            handleDescrease(Mode.adult);
          }}
        />
        <GuestTypes
          guestTitle={contentStrappi?.children || searchMenu?.guestAndRoom?.children}
          description={searchMenu?.guestAndRoom?.chiledrenAge}
          value={guestValue.children}
          disabledUp={
            guestValue.adult + guestValue.children === max?.adult || guestValue.adult === 0
          }
          disabledDown={guestValue.children <= 0}
          mode={''}
          handleIncrease={() => {
            const newArray = guestValue.childrenAgeBelow ? [...guestValue.childrenAgeBelow, 0] : [];
            setGuestValue({ ...guestValue, childrenAgeBelow: newArray });
            handleIncrease(Mode.children);
          }}
          handleDescrease={() => {
            const newArray = guestValue.childrenAgeBelow?.length
              ? [...guestValue.childrenAgeBelow]
              : [];
            newArray.pop();
            setGuestValue({ ...guestValue, childrenAgeBelow: newArray });
            handleDescrease(Mode.children, newArray);
          }}
        />
      </div>
      <div
        className={clsx('opacity-0', {
          'mt-4 opacity-100 transition-all duration-500': guestValue.children > 0,
          'opacity-0 transition-all duration-500': guestValue.children <= 0,
          'h-36 overflow-y-scroll custom-scrollbar': guestValue.children >= 4,
        })}
      >
        {guestValue.children > 0 &&
          Array.from({ length: guestValue.children }, (_, index: number) => {
            return (
              <ChildrenAgeBelow
                contentStrapiPlaceholder={
                  contentStrappi?.childrenPlaceholder || searchMenu?.guestAndRoom?.years
                }
                key={index}
                onClick={(value: number) => {
                  if (guestValue?.childrenAgeBelow && guestValue?.childrenAgeBelow?.length > 0) {
                    const newValue = [...guestValue?.childrenAgeBelow];
                    newValue[index] = value;
                    setGuestValue({ ...guestValue, childrenAgeBelow: newValue });
                  } else if (
                    guestValue?.childrenAgeBelow &&
                    guestValue.childrenAgeBelow?.length === 0
                  ) {
                    setGuestValue({ ...guestValue, childrenAgeBelow: [value] });
                  }
                }}
                title={`${searchMenu?.guestAndRoom?.children} ${index + 1}`}
                defaultValue={guestValue?.childrenAgeBelow[index] || 0}
              />
            );
          })}
      </div>
    </div>
  );

  return (
    <Popover
      open={isOpenGuest}
      placement="bottomLeft"
      content={content}
      trigger="click"
      onOpenChange={() => {
        dispatch(setOpenGuest(false));
        if (isOpenGuest && onClick) onClick(guestValue);
      }}
    >
      <button
        onClick={() => {
          dispatch(setOpenGuest(!isOpenGuest));
          dispatch(setOpenCalendar(false));
        }}
        className={clsx(
          'bg-secondary-switch text-primary-switch h-12 xl:w-[300px] w-[250px] px-4 rounded-md !flex items-center border-none cursor-pointer',
          styles.guestDropdown, !onClick && styles.disableText
        )}
        disabled={!onClick}
      >
        <p className={clsx(styles.textGuest,"flex items-center justify-start gap-2 text-primary-switch")}>
          <span>
            {guestValue.room} {contentStrappi?.roomsPlaceholder || searchMenu?.guestAndRoom?.room},
          </span>
          <span>
            {guestValue.adult + guestValue.children}{' '}
            {isBookingOffer ? searchMenu?.guestAndRoom?.totalGuest : searchMenu?.guestAndRoom?.guest}
          </span>
        </p>
      </button>
    </Popover>
  );
};

export default SelectGuestDropdown;
