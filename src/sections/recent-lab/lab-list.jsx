import Box from '@mui/material/Box';

import { EmptyContent } from 'src/components/empty-content';

import { LabItem } from './lab-item';

// ----------------------------------------------------------------------

export function LabList({ labs }) {
  if (labs.length === 0) {
    return <EmptyContent filled title="Laboratory not found" sx={{ my: 3, py: 10 }} />;
  }

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        // lg: 'repeat(4, 1fr)',
      }}
    >
      {labs.map((lab) => (
        <Box key={lab.laboratoryId}>
          <LabItem lab={lab} />
        </Box>
      ))}
    </Box>
  );
}
