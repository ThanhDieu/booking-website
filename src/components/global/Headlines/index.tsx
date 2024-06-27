import clsx from 'clsx';
import React from 'react';

type HeadlinesProps = { title?: string; subtitle?: string; className?: string };

const Headlines = ({ title, subtitle, className }: HeadlinesProps) => {
  return (
    <div className={clsx(className ? className : 'text-center', `flex flex-col gap-y-[5px] pb-8`)}>
      {title && <h3 className="text-base leading-5 font-normal blue-text-switch">{title}</h3>}
      {subtitle && (
        <p className="text-primary-switch text-4xl leading-[43px] font-normal font-[Lora]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Headlines;
