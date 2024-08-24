import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import { assignLaboratory } from 'src/actions/laboratory';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function LabAssignDialog({ open, onClose, laboratoryId }) {
  const loading = useBoolean(false);

  const handleAssignLab = async () => {
    loading.onTrue();
    try {
      const response = await assignLaboratory(laboratoryId);
      toast.success(`${response.message}`);
    } catch (error) {
      console.error(error);
      toast.error(`${error.message}`);
    } finally {
      loading.onFalse();
      onClose();
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Assign Laboratory Confirmation</DialogTitle>

      <DialogContent dividers style={{ position: 'relative' }}>
        <DialogContentText id="alert-dialog-description">
          When you click the Assign button, the lab will be randomly assigned to every student in
          this laboratory.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          color="primary"
          variant="contained"
          startIcon={<Iconify icon="ic:outline-auto-awesome" />}
          onClick={handleAssignLab}
          loading={loading.value}
        >
          Assign
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
