import toggleButton from '@/types/buttonType/toggleButtonType';
import { CheckIcon } from '@/library';
import clsx from 'clsx';
import { theme } from 'antd';
const { useToken } = theme;
/** WARNING need to refactor this component who code? **/

const ToggleButton = ({ theme, text, toggled, className, onToggle }: toggleButton) => {
  const { token } = useToken();
  const themes = {
    light: {
      buttonBackground: '#FFFFFF',
      circleColor: token.colorPrimary,
      borderColorToggled: token.colorPrimary,
      borderColorNormal: 'rgba(0, 0, 0, 0.06)',
    },
    dark: {
      buttonBackground: token.colorPrimary,
      circleColor: '#FFFFFF',
      borderColorToggled: token.colorPrimary,
      borderColorNormal: '#0E1013',
    },
  };

  return (
    <button
      className={clsx(
        `h-8 cursor-pointer rounded border-solid flex flex-row items-center px-2 py-1`,
        className
      )}
      style={{
        borderColor: toggled ? themes[theme].borderColorToggled : themes[theme].borderColorNormal,
        backgroundColor: toggled ? themes[theme].buttonBackground : '#FFFFFF',
        borderWidth: '1px',
      }}
    >
      <div
        className={`${
          theme === 'dark' && toggled ? 'text-PrimaryWhite' : 'text-PrimaryBlack'
        } text font-[600] text-[14px] leading-5`}
      >
        {text}
      </div>
      {toggled ? (
        <div className="ml-[6px]">
          {/* ***Tailwind does not support this render css*** */}
          {/* <CheckIcon className={`text-[${themes[theme].circleColor}]`} /> */}
          <CheckIcon
            className={clsx(theme === 'dark' ? 'text-PrimaryBlack' : 'text-PrimaryBlue')}
          />
        </div>
      ) : null}
    </button>
  );
};

export default ToggleButton;
