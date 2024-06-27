import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ChildrenAgeBelow from './ChildrenAgeBelow';
import styles from './../GuestDropdown.module.scss';
import clsx from 'clsx';

interface GuestTypesProps {
  value: number;
  handleIncrease: (mode: string) => void;
  handleDescrease: (mode: string) => void;
  guestTitle: string;
  description?: string;
  disabledUp?: boolean;
  disabledDown?: boolean;
  mode: string;
}

const GuestTypes: React.FC<GuestTypesProps> = ({
  guestTitle,
  description,
  value,
  disabledUp,
  disabledDown,
  mode,
  handleIncrease,
  handleDescrease,
}) => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-center">
        <p className="text-Main">{guestTitle}</p>
        <p className="text-Main text-[12px] font-light">{description}</p>
      </div>
      <div className="flex items-center justify-end">
        <div className="ml-2 flex">
          <button
            disabled={disabledDown}
            onClick={() => handleDescrease(mode)}
            className={clsx(
              'cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 rounded-[50%] border-none',
              styles.changebutton
            )}
          >
            <MinusOutlined width={20} height={20} />
          </button>

          <p className="flex items-center justify-center w-8 h-8 border border-LightGrey rounded">
            {value}
          </p>

          <button
            disabled={disabledUp}
            onClick={() => handleIncrease(mode)}
            className={clsx(
              'cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 rounded-[50%] border-none',
              styles.changebutton
            )}
          >
            <PlusOutlined width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestTypes;
