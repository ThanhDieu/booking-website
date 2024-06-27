// import { SublinkProps } from '@/types';
import { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { clsx } from 'clsx';

interface Prop {
  // sublink: SublinkProps;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setClickedLink: Dispatch<SetStateAction<boolean>>;
}

export const Submenu = ({ setOpen, setClickedLink }: Prop) => {
  const pathname = useRouter().pathname;
  // const { featured, projects } = sublink;
  const getParentPath = pathname?.includes('/') ? pathname : '';

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="p-4 min-w-[285px] basis-[40%]">
        <div className="flex flex-col gap-4">
          {/* {featured?.map((feat) => (
            <Link
              key={feat.link}
              href={feat.href}
              className={clsx(
                'title2 text-neutralSecondary hover:text-primaryMain cursor-pointer',
                getParentPath === feat.href ? 'text-primaryMain' : 'text-neutralPrimary'
              )}
              onClick={() => {
                setOpen(!open);
                setClickedLink(true);
              }}
            >
              {feat.link}
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};
