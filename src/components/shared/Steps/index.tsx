import View from "./View"

export interface Step {
  step: number;
  title: string;
  onClick: (step: number) => void;
  enabled: boolean;
}

export interface StepsProps {
  steps: Step[];
  activeStep: number;
}

const Steps = (props: { data: StepsProps }) => {
  const model = props.data || { steps: [] };

  return <View model={model} />
}

export default Steps;
