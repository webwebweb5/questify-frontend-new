import {
  Box,
  Card,
  Link,
  Stack,
  Button,
  Divider,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
  ListItemText,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function LabQuestionItem() {
  const popover = usePopover();

  return (
    <>
      <Card sx={{ position: 'relative', overflow: 'visible' }}>
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Box
          component="span"
          sx={{
            px: 1,
            top: 0,
            ml: 2.5,
            left: 0,
            py: 0.25,
            borderRadius: 2,
            position: 'absolute',
            color: 'common.black',
            bgcolor: 'common.white',
            transform: 'translateY(-50%)',
            fontSize: (theme) => theme.typography.caption.fontSize,
            fontWeight: (theme) => theme.typography.fontWeightSemiBold,
            border: (theme) => `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
          }}
        >
          Version 1
        </Box>

        <Stack justifyContent="space-between" sx={{ height: '100%' }}>
          <Stack spacing={1} sx={{ p: 3, pb: 2 }}>
            <ListItemText
              primary={
                <Link component={RouterLink} href="" color="inherit">
                  Question 1
                </Link>
              }
              secondary=""
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

            <Stack
              spacing={1}
              direction="row"
              sx={{ color: 'primary.main', typography: 'caption' }}
            >
              <Iconify width={16} icon="mdi:medal-outline" />
              <Typography variant="caption">Score 10</Typography>
            </Stack>

            <Stack
              spacing={1}
              direction="row"
              sx={{ color: 'primary.main', typography: 'caption' }}
            >
              <Iconify width={16} icon="charm:graduate-cap" />
              <Typography variant="caption">Pathathai Nalumpoon</Typography>
            </Stack>
          </Stack>

          <Box>
            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box
              rowGap={1}
              columnGap={1}
              display="grid"
              // gridTemplateColumns={`${role !== 'ProfAcc' && 'repeat(2, 1fr)'}`}
              sx={{ p: 3 }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{ py: 1.5 }}
                startIcon={<Iconify icon="mdi:assignment-ind-outline" />}
              >
                See Submissions
              </Button>
            </Box>
          </Box>
        </Stack>
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        // slotProps={{ arrow: { placement: 'bottom-center' } }}
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
