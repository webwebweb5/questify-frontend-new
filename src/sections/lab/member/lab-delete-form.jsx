import { mutate } from 'swr';
import { useParams, useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints } from 'src/utils/axios';

import { removeStudentFromLaboratory } from 'src/actions/laboratory';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function RemoveStudentForm({ open, onClose, studentId }) {
  const loading = useBoolean(false);

  const router = useRouter();

  const params = useParams();

  const OnRemoveStudent = async () => {
    loading.onTrue();
    try {
      const response = await removeStudentFromLaboratory(params.lid, studentId);
      toast.success(`${response.message}`);
      mutate(endpoints.laboratory.list);
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    loading.onFalse();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Remove Confirmation</DialogTitle>

      <DialogContent dividers style={{ position: 'relative' }}>
        <DialogContentText id="alert-dialog-description">
          Confirm to Remove Student Id: {studentId}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          color="error"
          variant="contained"
          onClick={OnRemoveStudent}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          loading={loading.value}
        >
          Remove
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
