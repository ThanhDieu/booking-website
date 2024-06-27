/* eslint-disable react-hooks/exhaustive-deps */
import FilterBox from '@/components/global/FilterBox';
import { SelectType } from '@/components/global/FilterBox/@types';
import PriceRange from '@/components/global/PriceRange';
import { RangeType } from '@/components/global/PriceRange/@types';
import { useIbeTranslation } from '@/hooks';
import useFetchActivities from '@/hooks/useFetchActivities';
import useFetchLandscape from '@/hooks/useFetchLandscape';
import useFetchSpecialOffer from '@/hooks/useFetchSpecialOffer';
import { useAppDispatch } from '@/store/hooks';
import { resetAppFilter, setAppFilter } from '@/store/slice/commonSlice';
import { setBundleLoading } from '@/store/slice/statusSlice';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { BundleType } from '@/types/bundle/bundleType';
import { SetStateAction, useEffect } from 'react';

interface FilterProps {
  dataList: BundleType[];
  drawer?: {
    open: boolean;
    setOpen: (value: boolean) => void;
  };
  price: {
    maxPrice: number;
    setMaxPrice: (value: SetStateAction<number>) => void;
    setNewFilterItems: (value: SetStateAction<BundleType[]>) => void;
  };
  search: {
    handleChangeLocation: (value: SearchValueType, isRefreshLink?: boolean) => void;
    searchData: SearchValueType;
  };
}

const filterDataTypes = ['activities', 'landscape', 'specialBundle'];

const FilterBar: React.FC<FilterProps> = ({
  drawer,
  dataList: items,
  price,
  search: { searchData, handleChangeLocation },
}) => {
  const filterName = useIbeTranslation('resultPage.filterName');
  const dispatch = useAppDispatch();

  const { dataActivities } = useFetchActivities();
  const { dataLandScape } = useFetchLandscape();
  const { dataSpecialOffer } = useFetchSpecialOffer();

  // FUNCTIONAL
  const handleChangePrice = (value: RangeType) => {
    if (items?.length) {
      const res = items?.filter(
        (ele: BundleType) => ele.price && ele.price <= value.max && ele.price >= value.min
      );
      price?.setNewFilterItems(res);
    }
  };

  const maxValuePrice = () => {
    if (items?.length > 0) {
      const priceMax = items.map((ele) => ele.price);
      const max = priceMax.sort((a, b) => {
        if (a > b) {
          return -1;
        } else {
          return 1;
        }
      });
      if (max) {
        price?.setMaxPrice(max[0] + 1);
      }
    }
  };

  const handleChooseFilter = async (value: string | string[], type: string) => {
    dispatch(setBundleLoading(true));
    const removeField = filterDataTypes.filter((item) => item !== type);
    const filteredSearch = { ...searchData };
    filterDataTypes.forEach((field) => {
      if (filteredSearch.hasOwnProperty(field)) {
        filteredSearch[field as keyof typeof filteredSearch] = '';
      }
    });
    await dispatch(resetAppFilter(removeField));
    dispatch(setAppFilter({ [type]: value }));
    handleChangeLocation({ ...filteredSearch, [type]: value }, true);
  };

  /** effect filter price value **/
  useEffect(() => {
    maxValuePrice();
  }, [items]);

  return (
    <>
      {items && items?.length ? (
        <PriceRange
          title={filterName?.priceRange}
          onChange={(value) => {
            handleChangePrice(value);
          }}
          value={{ min: 0, max: price?.maxPrice }}
        />
      ) : (
        ''
      )}
      <FilterBox
        selectType={SelectType.single}
        onClick={(value: string) => {
          handleChooseFilter(value, filterDataTypes[1]);
          drawer?.setOpen(!open);
        }}
        title={filterName?.landscape || 'Landscape'}
        data={dataLandScape}
        defaultVal={[searchData?.landscape || '']}
      />
      <FilterBox
        selectType={SelectType.single}
        onClick={(value: string[]) => {
          handleChooseFilter(value, filterDataTypes[0]);
          drawer?.setOpen(!open);
        }}
        title={filterName?.activities || 'Activities'}
        data={dataActivities}
        defaultVal={searchData?.activities || []}
      />

      <FilterBox
        selectType={SelectType.single}
        onClick={(value: string[]) => {
          handleChooseFilter(value, filterDataTypes[2]);
          drawer?.setOpen(!open);
        }}
        title={filterName?.specialOffer || 'Special Offer'}
        data={dataSpecialOffer}
        defaultVal={[searchData?.specialBundle || '']}
      />
    </>
  );
};

export default FilterBar;
