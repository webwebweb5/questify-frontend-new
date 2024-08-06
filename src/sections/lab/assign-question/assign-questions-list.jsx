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

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', minWidth: 180, width: { xs: 300, lg: 450 } },
  { id: 'mail', label: 'Email' },
  { id: 'assign-lab', label: 'Assign' },
  { id: 'actions', label: '', align: 'right' },
];

// ----------------------------------------------------------------------

export default function AssignQuestionsList({ students }) {
  const mdUp = useResponsive('up', 'md');

  const loading = useBoolean(false);

  return (
    <Box sx={{ maxWidth: 1227.33 }}>
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
                      width: headCell.width
                        ? mdUp
                          ? headCell.width.lg
                          : headCell.width.xs
                        : 'auto',
                    }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={student.firstName_EN} sx={{ width: 36, height: 36 }}>
                        {student.firstName_EN.charAt(0)}
                      </Avatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                        <Typography sx={{ width: 'fit-content' }}>
                          {student.displayName
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
                          {student.studentId}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" sx={{ borderRadius: 0 }}>
                    <Typography>{student.email}</Typography>
                  </TableCell>
                  <TableCell>assign?</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Iconify icon="material-symbols:label-off-outline" />}
                      disabled
                    >
                      Unassign
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Box>
  );
}
