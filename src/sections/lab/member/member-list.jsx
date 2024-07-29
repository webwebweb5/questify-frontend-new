'use client';

import {
  Box,
  Stack,
  Table,
  Avatar,
  TableRow,
  MenuItem,
  MenuList,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', minWidth: 180, width: { xs: 300, lg: 450 } },
  { id: 'mail', label: 'Email', align: 'left' },
  { id: 'actions', label: '', align: 'right' },
];

const users = [
  {
    userId: '642115031',
    firstName_EN: 'PHIRIYAKORN',
    lastName_EN: 'MANEEKONGRIT',
    displayName: 'PHIRIYAKORN MANEEKONGRIT',
    userName: 'phiriyakorn_m',
    email: 'phiriyakorn_m@cmu.ac.th',
    organization_name_EN: 'College of Arts, Media and Technology',
    student: {
      studentId: '642115031',
    },
    professor: null,
    role: 'StdAcc',
  },
];

// ----------------------------------------------------------------------

export default function MemberList() {
  const mdUp = useResponsive('up', 'md');

  const popover = usePopover();

  if (users?.length === 0) {
    return <Box>Student not found</Box>;
  }

  return (
    <>
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
              {users &&
                users?.map((user) => (
                  <TableRow key={user.studentId}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={user.firstName_EN} sx={{ width: 36, height: 36 }}>
                          {user.firstName_EN.charAt(0)}
                        </Avatar>
                        <Box
                          sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}
                        >
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
                            {user.userId}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{user.email}</Typography>
                    </TableCell>
                    <TableCell>
                      {/* {role === 'ProfAcc' && ( */}
                      <IconButton
                        onClick={(e) => {
                          popover.onOpen(e);
                        }}
                      >
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                      {/* )} */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          <MenuItem onClick={() => popover.onClose()} sx={{ color: 'primary.main' }}>
            <Iconify icon="carbon:chart-histogram" />
            Grades
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Remove
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}