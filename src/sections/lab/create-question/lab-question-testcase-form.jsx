import { useFieldArray, useFormContext } from 'react-hook-form';

import { Card, Stack, Button, CardHeader, Typography } from '@mui/material';

import { Field } from 'src/components/hook-form';

export default function LabQuestionTestCaseForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testCases',
  });

  return (
    <Card>
      <CardHeader title="Test Case" />
      <Stack direction="row" justifyContent="space-between" sx={{ px: 3 }}>
        <Typography variant="subtitle2" color="text.disabled">
          (Max 3 Test Cases)*
        </Typography>
      </Stack>

      <Stack spacing={3} sx={{ p: 3 }}>
        {fields.map((item, index) => (
          <Stack key={item.id} spacing={1.5}>
            <Typography variant="subtitle2">{`Test Case ${index + 1}`}</Typography>
            <Field.Text name={`testCases[${index}].input`} placeholder="Input" />
            <Field.Text name={`testCases[${index}].expectedOutput`} placeholder="Expected output" />
            <Button
              variant="contained"
              color="error"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              Remove
            </Button>
          </Stack>
        ))}
        {fields.length < 3 && (
          <Button variant="contained" onClick={() => append({ input: '', expectedOutput: '' })}>
            Add Test Case
          </Button>
        )}
      </Stack>
    </Card>
  );
}
