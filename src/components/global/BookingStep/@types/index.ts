export interface BookingStepData {
        step: number;
        stepName: string;
        // path: string;
        slug: string
}

export default interface BookingStepProps {
    className?: string;
    activeStep: number;
};