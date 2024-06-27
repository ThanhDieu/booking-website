import { ServiceAddonsType } from "@/types/invoceSliceType/invoceSliceType";

export const addItems = (array: any[], service: ServiceAddonsType) => {
  
  const serviceIndex = array?.findIndex(
    (bs) => bs?.serviceId && bs.serviceId === service?.serviceId
  );
  if (serviceIndex > -1) {
    array[serviceIndex].count += service?.count || 1;
  } else {
    array.push({ ...service, count: service?.count || 1 });
  }
  return array;
};
