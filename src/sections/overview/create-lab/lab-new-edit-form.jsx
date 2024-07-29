import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Button, MenuItem } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewLabSchema = zod.object({
  title: zod.string().min(3, { message: 'Title is required!' }),
  description: zod.string().min(3, { message: 'Description is required!' }),
  maxScore: zod.number().min(1, { message: 'Max score is required!' }),
  status: zod.enum(['ACTIVE', 'INACTIVE']),
  duration: zod.number().min(1, { message: 'Duration is required!' }),
});

// ----------------------------------------------------------------------

export function LabNewEditForm({ currentLab }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      title: currentLab?.title || '',
      description: currentLab?.description || '',
      maxScore: currentLab?.maxScore || 0,
      status: currentLab?.status || 'INACTIVE',
      duration: currentLab?.duration || 0,
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
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentLab) {
      reset(defaultValues);
    }
  }, [currentLab, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentLab ? 'Update success!' : 'Create success!');
      // router.push(paths.recentLab.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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
          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
          <MenuItem value="INACTIVE">INACTIVE</MenuItem>
        </Field.Select>

        <Field.Text
          name="duration"
          label="Duration (min.)"
          placeholder="3"
          type="number"
          InputLabelProps={{ shrink: true }}
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
