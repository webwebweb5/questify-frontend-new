/* eslint-disable perfectionist/sort-imports */

'use client';

import 'dayjs/locale/en';
import 'dayjs/locale/th';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

// ----------------------------------------------------------------------

export function LocalizationProvider({ children }) {
  return (
    <Provider dateAdapter={AdapterDayjs} locale="th">
      {children}
    </Provider>
  );
}
