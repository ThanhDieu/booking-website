import { LayoutProps } from '@/types/layoutType';
import clsx from 'clsx';

export const Wrapper = ({ children, className, id }: LayoutProps) => {
  return (
    <section className={clsx(className, `relative container lg:py-12 py-4`)} id={id}>
      {children}
    </section>
  );
};
