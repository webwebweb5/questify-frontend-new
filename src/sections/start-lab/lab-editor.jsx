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

export default function LabEditor({ testCases, setComparedResults, submissions, setCurrentTab }) {
  const params = useParams();

  const editorRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState('');

  const loading = useBoolean(false);

  const [currentLanguage, setCurrentLanguage] = useState('Java');

  // const [remainingTime, setRemainingTime] = useState(submissions?.remainingTime);

  // useEffect(() => {
  //   const fetchTime = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `${endpoints.submission.get}?questionId=${params.id}`
  //       );
  //       setRemainingTime(response.data.data.remainingTime);
  //     } catch (error) {
  //       console.error('Error fetching remaining time:', error);
  //     }
  //   };

  //   // Fetch time every second
  //   const interval = setInterval(fetchTime, 1000);

  //   return () => clearInterval(interval);
  // }, [params.id]);

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

      const newResults = responses.map((response) => response.data.output.trim());

      const comparisonResults = newResults.map((output, index) => ({
        testCaseId: testCases[index].testCaseId,
        input: testCases[index].input,
        expectedOutput: testCases[index].expectedOutput,
        actualOutput: output,
        isEqual: output === testCases[index].expectedOutput,
      }));

      setComparedResults(comparisonResults);

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

  const formatTime = (timeInSeconds) => {
    const isNegative = timeInSeconds < 0;
    const absoluteTime = Math.abs(timeInSeconds);
    const minutes = Math.floor(absoluteTime / 60);
    const seconds = absoluteTime % 60;
    const formattedTime = `${isNegative ? '-' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  };

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
            sx={{ color: submissions?.remainingTime < 0 ? 'red' : 'inherit' }}
          >
            {/* Remaining Time: {formatTime(remainingTime)} */}
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
        <Button variant="contained">Submit</Button>
      </Stack>
    </Stack>
  );
}
