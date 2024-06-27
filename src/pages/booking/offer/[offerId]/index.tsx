/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '@/components';
import OfferIdInvoice from '@/components/Booking/partials/Invoices/OfferIdInvoice';
import BundleCard from '@/components/ResultItem/partials/BundleCard';
import BookingStep from '@/components/global/BookingStep';
import ScrollToTop from '@/components/global/ScrollTop';
import title from '@/json/title';
import MainLayout from '@/layouts/MainLayout';
import { FilterIcon } from '@/library';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';
import { resetInvoiceSlice } from '@/store/slice/invoceSlice';
import { ELoad } from '@/store/slice/offerSlice';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { NextSheetWidthLayout } from '@/types/layoutType';
import { calculateTotalGuest } from '@/util/bundle';
import { Drawer, Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useIbeTranslation } from '@/hooks';

const OfferPage: NextSheetWidthLayout = () => {
  const offer = useIbeTranslation('offer')
  const dispatch = useAppDispatch();
  const { ref: bottomRef, inView: myElementIsVisible } = useInView();

  const [fixed, setFixed] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { detail, bundles, indicator, booker } = useAppSelector((state) => state.offerSlice);
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { offerId } = router.query;
  const titleCode = booker?.title?.toUpperCase();

  useEffect(() => {
    if (offerId && offerId !== detail?.offerId) {
      dispatch(resetInvoiceSlice())
    }
  }, [offerId])

  useEffect(() => {
    if (detail && bundles) {
      const guest = calculateTotalGuest(bundles?.map((bd) => ({ ...bd, number: (bd?.children?.length + bd?.adults) })))
      const rooms = bundles?.reduce((total: Number, bundle) => Number(total) + Number(bundle?.count || 1), 0)
      dispatch(setSearchValue({
        ...searchValue,
        rooms: rooms || 1,
        arrival: detail?.arrival || searchValue?.arrival,
        departure: detail?.departure || searchValue?.departure,
        adults: guest?.adults || searchValue?.adults,
        children: guest?.children || searchValue?.children,
        propertyId: detail?.property?.extId || searchValue?.propertyId,
        countryCode: detail?.property?.location?.countryCode || searchValue?.countryCode,
      } as SearchValueType))
    }
  }, [detail, bundles])

  // filter mobile
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [open]);
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 0 ? setFixed(true) : setFixed(false)
    );
  }, []);

  return (
    <div>
      <BookingStep activeStep={1} />
      <div className="bg-secondary-switch">
        <Spin spinning={indicator?.detail === ELoad.PENDING}>
          <Wrapper>
            <ScrollToTop />
            {/* filter mobile */}
            <div
              className="xl:hidden fixed left-0 top-36 z-40 bg-primary-switch w-fit p-4 rounded-md flex"
              onClick={() => setOpen(!open)}
            >
              <FilterIcon />
            </div>
            <Drawer title placement={'left'} onClose={onClose} open={open}>
              <OfferIdInvoice />
            </Drawer>

            {/* End filter mobile */}
            <h3 className="font-[Lora] text-[24px] leading-8  mb-4">{`${offer?.greeting} ${titleCode ? title[titleCode as keyof typeof title] : ''
              } ${booker?.firstName || ""} ${booker?.lastName}, ${offer?.specialtext}`}</h3>
            <div className="grid xl:grid-cols-4 gap-6 min-h-[50vh]">
              <div className="col-span-3">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  {bundles?.map((ele: any, index: number) => {
                    return (
                      <div key={index}>
                        <BundleCard
                          key={index}
                          data={ele?.bundle}
                          hideHotel
                          inOffer={ele}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* booking invoice */}
              <div className="col-span-1 pl-6 hidden xl:block">
                <div
                  className={clsx(
                    'transition-all ease-in-out duration-500 w-[258px]',
                    fixed ? 'fixed bottom-0' : '',
                    myElementIsVisible ? '!absolute !bottom-12' : ''
                  )}
                >
                  <OfferIdInvoice />
                </div>
              </div>
            </div>
          </Wrapper>
        </Spin>
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

OfferPage.Layout = MainLayout;

export default OfferPage;
