import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Stack, Button, Tooltip, MenuItem, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const ChangeLanguageSchema = zod.object({
  language: zod.enum(['Java', 'JavaScript', 'Python', 'C']),
});

// ----------------------------------------------------------------------

export default function LabEditor() {
  const defaultValues = useMemo(
    () => ({
      language: '',
    }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(ChangeLanguageSchema),
    defaultValues,
  });

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
            <Field.Select name="language">
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Field.Select>
          </Stack>
        </Form>
        <Tooltip title="Save" placement="top" arrow>
          <IconButton sx={{ height: 'fit-content' }}>
            <Iconify icon="fluent:save-sync-20-regular" />
          </IconButton>
        </Tooltip>
      </Stack>
      {/* <Editor
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
                /> */}
      <Stack
        spacing={2}
        direction="row"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 18,
        }}
      >
        {/* {errorMessage && (
                    <Typography color="error" variant="caption" sx={{ p: 1 }}>
                      {errorMessage}
                    </Typography>
                  )} */}
        <LoadingButton variant="outlined" startIcon={<Iconify icon="carbon:play-filled-alt" />}>
          Run
        </LoadingButton>
        <Button variant="contained">Submit</Button>
      </Stack>
    </Stack>
  );
}
