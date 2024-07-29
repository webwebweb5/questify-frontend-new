'use client';

import {
  Box,
  Stack,
  Table,
  Avatar,
  Button,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { LabContent } from 'src/layouts/lab';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import MemberList from '../member-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', minWidth: 180, width: { xs: 300, lg: 450 } },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'actions', label: '', align: 'right' },
];

// ----------------------------------------------------------------------

export function LabMemberView() {
  const mdUp = useResponsive('up', 'md');

  return (
    <LabContent maxWidth="xl">
      <Stack spacing={2} sx={{ mb: 6 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h4">Professor</Typography>
            <Label>1</Label>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2">Invitation Code: </Typography>
            <Tooltip title="Click to copy" placement="left" arrow>
              <Button
                variant="contained"
                startIcon={<Iconify icon="carbon:copy" />}
                // onClick={() => onCopy(classroom?.invitationCode)}
                sx={{ width: 'fit-content' }}
              >
                123456
              </Button>
            </Tooltip>
          </Stack>
        </Stack>

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
                <TableRow>
                  <TableCell sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        alt="Pathathai"
                        sx={{
                          width: 36,
                          height: 36,
                        }}
                      >
                        P
                      </Avatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                        <Typography sx={{ width: 'fit-content' }}>Pathathai Nalumpoon</Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.disabled"
                          sx={{ mt: 0.5, width: 'fit-content' }}
                        >
                          123456789
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" sx={{ borderRadius: 0 }}>
                    <Typography>pathathai.n@cmu.ac.th</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Stack>

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h4">Students</Typography>
            <Label>1</Label>
          </Stack>
        </Stack>

        <MemberList />
        {/* <MemberList users={students} /> */}
      </Stack>
    </LabContent>
  );
}