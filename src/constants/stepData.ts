import { BookingStepData } from "@/components/global/BookingStep/@types";

export enum StepPathType {
  bundleId = 'booking/bundle/',
  offerId = 'booking/offer',
  addons = 'booking/addons',
  information = 'booking/information',
  summary = 'booking/summary',
}

export const stepData = [
  {
    step: 1,
    stepName: 'Choose your room',
    slug: StepPathType.bundleId,
  },
  {
    step: 2,
    stepName: 'Add ons',
    slug: StepPathType.addons,
  },
  {
    step: 3,
    stepName: 'Personal information',
    slug: StepPathType.information,
  },
  {
    step: 4,
    stepName: 'Summary',
    slug: StepPathType.summary,
  },
  {
    step: 5,
    stepName: 'Payment',
    slug: '',
  },
];
