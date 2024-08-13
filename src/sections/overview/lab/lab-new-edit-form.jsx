import { mutate } from 'swr';
import { z as zod } from 'zod';
import dayjs, { duration } from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Button, MenuItem } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { endpoints, updateLaboratory } from 'src/utils/axios';

import { createLaboratory } from 'src/actions/laboratory';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

dayjs.extend(duration);

// ----------------------------------------------------------------------

export const NewLabSchema = zod.object({
  title: zod.string().min(2, { message: 'Title is required!' }),
  description: zod.string().min(3, { message: 'Description is required!' }),
  maxScore: zod
    .number()
    .min(0, { message: 'Max score is required!' })
    .max(100, { message: 'Max score cannot exceed 100!' }),
  status: zod.enum(['PUBLISH', 'DRAFT']),
  durationTime: zod.number().min(1, { message: 'Duration is required!' }),
  // .max(30, { message: 'Duration cannot exceed 30!' }),
});

// ----------------------------------------------------------------------

export function LabNewEditForm({ currentLab }) {
  const router = useRouter();

  // Initialize the timeValue state as a dayjs object with the proper time (in minutes and seconds)
  const [timeValue, setTimeValue] = useState(() => {
    const seconds = currentLab ? currentLab.durationTime : 0;
    return dayjs()
      .set('minute', Math.floor(seconds / 60))
      .set('second', seconds % 60);
  });

  const defaultValues = useMemo(
    () => ({
      title: currentLab?.title || '',
      description: currentLab?.description || '',
      maxScore: currentLab?.maxScore || 0,
      status: currentLab?.status || 'DRAFT',
      durationTime: currentLab ? currentLab.durationTime : 0,
    }),
    [currentLab]
  );

  const methods = useForm({
    resolver: zodResolver(NewLabSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentLab) {
      reset(defaultValues);
      const seconds = currentLab.durationTime;
      setTimeValue(
        dayjs()
          .set('minute', Math.floor(seconds / 60))
          .set('second', seconds % 60)
      );
    }
  }, [currentLab, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const durationInSeconds = timeValue.minute() * 60 + timeValue.second();

      const formData = { ...data, durationTime: durationInSeconds };

      let response;
      if (currentLab) {
        response = await updateLaboratory(currentLab.laboratoryId, formData);
      } else {
        response = await createLaboratory(formData);
      }
      reset();
      toast.success(`${response.message}`);
      mutate(endpoints.laboratory.list);
      router.push(paths.recentLab.root);
    } catch (error) {
      console.error(error);
      toast.error(`${error.message}`);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Title, description, max score..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Lab title" />

        <Field.Text name="description" label="Description" multiline rows={4} />

        <Field.Text
          name="maxScore"
          label="Max score"
          placeholder="0"
          type="number"
          InputLabelProps={{ shrink: true }}
        />

        <Field.Select name="status" label="Status" InputLabelProps={{ shrink: true }}>
          <MenuItem value="PUBLISH">PUBLISH</MenuItem>
          <MenuItem value="DRAFT">DRAFT</MenuItem>
        </Field.Select>

        <TimePicker
          ampm={false}
          label="Duration (min. and sec.)"
          value={timeValue}
          views={['minutes', 'seconds']}
          onChange={(newValue) => {
            setTimeValue(newValue);
            const totalSeconds = newValue.minute() * 60 + newValue.second();
            setValue('durationTime', totalSeconds);
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap">
      <Button variant="contained" size="large" color="error" onClick={() => router.back()}>
        Cancel
      </Button>
      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentLab ? 'Create Laboratory' : 'Save changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderActions}
      </Stack>
    </Form>
  );
}
