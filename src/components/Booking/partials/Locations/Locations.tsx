/* eslint-disable react-hooks/exhaustive-deps */
import { useDefaultSearch, useIbeTranslation } from '@/hooks';
import { useLocation } from '@/hooks/useLocation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOpenCalendar, setOpenLocation } from '@/store/slice/commonSlice';
import { SearchOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from '@m0-0a/next-intl';
import { pathsBooking } from '@/constants';

export interface LocationProps {
  onClick?: (value: any) => void;
}

export interface LocationRenderChildrenType {
  title: string;
  value: string;
}
export interface LocationRenderType {
  value: string;
  title: string;
  children: LocationRenderChildrenType[];
}

export interface LocationPayloadType {
  countryCode: string;
  countryName: string;
  properties: {
    city: string;
    media: string;
    name: string;
    propertyId: string;
  }[];
}

const Locations = ({ onClick }: LocationProps) => {
  const { isOpenLocation, isOpenCalendar } = useAppSelector((state) => state.commonSlice);
  const dispatch = useAppDispatch();
  const [locationData, setLocationData] = useState<LocationRenderType[]>([]);
  const { data } = useLocation();
  const { stateData: defaultValue, handleChange: setDefaultValue } = useDefaultSearch([
    locationData,
  ]);
  const router = useRouter();
  const searchMenu = useIbeTranslation('searchMenu');
  const { t } = useTranslation();

  const handleClick = (value: string) => {
    if (value && value.includes('@')) {
      return {
        countryCode: value.split('@')[0],
        propertyId: '',
      };
    } else {
      return {
        countryCode: value && value.split('$')[1],
        propertyId: value && value.split('#')[0],
      };
    }
  };

  const locationDataRender = locationData?.map((location: LocationRenderType, index) => {
    const title = (
      <span className="font-[Inter] text-primary-switch font-medium">
        {t(`country${index + 1}_title`)}
      </span>
    );
    const value = location.value;
    const children = location.children.map((child: LocationRenderChildrenType) => {
      const title = `${child.title}`;
      const value = child.value;
      return { value, title };
    });

    return { title, value, children };
  });

  const handleChoose = (value: string) => {
    onClick && onClick(handleClick(value));
    dispatch(setOpenLocation(!isOpenLocation));
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      dispatch(setOpenLocation(false));
    });
    return () => {
      window.removeEventListener('scroll', () => {
        dispatch(setOpenLocation(false));
      });
    };
  }, []);

  useEffect(() => {
    const res = data?.data?.data?.map((location: LocationPayloadType) => {
      const title = location.countryName;
      const value = `${location.countryCode}@${location.countryName}`;
      const children = location.properties?.map((child: any) => {
        const title = child.name;
        const value = `${child.propertyId}#${child.name}$${location.countryCode}`;
        return { value, title };
      });

      return { title, value, children };
    });

    return setLocationData(res);
  }, [data]);

  return (
    <TreeSelect
      allowClear={true}
      open={isOpenLocation}
      onDropdownVisibleChange={() => {
        if (isOpenCalendar) {
          dispatch(setOpenCalendar(false));
          dispatch(setOpenLocation(true));
        } else {
          dispatch(setOpenLocation(!isOpenLocation));
        }
      }}
      onBlur={(event) => {
        dispatch(setOpenLocation(event.target === document.activeElement));
      }}
      showSearch
      bordered={false}
      suffixIcon={<SearchOutlined />}
      className="mySelectIBE xl:w-[390px] w-[300px] h-12 focus-visible:out"
      treeDefaultExpandAll
      placeholder={searchMenu?.location?.placeholder}
      treeData={locationDataRender}
      onChange={(value: any) => {
        handleChoose(value);
        setDefaultValue(value);
      }}
      value={defaultValue}
      disabled={!onClick}
    />
  );
};

export default Locations;
