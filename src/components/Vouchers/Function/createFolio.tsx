import { BookerInfoProps } from "@/components/shared/BookerInfoFormItems";
import { BookerAddressProps } from "@/components/shared/BookerAddressFormItems";
import { FinanceService } from '@/service/financeService';

const createFolio = async (bookerInfo: BookerInfoProps, bookerAddress: BookerAddressProps, propertyId: string) => {
  let title = "Other";

  if (bookerInfo.title === "male") {
    title = "Mr";
  }

  if (bookerInfo.title === "female") {
    title = "Mrs";
  }

  const debitor = {
    title,
    firstName: bookerInfo.firstName,
    name: bookerInfo.lastName,
    reference: '',
    type: "PrimaryGuest",
    email: bookerInfo.email,
    address: {
      addressLine1: bookerAddress.street,
      addressLine2: '',
      city: bookerAddress.city,
      postalCode: bookerAddress.postalCode,
      countryCode: bookerAddress.region
    }
  }

  const model = {
    type: "External",
    propertyId,
    debitor
  }

  return await FinanceService.createAFolios({ folio: model })
}

export default createFolio;
