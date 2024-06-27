import { Wrapper } from '@/components';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Brand() {
  return (
    <Wrapper className={clsx(`pt-8 flex items-center justify-center`, styles.borderFooter)}>
      <Link href={'/'} className="relative">
        <Image
          src={require('public/images/logos/FooterLogo.png')}
          alt={'logo'}
          className="w-44 h-10"
          unoptimized
        />
      </Link>
    </Wrapper>
  );
}
