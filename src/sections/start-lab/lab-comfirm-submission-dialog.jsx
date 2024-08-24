import { useParams, useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { submitSubmission } from 'src/actions/submission';

import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export function LabConfirmSubmissionDialog({ open, onClose, submissionId }) {
  const loading = useBoolean(false);

  const params = useParams();

  const router = useRouter();

  const handleSubmitLab = async () => {
    loading.onTrue();
    try {
      const response = await submitSubmission(submissionId);
      toast.success(`${response.message}`);
      router.push(paths.submittedLab(params.id));
    } catch (error) {
      console.error(error);
      toast.success(`${error.message}`);
    } finally {
      loading.onFalse();
      onClose();
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Submission Confirmation</DialogTitle>

      <DialogContent dividers style={{ position: 'relative' }}>
        <DialogContentText id="alert-dialog-description">
          Please review and test your code before submitting the laboratory assignment.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton
          color="primary"
          variant="contained"
          onClick={handleSubmitLab}
          loading={loading.value}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
