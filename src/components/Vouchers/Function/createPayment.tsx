import { FinanceService } from "@/service/financeService";
import { BookerAddressProps } from "@/components/shared/BookerAddressFormItems";

const createPayment = (id: string, amount: { amount: number, currency: string }, bookerAddress: BookerAddressProps,) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  const paymentByLink = {
    amount,
    countryCode: bookerAddress.region,
    description: bookerAddress.note,
    expiresAt: expiresAt.toISOString()
  }

  return FinanceService.paymentByLink({ id, paymentByLink });
}

export default createPayment;
