import { ArrowUpOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ButtonShare from '../ButtonShare';
import styles from './ScrollTop.module.scss';

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {showTopBtn && (
        <ButtonShare content={<ArrowUpOutlined />} className={styles.iconStyle} onClick={goToTop} />
      )}
    </>
  );
};
export default ScrollToTop;
