import useClickOutside from '@/hooks/useClickOutside';
import { useRef, useState } from 'react';
import { theme as antdTheme } from 'antd';
import clsx from 'clsx';

export type MenuItemsType = {
  label: React.ReactNode;
  key: string | number;
}[];

type PlacementType = 'bottom right' | 'bottom left' | 'right' | 'left';
interface DropdownProps {
  children: React.ReactNode;
  menu: MenuItemsType;
  placement?: PlacementType;
}
export default function Dropdown({ children, menu, placement }: DropdownProps) {
  const { useToken } = antdTheme;
  const { token } = useToken();
  const ref = useRef(null);
  const [showList, setShowList] = useState<boolean>(false);
  const handleToggleList = () => {
    setShowList(!showList);
  };

  // const theme = useAppSelector((state) => state.app.theme.selected);

  useClickOutside(ref, () => {
    setShowList(false);
  });
  return (
    <div ref={ref} className="relative">
      <div className="cursor-pointer" onClick={handleToggleList}>
        {children}
      </div>

      {showList && (
        <div
          className={clsx(
            'absolute mt-2 rounded-[10px] p-4 flex flex-col gap-2 z-50',
            {
              'right-0': placement == 'bottom right',
            },
            {
              'left-0': placement == 'bottom left',
            },
            {
              ' top-0 right-0': placement == 'left',
            },
            {
              'top-0 left-[100%] ml-2': placement == 'right',
            }
          )}
          style={{ backgroundColor: token.colorBgLayout }}
        >
          {menu?.map((item) => (
            <div
              className="p2 flex flex-col py-2 gap-4 "
              key={item.key}
              style={{ color: token.colorText }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
