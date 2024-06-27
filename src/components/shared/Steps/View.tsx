import clsx from 'clsx';
import { Step, StepsProps } from './index';
import { Wrapper } from '@/components/global/Wrapper';
import { useEffect, useState } from 'react';

interface ViewProps {
  model: StepsProps;
}

const View = (props: ViewProps) => {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 50 ? setFixed(true) : setFixed(false)
    );
  }, []);
  const {
    model: { steps, activeStep },
  } = props;

  return (
    <section
      className={clsx(
        'bg-primary-switch ease-in-out hidden lg:block',
        fixed ? 'xl:fixed w-full z-10 top-0' : ''
      )}
    >
      <div className={clsx('container flex justify-between items-center h-[60px]')}>
        {steps.map((step: Step, index: number) => {
          const stepNumber = Number(step.step);
          return (
            <button
              aria-label={step.title}
              disabled={!step.enabled}
              onClick={() => step.enabled && step.onClick(step.step)}
              key={index}
              className={clsx(
                'flex justify-center gap-4 items-center border-none bg-primary-switch',
                {
                  '!cursor-pointer': step.enabled,
                }
              )}
            >
              <div
                className={clsx(
                  'w-[25px] h-[25px] text-PrimaryBlack bg-LightGrey flex items-center justify-center rounded-full',
                  {
                    '!bg-PrimaryBlue !text-PrimaryWhite': activeStep === stepNumber,
                  }
                )}
              >
                <span className="!text-[16px] !font-[500]">{stepNumber}</span>
              </div>
              <p
                className={clsx('text-[16px] text-primary-switch', {
                  '!text-PrimaryBlue': activeStep === stepNumber,
                })}
              >
                {step.title}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default View;
