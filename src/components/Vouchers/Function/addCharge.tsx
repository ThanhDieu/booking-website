import { FolioActionsService } from "@/service/financeService";

const addCharge = async (folioId: string, amount: { amount: number, currency: string }) => {

  const addCharge = {
    amount,
    name: "voucher",
    quantity: 1,
    serviceType: "Other",
    vatType: "Null"
  }
  
  return FolioActionsService.addCharge({ folioId, addCharge });
}

export default addCharge;
