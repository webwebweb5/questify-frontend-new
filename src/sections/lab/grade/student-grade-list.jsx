'use client';

import { useState } from 'react';

import {
  Box,
  Stack,
  Table,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { useCurrentRole } from 'src/hooks/use-current-role';

import { Scrollbar } from 'src/components/scrollbar';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', minWidth: 180, width: { xs: 300, lg: 450 } },
  { id: 'question', label: 'Question' },
  { id: 'status', label: 'Status' },
  { id: 'score', label: 'Score' },
  { id: 'actions', label: '', align: 'right' },
];

// ----------------------------------------------------------------------

export default function StudentGradeList({ students }) {
  const mdUp = useResponsive('up', 'md');

  const popover = usePopover();

  const removeForm = useBoolean();

  const role = useCurrentRole();

  const [selectedStudentId, setSelectedStudentId] = useState('');

  if (students?.length === 0) {
    return <Box>Student not found</Box>;
  }

  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align || 'left'}
                  sx={{
                    backgroundColor: 'transparent',
                    minWidth: headCell.minWidth,
                    // eslint-disable-next-line no-nested-ternary
                    width: headCell.width ? (mdUp ? headCell.width.lg : headCell.width.xs) : 'auto',
                  }}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {students &&
              students?.map((user) => (
                <TableRow key={user.studentId}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={user.firstName_EN} sx={{ width: 36, height: 36 }}>
                        {user.firstName_EN.charAt(0)}
                      </Avatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                        <Typography sx={{ width: 'fit-content' }}>
                          {user.displayName
                            .toLowerCase()
                            .split(' ')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.disabled"
                          sx={{ mt: 0.5, width: 'fit-content' }}
                        >
                          {user.studentId}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>Test</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Completed</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>-/100</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained">See Report</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
