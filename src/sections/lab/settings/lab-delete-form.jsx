import { mutate } from 'swr';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints } from 'src/utils/axios';

import { deleteLaboratory } from 'src/actions/laboratory';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function LabDeleteForm({ open, onClose, labId }) {
  const loading = useBoolean(false);

  const router = useRouter();

  const OnDeleteLaboratory = async () => {
    loading.onTrue();
    try {
      const response = await deleteLaboratory(labId);
      toast.success(`${response.message}`);
      mutate(endpoints.laboratory.list);
      onClose();
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
    }
    loading.onFalse();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>

      <DialogContent dividers style={{ position: 'relative' }}>
        <DialogContentText id="alert-dialog-description">
          Confirm to Delete Laboratory: {labId}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          color="error"
          variant="contained"
          onClick={OnDeleteLaboratory}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          loading={loading.value}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
