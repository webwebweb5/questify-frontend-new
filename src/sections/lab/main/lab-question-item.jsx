import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
  Box,
  Card,
  Link,
  Stack,
  Button,
  Dialog,
  Divider,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Loading from 'src/app/loading';
import { maxLine, varAlpha } from 'src/theme/styles';
import { useGetALlTestCases } from 'src/actions/question';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const stripHtmlTags = (input) => input.replace(/<\/?[^>]+(>|$)/g, '');

// ----------------------------------------------------------------------

export function LabQuestionItem({ question, index }) {
  const popover = usePopover();

  const params = useParams();

  const router = useRouter();

  const { questionId, title, problemStatement, laboratory } = question;

  const { testCases, testCasesLoading, testCasesError } = useGetALlTestCases(questionId);

  const [questionInfoPopupOpen, setQuestionInfoPopupOpen] = useState(false);

  if (testCasesLoading) return <Loading />;
  if (testCasesError) return <Box>Something wrong</Box>;

  const renderQuestionInfoDialog = (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={questionInfoPopupOpen}
      onClose={() => setQuestionInfoPopupOpen(false)}
    >
      <DialogTitle id="crop-dialog-title">Question Information</DialogTitle>
      <DialogContent dividers style={{ position: 'relative' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Markdown children={problemStatement} />
        <Box
          sx={{ my: 2 }}
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {testCases?.map((testCase, i) => (
            <Card key={i} sx={{ bgcolor: '#1B212A' }}>
              <Stack spacing={0.5} sx={{ p: 2.5, px: 3, pr: 2.5 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">{`Test Case ${i + 1}`}</Typography>
                </Stack>
                <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
                <Typography variant="body2">{`Input: ${testCase.input}`}</Typography>
                <Typography variant="body2">{`Expected Output: ${testCase.expectedOutput}`}</Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setQuestionInfoPopupOpen(false)}
          startIcon={<Iconify icon="eva:close-outline" />}
        >
          Close
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={<Iconify icon="carbon:play-filled-alt" />}
        >
          Test Lab
        </Button>
      </DialogActions>
    </Dialog>
  );

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
          Version {index + 1}
        </Box>

        <Stack justifyContent="space-between" sx={{ height: '100%' }}>
          <Stack spacing={1} sx={{ p: 3, pb: 2 }}>
            <ListItemText
              primary={
                <Link
                  component={RouterLink}
                  onClick={() => {
                    setQuestionInfoPopupOpen(true);
                  }}
                  href=""
                  color="inherit"
                >
                  {title}
                </Link>
              }
              secondary={
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', mt: 1, ...maxLine({ line: 1 }) }}
                >
                  {stripHtmlTags(problemStatement)}
                </Typography>
              }
              primaryTypographyProps={{
                typography: 'subtitle1',
              }}
            />

            <Stack
              spacing={1}
              direction="row"
              sx={{ color: 'primary.main', typography: 'caption' }}
            >
              <Iconify width={16} icon="mdi:access-time" />
              <Typography variant="caption">Duration {laboratory?.duration} min</Typography>
            </Stack>

            <Stack
              spacing={1}
              direction="row"
              sx={{ color: 'primary.main', typography: 'caption' }}
            >
              <Iconify width={16} icon="mdi:medal-outline" />
              <Typography variant="caption">Max Score {laboratory?.maxScore} points</Typography>
            </Stack>

            <Stack
              spacing={1}
              direction="row"
              sx={{ color: 'primary.main', typography: 'caption' }}
            >
              <Iconify width={16} icon="charm:graduate-cap" />
              <Typography variant="caption">
                {laboratory?.professor?.displayName
                  .toLowerCase()
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Typography>
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

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          <MenuItem
            onClick={() => {
              setQuestionInfoPopupOpen(true);
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              router.push(paths.lab.question.edit(params.lid, questionId));
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

      {renderQuestionInfoDialog}
    </>
  );
}
