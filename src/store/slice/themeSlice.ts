import { createSlice } from '@reduxjs/toolkit';
import { SizeType } from 'antd/es/config-provider/SizeContext';

export enum ThemeType {
  default = 'default',
  dark = 'dark',
}
export interface ThemeProps {
  selected: ThemeType;
  colorPrimary: string;
  space?: { size?: number | SizeType };
  direction?: 'ltr' | 'rtl';
  componentSize?: SizeType;
}

const initialState: ThemeProps = {
  selected: ThemeType.default,
  colorPrimary: '#3A6EA5',
  space: {
    size: 'middle',
  },
  direction: 'ltr',
  componentSize: 'middle',
};

const ThemeSlice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    selectTheme: (state, { payload }) => {
      state.selected = payload;
    },
    selectSpace: (state, { payload }) => {
      state.space = payload;
    },
    selectAccentColor: (state, { payload }) => {
      state.colorPrimary = payload;
    },
    selectDirection: (state, { payload }) => {
      state.direction = payload;
    },
    selectComponentSize: (state, { payload }) => {
      state.componentSize = payload;
    },
  },
});

export const {
  selectTheme,
  selectSpace,
  selectDirection,
  selectAccentColor,
  selectComponentSize,
} = ThemeSlice.actions;

export default ThemeSlice.reducer;
