import { pathPage } from '@/constants';
import { MenuDropDownIcon } from '@/library';
import { Divider } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { TTopicMenu } from '.';
import styles from './Header.module.scss';
import { usePlausible } from 'next-plausible';
import { PlausibleEvents } from '@/types/plausible';

export interface MenuProps {
  title: string;
  link: string;
}
interface Props {
  menu: MenuProps[];
  topic?: TTopicMenu[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// check topic page
const IS_TOPIC = `/${pathPage.topic}`;

export default function NavLinks({ menu, topic, setOpen }: Props) {
  const router = useRouter();
  const plausible = usePlausible<PlausibleEvents>();
  const isHomePage = router.asPath === '/' || /^(\/#(?!contact\/#|account\/#|booking-history\/#))/i?.test(router.asPath);
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    if (href?.includes('#')) {
      const targetId = href.replace(/.*\#/, '');
      const ele = document.getElementById(targetId);
      ele?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
    if (isHomePage === false) {
      router.push(href);
    }
    plausible("click", {
      props: {
        id: href
      }
    })
  };
  const handleNavigate = (slug: string) => {
    router.push(slug);
  };

  return (
    <>
      {menu?.map((menu, index) => {
        return (
          <li
            onClick={()=>menu && menu?.link !== IS_TOPIC && setOpen(false)}
            key={`${index}${menu?.link}`}
            className={clsx('h-full flex items-center  cursor-pointer', styles.linkMenu)}
          >
            <a
              href={menu && menu?.link !== IS_TOPIC ? menu?.link : '#'}
              className={clsx(
                `text-primary-switch flex transition-all font-[Lora] lg:text-xl text-base leading-6 font-medium `,
                styles.hoverNav
              )}
              onClick={handleScroll}
            >
              {menu.title}
            </a>
            {menu && menu?.link === IS_TOPIC && Array.isArray(topic) && topic?.length > 0 ? (
              <MenuDropDownIcon className={clsx(styles.subIcon)} />
            ):''}

            {menu?.link === IS_TOPIC && topic && topic?.length > 0 ? (
              <ul className={clsx(styles.subMenu, 'bg-primary-switch')}>
                {topic?.map((ele: TTopicMenu, index: React.Key) => {
                  return (
                    <div key={`${index}${ele?.slug}`}>
                      <li
                        className="capitalize textDesc-1 text-primary-switch hover:text-PrimaryBlue"
                        onClick={() => {handleNavigate(`${menu?.link}/${ele?.slug}/${ele?.propertyId}`);
                        setOpen(false)
                      }}
                      >
                        {ele?.title}
                      </li>
                      {index !== topic.length - 1 && <Divider className="my-0" />}
                    </div>
                  );
                })}
              </ul>
            ):''}
          </li>
        );
      })}
    </>
  );
}
