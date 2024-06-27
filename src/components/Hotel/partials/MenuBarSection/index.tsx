import clsx from 'clsx';
import styles from '../../Hotel.module.scss';
import Link from 'next/link';
import ButtonShare from '@/components/global/ButtonShare';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePlausible } from 'next-plausible';
import { PlausibleEvents } from '@/types/plausible';

const menuItems = {
  items: [
    {
      title: 'About',
      link: '#about',
    },
    {
      title: 'Rooms',
      link: '#rooms',
    },
    {
      title: 'Highlights',
      link: '#highlights',
    },
    {
      title: 'Dining',
      link: '#dining',
    },
    {
      title: 'Services',
      link: '#services',
    },
    {
      title: 'History',
      link: '#history',
    },
    {
      title: 'Your Hosts',
      link: '#hosts',
    },
    {
      title: 'Reviews',
      link: '#reviews',
    },
  ],
};

const { items } = menuItems;
export interface MenuBarSectionProps {
  activeId: string;
  menu?: {
    title: string,
    link: string,
  }[],
  buttonText?: string,
  buttonLink?: string,
}
const MenuBarSection = ({ activeId, menu, buttonText, buttonLink }: MenuBarSectionProps) => {
  const [fixed, setFixed] = useState(false);
  const plausible = usePlausible<PlausibleEvents>();
  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 900 ? setFixed(true) : setFixed(false)
    );
  }, []);
 
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, '');

    const ele = document.getElementById(targetId);
    ele?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    plausible("click", {
      props: {
        id: href
      }
    })
  };

  return (
    <div
      className={clsx(
        'border-none md:border-solid md:border-switch md:border-y-[1px] border-x-0  hidden md:block bg-secondary-switch',
        fixed && 'fixed lg:top-28 top-0 z-20  w-full'
      )}
    >
      <div className="container flex xl:justify-between xl:gap-4 items-center flex-wrap gap-x-[60px] gap md:gap-x-8 py-2">
        {(menu || items)?.map((item: { title: string, link: string }) => (
          <Link
            key={item.link}
            className={clsx(
              styles.menuItem,
              'transition ease-in-out duration-100 text-primary-switch',
              activeId === item.link.substring(1) && styles.activeUrl
            )}
            href={item.link}
            onClick={handleScroll}
          >
            {item.title}
          </Link>
        ))}
        <div className="my-auto mx-auto md:mx-0 lg:mt-2.5 xl:mt-0 md:mt-4">
          <ButtonShare
            className="!leading-5 py-[10px]"
            style={'outline'}
            content={<a className='text-primary-switch' href={buttonLink || ''}>{buttonText || 'Download Brochure'}</a>}
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuBarSection;
