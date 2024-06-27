import React, { Fragment } from 'react';
import ButtonProps from './@types';
import clsx from 'clsx';
import Image from 'next/image';

export enum ButtonStyle {
  DARK = 'dark', //primary blue button
  OUTLINE = 'outline',
  TRANSPARENT = 'transparent',
  WHITE = 'white',
  BLACK = 'black',
  WARN = 'warning',
  SURFACE = 'surface',
}

export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

const ButtonShare = ({
  content,
  style,
  className,
  onClick,
  size,
  spin,
  disable,
  htmlType,
}: ButtonProps) => {
  return (
    <>
      <button
        type={htmlType ? htmlType : 'button'}
        disabled={disable}
        onClick={onClick}
        className={clsx(
          'btnShare px-4 py-auto',
          className,
          style === ButtonStyle.DARK
            ? 'btnDark'
            : style === ButtonStyle.OUTLINE
            ? 'btnOutline dark:border dark:border-SecondaryBlue'
            : style === ButtonStyle.TRANSPARENT
            ? 'btnTransparent'
            : style === ButtonStyle.WHITE
            ? 'btnWhite'
            : style === ButtonStyle.WARN
            ? 'btnWarning'
            : style === ButtonStyle.SURFACE
            ? 'btnSurface'
            : style === ButtonStyle.BLACK
            ? 'btnBlack'
            : 'btnOutline',
          size
            ? {
                'h-12 text-base leading-4': size === ButtonSize.LARGE,
                'h-10 text-base leading-4': size === ButtonSize.MEDIUM,
                'h-8 text-sm leading-4': size === ButtonSize.SMALL,
              }
            : 'py-3 px-4 text-base leading-4'
        )}
      >
        {spin && (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4">
              <Image
                className="w-full h-full object-contain"
                src={require('../../../assets/loading-gif.gif')}
                alt="spin"
                width={0}
                height={0}
              />
            </div>
            <div>{content}</div>
          </div>
        )}
        {!spin && content}
      </button>
    </>
  );
};

export default ButtonShare;
