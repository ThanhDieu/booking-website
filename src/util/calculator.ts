import modeService from '@/constants/modeService';
import { ServiceAddonsType } from '@/types/invoceSliceType/invoceSliceType';
import moment from 'moment';

class Calculator {
  /** calculate total of date */
  calcDate = (arrival: number, departure: number) => {
    const count = moment
      .duration(
        moment(moment.unix(departure).format('DD.MM.YYYY'), 'DD.MM.YYYY').diff(
          moment(moment.unix(arrival).format('DD.MM.YYYY'), 'DD.MM.YYYY')
        )
      )
      .asDays();
    return Number(count);
  };

  /** calculate price added included service and clc with quantity rooms and total date and service add ons */
  calcTotalPrice = (
    bundlePrice = 0,
    rooms = 1,
    arrival?: number,
    departure?: number,
    addonsServcie?: ServiceAddonsType[],
    voucher?: number[],
  ) => {
    let totalDate = (arrival && departure && this.calcDate(arrival, departure)) || 0;
    if (!addonsServcie && totalDate) {
      let latestTotal = 0;

      // Create a price map for each room
      const roomPrices = Array.from({ length: rooms }, () => bundlePrice * totalDate);

      // if (Array.isArray(voucher) && voucher.length) {
      //   voucher.forEach((voucherValue, index) => {
      //     const roomIndex = index % rooms;
      //     if (voucherValue <= roomPrices[roomIndex]) {
      //       roomPrices[roomIndex] -= voucherValue;
      //     } else {
      //       roomPrices[roomIndex] = 0;
      //     }
      //   });
      // }
      latestTotal = roomPrices.reduce((acc, price) => (acc += price), 0);
      const vouchersValue = voucher && voucher.reduce((total, voucher) => total + voucher, 0) || 0;

      return (latestTotal - vouchersValue) > 0 ? (latestTotal - vouchersValue) : 0;
    } else if (addonsServcie) {
      const price = Array.from({ length: totalDate }, (_, index) => {
        let priceInADay = bundlePrice;
        addonsServcie.forEach((ele: ServiceAddonsType) => {
          if (ele.mode === modeService.ARRIVAL) {
            if (index === 0) {
              priceInADay += ele.price * ele.count;
              return;
            }
          } else if (ele.mode === modeService.DEPARTURE) {
            if (index === totalDate - 1) {
              priceInADay += ele.price * ele.count;
              return;
            }
          } else if (ele.mode === modeService.DAILY) {
            priceInADay += ele.price * ele.count;
            return;
          }
        });
        return priceInADay;
      });
      /** intialize return total */
      let latestTotal = 0;

      // Create a price map for each room
      const roomPrices = Array.from({ length: rooms }, () =>
        price.reduce((tt, item) => (tt += item), 0)
      );

      // if (Array.isArray(voucher) && voucher.length) {
      //   /** loop over voucher and decrement price with voucher*/
      //   voucher.forEach((voucherValue, index) => {
      //     const roomIndex = index % rooms;
      //     if (voucherValue <= roomPrices[roomIndex]) {
      //       roomPrices[roomIndex] -= voucherValue;
      //     } else {
      //       roomPrices[roomIndex] = 0;
      //     }
      //   });
      // }

      /** sum of rooms price */
      latestTotal = roomPrices.reduce((acc, price) => (acc += price), 0);
      const vouchersValue = voucher && voucher.reduce((total, voucher) => total + voucher, 0) || 0;

      return (latestTotal - vouchersValue) > 0 ? (latestTotal - vouchersValue) : 0;
    } else {
      /** intialize return total */
      let latestTotal = 0;

      // Create a price map for each room
      const roomPrices = Array.from({ length: rooms }, () => bundlePrice, 0);

      // if (Array.isArray(voucher) && voucher.length) {
      //   /** loop over voucher and decrement price with voucher*/
      //   voucher.forEach((voucherValue, index) => {
      //     const roomIndex = index % rooms;
      //     if (voucherValue <= roomPrices[roomIndex]) {
      //       roomPrices[roomIndex] -= voucherValue;
      //     } else {
      //       roomPrices[roomIndex] = 0;
      //     }
      //   });
      // }
      /** sum of rooms price */
      latestTotal = roomPrices.reduce((acc, price) => (acc += price), 0);
      const vouchersValue = voucher && voucher.reduce((total, voucher) => total + voucher, 0) || 0;

      return (latestTotal - vouchersValue) > 0 ? (latestTotal - vouchersValue) : 0;
    }
  };

  /** calculate price of budle with included service return final price */
  /** add voucher */
  calcPriceOfBundle = (
    bundlePrice = 0,
    arrival: number,
    departure: number,
    baseService: ServiceAddonsType[],
  ) => {
    const totalDate = this.calcDate(arrival, departure) || 0;
    let price = Array.from({ length: totalDate }, (_, index) => {
      let priceInADay = bundlePrice;
      baseService?.forEach((ele) => {
        if (ele.mode === modeService.ARRIVAL) {
          if (index === 0) {
            priceInADay += ele.price;
            return;
          }
        } else if (ele.mode === modeService.DEPARTURE) {
          if (index === totalDate - 1) {
            priceInADay += ele.price;
            return;
          }
        } else if (ele.mode === modeService.DAILY) {
          priceInADay += ele.price;
          return;
        }
      });
      return priceInADay;
    });

    return price.length > 0 ? price?.reduce((tt, item) => (tt += item)) / totalDate : price[0];
  };

  calcAddonsPrice = (
    arrival: number,
    departure: number,
    addons: ServiceAddonsType[],
  ) => {
    const totalDate = this.calcDate(arrival, departure) || 0;
    let totalAddonsPrice: number;
    let addonsPrice = Array.from({ length: totalDate }, (_, index) => {
      totalAddonsPrice = 0;
      addons.forEach((ele) => {
        if (ele.mode === modeService.ARRIVAL) {
          if (index === 0) {
            totalAddonsPrice += ele.price * ele.count;
            return;
          }
        } else if (ele.mode === modeService.DEPARTURE) {
          if (index === totalDate - 1) {
            totalAddonsPrice += ele.price * ele.count;
            return;
          }
        } else if (ele.mode === modeService.DAILY) {
          totalAddonsPrice += ele.price * ele.count;
          return;
        }
      });
      return totalAddonsPrice;
    });
    return addonsPrice.reduce((total: number, addonPrice: number) => total + addonPrice);
  }
}

const calculator = new Calculator();
export default calculator;
