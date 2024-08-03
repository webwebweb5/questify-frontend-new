'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';

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
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import { LabContent } from 'src/layouts/lab';
import { useGetLaboratoryById } from 'src/actions/laboratory';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
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

  const params = useParams();

  const { laboratory } = useGetLaboratoryById(params.lid);

  const { copy } = useCopyToClipboard();

  const onCopy = useCallback(
    (text) => {
      if (text) {
        toast.success(`Copied: ${text}`);
        copy(text);
      }
    },
    [copy]
  );

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
                onClick={() => onCopy(laboratory?.invitationCode)}
                sx={{ width: 'fit-content' }}
              >
                {laboratory?.invitationCode}
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
                        {laboratory?.professor?.displayName?.charAt(0)}
                      </Avatar>
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                        <Typography sx={{ width: 'fit-content' }}>
                          {laboratory?.professor?.displayName
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
                          {laboratory?.professor?.professorId}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="left" sx={{ borderRadius: 0 }}>
                    <Typography>{laboratory?.professor?.email}</Typography>
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

        {/* <MemberList /> */}
        <MemberList users={laboratory?.students} />
      </Stack>
    </LabContent>
  );
}
