import clsx from 'clsx';
import React from 'react';

type QuoteComponentProps = { content: string; className?: string };

const QuoteComponent = ({ content, className }: QuoteComponentProps) => {
  return (
    <q className="qouteSymbol ">
      <p className={clsx(className && className)}>{content}</p>
    </q>
  );
};

export default QuoteComponent;
