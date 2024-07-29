import Box from '@mui/material/Box';

import { useRouter } from 'src/routes/hooks';

import { LabItem } from './lab-item';

// ----------------------------------------------------------------------

export function LabList({ labs }) {
  const router = useRouter();

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      <LabItem />
    </Box>
  );
}
