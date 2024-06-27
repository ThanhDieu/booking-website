import { LongRightIcon } from '@/library';
import { Button } from 'antd';
import clsx from 'clsx';
import styles from './SearchButton.module.scss';

export interface SearchButtonProps {
  onClick?: () => void;
}
const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <Button
      htmlType="submit"
      onClick={onClick}
      className={clsx('h-[52px] w-[52px] blue-outline-switch', styles.searchButton)}
      disabled={!onClick}
    >
      <LongRightIcon className={styles.searchIcon} />
    </Button>
  );
};

export default SearchButton;
