import React from 'react';
import styles from './TagName.module.scss';
import TagNameProps from './@types';
import clsx from 'clsx';

export enum TagNameConst {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  DEFAULT = 'default',
  DARK = 'dark',
}

export const TagNameStyle: { [name in TagNameConst]: string } = {
  [TagNameConst.PRIMARY]: styles.tagNamePrimary,
  [TagNameConst.SUCCESS]: styles.tagNameSuccess,
  [TagNameConst.WARNING]: styles.tagNameWarning,
  [TagNameConst.DANGER]: styles.tagNameDanger,
  [TagNameConst.DEFAULT]: styles.tagNameDefault,
  [TagNameConst.DARK]: styles.tagNameDark,
};

const TagName = ({ content, className, style, cb }: TagNameProps) => {
  return (
    <span
      onClick={cb}
      className={clsx('inline-block border-switch', styles.tagName, className || 'mr-2 mb-2')}
    >
      {content}
    </span>
  );
};

export default TagName;
