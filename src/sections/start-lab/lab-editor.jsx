import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor, loader } from '@monaco-editor/react';
import { useRef, useMemo, useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack, Button, Tooltip, MenuItem, IconButton, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { updateSubmission, updateAndExecuteSubmission } from 'src/actions/submission';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const ChangeLanguageSchema = zod.object({
  language: zod.enum(['Java', 'JavaScript', 'Python', 'C']),
});

// ----------------------------------------------------------------------

export default function LabEditor({
  testCases,
  setComparedResults,
  submissions,
  setCurrentTab,
  submitDialog,
}) {
  const params = useParams();

  const editorRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState('');

  const [remainingTime, setRemainingTime] = useState(0);

  const loading = useBoolean(false);

  const [currentLanguage, setCurrentLanguage] = useState('Java');

  useEffect(() => {
    if (submissions && submissions.endTime) {
      const timeDifference = new Date(submissions.endTime).getTime() - Date.now();

      // Convert milliseconds to seconds
      const secondsLeft = timeDifference / 1000;

      setRemainingTime(secondsLeft);
    }
  }, [submissions]);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    // Return undefined explicitly when remainingTime is not greater than 0
    return undefined;
  }, [remainingTime]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value, event) => {
    if (value.length > 3000) {
      setErrorMessage('Code cannot exceed 3000 characters');
    } else {
      setErrorMessage('');
    }
  };

  const handleExecute = async () => {
    const code = editorRef?.current?.getValue();
    if (code.length > 3000) {
      toast.error('Code cannot exceed 3000 characters');
      return;
    }

    loading.onTrue();

    try {
      await updateSubmission(params.id, currentLanguage, code);

      const promises = testCases.map((testCase) =>
        updateAndExecuteSubmission(params.id, testCase.testCaseId, currentLanguage, code)
      );

      const responses = await Promise.all(promises);

      const result = responses.map((response) => response?.data?.testCaseResults);

      setComparedResults(result[0]);

      const alert = responses[0]?.message || 'Execution completed';
      toast.success(`${alert}`);
      setCurrentTab('two');
    } catch (error) {
      console.error(error);
      toast.error(`${error.message}`);
    } finally {
      loading.onFalse();
    }
  };

  const handleUpdateCode = async () => {
    const code = editorRef?.current?.getValue();
    if (code.length > 3000) {
      toast.error('Code cannot exceed 3000 characters');
      return;
    }
    loading.onTrue();
    try {
      const response = await updateSubmission(params.id, currentLanguage, code);
      toast.success(`${response.message}`);
    } catch (error) {
      console.error(error);
      toast.error(`${error.message}`);
    } finally {
      loading.onFalse();
    }
  };

  const defaultValues = useMemo(
    () => ({
      language: 'Java' || '',
    }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(ChangeLanguageSchema),
    defaultValues,
  });

  const { reset } = methods;

  const handleLanguageChange = (e) => {
    setCurrentLanguage(e.target.value);
  };

  useEffect(() => {
    if (currentLanguage) {
      loading.onTrue();
      reset({
        language: currentLanguage,
      });
      loading.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, params.lid, reset]);

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

  function formatTimeWithConversion(seconds) {
    const isNegative = seconds < 0;
    const flooredSeconds = Math.floor(Math.abs(seconds)); // Floor the absolute seconds to remove decimal

    if (flooredSeconds >= 3600) {
      const hours = Math.floor(flooredSeconds / 3600);
      const remainingSecondsAfterHours = flooredSeconds % 3600;
      const minutes = Math.floor(remainingSecondsAfterHours / 60);
      const remainingSeconds = remainingSecondsAfterHours % 60;
      const timeString = `${hours} hr ${minutes} min ${remainingSeconds} sec`;

      return isNegative ? `-${timeString}` : timeString;
    }

    const minutes = Math.floor(flooredSeconds / 60);
    const remainingSeconds = flooredSeconds % 60;
    const timeString = `${minutes} min ${remainingSeconds} sec`;

    return isNegative ? `-${timeString}` : timeString;
  }

  return (
    <Stack sx={{ height: '100%', position: 'relative' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 1, pr: 2 }}
      >
        <Form methods={methods}>
          <Stack sx={{ width: 'fit-content', minWidth: 112 }}>
            <Field.Select name="language" onChange={handleLanguageChange} disabled={loading.value}>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Field.Select>
          </Stack>
        </Form>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Typography
            variant="caption"
            sx={{ color: remainingTime < 0 ? 'error.main' : 'inherit' }}
          >
            Remaining Time: {formatTimeWithConversion(remainingTime)}
          </Typography>
          <Tooltip title="Save" placement="top" arrow>
            <IconButton sx={{ height: 'fit-content' }} onClick={handleUpdateCode}>
              <Iconify icon="fluent:save-sync-20-regular" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          wordWrap: 'on',
        }}
        theme="myTheme"
        defaultLanguage={currentLanguage.toLowerCase()}
        defaultValue={submissions?.codeSnippets?.Java || ''}
        language={currentLanguage.toLowerCase()}
        value={submissions?.codeSnippets?.[currentLanguage]}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
      <Stack
        spacing={2}
        direction="row"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 18,
        }}
      >
        {errorMessage && (
          <Typography color="error" variant="caption" sx={{ p: 1 }}>
            {errorMessage}
          </Typography>
        )}
        <LoadingButton
          variant="outlined"
          onClick={handleExecute}
          startIcon={<Iconify icon="carbon:play-filled-alt" />}
          loading={loading.value}
        >
          Run
        </LoadingButton>
        <Button variant="contained" onClick={submitDialog.onTrue}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
