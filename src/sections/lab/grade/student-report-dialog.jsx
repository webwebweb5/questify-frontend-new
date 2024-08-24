import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { Editor, loader } from '@monaco-editor/react';
import { zodResolver } from '@hookform/resolvers/zod';

import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Grid,
  Stack,
  AppBar,
  Divider,
  Toolbar,
  useTheme,
  Typography,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { updateReport } from 'src/actions/report';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function StudentReportDialog({ open, onClose, report }) {
  const loading = useBoolean(false);

  const theme = useTheme();

  const ScoreSchema = zod.object({
    givenScore: zod
      .number()
      .min(0)
      .max(report?.maxScore, { message: 'Score must not exceed the maximum score!' })
      .nonnegative({ message: 'Score must be a non-negative number!' }),
  });

  const defaultValues = useMemo(
    () => ({
      givenScore: report?.givenScore || 0,
    }),
    [report?.givenScore]
  );

  const methods = useForm({
    resolver: zodResolver(ScoreSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    loading.onTrue();
    try {
      const response = await updateReport(report?.submission?.submissionId, data);
      toast.success(`${response.message}`);
    } catch (error) {
      console.error(error);
      toast.success(`${error.message}`);
    } finally {
      loading.onFalse();
    }
  });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset, defaultValues]);

  loader.init().then((monaco) => {
    monaco.editor.defineTheme('myTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1B212A',
      },
    });
  });

  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={onClose}>
      <AppBar position="relative" color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
            Report
          </Typography>

          <IconButton color="inherit" edge="start" onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent dividers style={{ position: 'relative' }}>
        <Grid container spacing={1} alignItems="stretch" sx={{ mb: 1 }}>
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              Question: {report?.question?.title}
            </div>
          </Grid>
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              Status: {report?.submitStatus}
            </div>
          </Grid>
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              Score: {report?.givenScore !== null ? report?.givenScore : '-'}/{report?.maxScore}
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems="stretch"
          sx={{ mb: 1, maxHeight: '300px', height: '300px' }}
        >
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h4" noWrap>
                {report?.question?.title}
              </Typography>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Markdown children={report?.question?.problemStatement} />
            </div>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              <Editor
                options={{
                  minimap: {
                    enabled: false,
                  },
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 3,
                  wordWrap: 'on',
                  readOnly: true,
                }}
                theme="myTheme"
                defaultLanguage="java"
                defaultValue={report?.submission?.codeSnippets?.Java || ''}
                language="java"
                value={report?.submission?.codeSnippets?.Java || ''}
              />
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="stretch" sx={{ mb: 1 }}>
          {report?.submission?.testCaseResults.map((result) => (
            <Grid
              key={result.testCaseResultId}
              item
              xs={4}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div
                style={{
                  backgroundColor: '#1B212A',
                  padding: '16px',
                  flex: 1,
                  borderRadius: 8,
                  border: `dashed 1px ${theme.palette.divider}`,
                }}
              >
                <Stack>
                  <Typography>Input: {result.testCase.input}</Typography>
                  <Typography>Expected Output: {result.testCase.expectedOutput}</Typography>
                  <Typography>Actual Output: {result.actualOutput}</Typography>
                  <Typography>Result: {result.result}</Typography>
                </Stack>
              </div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={1} alignItems="stretch" sx={{ mb: 1 }}>
          {/* Grid for SWITCH_TAB */}
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              {`SWITCH_TAB: ${report?.loggings?.reduce((acc, log) => {
                if (log.actionName === 'SWITCH_TAB') acc += 1;
                return acc;
              }, 0)} times`}
            </div>
          </Grid>

          {/* Grid for COPY */}
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              {`COPY: ${report?.loggings?.reduce((acc, log) => {
                if (log.actionName === 'COPY') acc += 1;
                return acc;
              }, 0)} times`}
            </div>
          </Grid>

          {/* Grid for PASTE */}
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#1B212A',
                padding: '16px',
                flex: 1,
                borderRadius: 8,
                border: `dashed 1px ${theme.palette.divider}`,
              }}
            >
              {`PASTE: ${report?.loggings?.reduce((acc, log) => {
                if (log.actionName === 'PASTE') acc += 1;
                return acc;
              }, 0)} times`}
            </div>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Form methods={methods} onSubmit={onSubmit}>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h4">Score</Typography>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Field.Text
                name="givenScore"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '55px', fontSize: '2rem', fontWeight: 500 }}
              />
              <Typography variant="h4">/{report?.maxScore}</Typography>
            </Stack>
            <LoadingButton
              size="large"
              color="primary"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Give Score
            </LoadingButton>
          </Stack>
        </Form>
      </DialogActions>
    </Dialog>
  );
}
