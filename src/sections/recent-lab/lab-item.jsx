import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, styled, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export const StyledDot = styled(Box)(() => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  display: 'flex',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'currentColor',
}));

// ----------------------------------------------------------------------

export function LabItem({ lab }) {
  const popover = usePopover();

  const { laboratoryId, title, description, professor, status, studentQuantity } = lab;

  const renderStatus = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        left: 8,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
      }}
    >
      <Iconify
        width={24}
        icon="solar:double-alt-arrow-up-bold-duotone"
        sx={{ flexShrink: 0, color: 'success.main', mr: 0.5 }}
      />
      {status === 'PUBLISH' ? (
        <Typography variant="Subtitle1" noWrap>
          Active
        </Typography>
      ) : (
        <>
          <StyledDot
            component="span"
            sx={{ flexShrink: 0, color: 'text.disabled', mr: 1, ml: 0.5 }}
          />
          <Typography variant="Subtitle1" sx={{ color: 'grey.400' }} noWrap>
            InActive
          </Typography>
        </>
      )}
    </Stack>
  );

  const renderImages = (
    <Box gap={0.5} display="flex" sx={{ p: 1 }}>
      <Box flexGrow={1} sx={{ position: 'relative' }}>
        {renderStatus}
        <Avatar alt={title} sx={{ width: 1, height: 164, borderRadius: 1 }}>
          {title}
        </Avatar>
      </Box>
    </Box>
  );

  const renderTexts = (
    <ListItemText
      sx={{ p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5) }}
      primary={
        <Link component={RouterLink} href={paths.lab.main(laboratoryId)} color="inherit">
          {title}
        </Link>
      }
      secondary={description}
      primaryTypographyProps={{
        typography: 'subtitle1',
      }}
      secondaryTypographyProps={{
        mt: 1,
        component: 'span',
        typography: 'caption',
        color: 'text.disabled',
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{ position: 'relative', p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5) }}
    >
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      {[
        {
          icon: (
            <Iconify icon="solar:user-check-rounded-bold-duotone" sx={{ color: 'warning.main' }} />
          ),
          label: `${professor.displayName}`,
        },
        {
          icon: (
            <Iconify
              icon="solar:users-group-two-rounded-bold-duotone"
              sx={{ color: 'primary.main' }}
            />
          ),
          label: `${studentQuantity} Member${studentQuantity > 0 ? 's' : ''}`,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          {item.icon}
          <Typography variant="body2" noWrap>
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
