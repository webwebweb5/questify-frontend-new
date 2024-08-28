import { mutate } from 'swr';
import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import axiosInstance, { endpoints } from 'src/utils/axios';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewLabSchema = zod.object({
  invitationCode: zod.string().min(6, { message: 'Invitation Code is required' }),
});

// ----------------------------------------------------------------------

export function JoinLabDialog({ open, onClose, labId }) {
  const loading = useBoolean(false);

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      invitationCode: '',
    }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(NewLabSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    loading.onTrue();
    try {
      const response = await axiosInstance.get(
        `${endpoints.join}?invitationCode=${data.invitationCode}`
      );
      toast.success(`${response.data.message}`);
      mutate(endpoints.laboratory.list);
      onClose();
      router.push(paths.recentLab.root);
    } catch (error) {
      console.error(error);
      toast.error(`${error.message}`);
    }
    loading.onFalse();
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle id="crop-dialog-title">Join Laboratory</DialogTitle>
        <DialogContent dividers style={{ position: 'relative' }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Invitation Code</Typography>
            <Field.Text name="invitationCode" placeholder="e.g. 123456" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            startIcon={<Iconify icon="carbon:login" />}
            loading={isSubmitting}
          >
            Join
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
