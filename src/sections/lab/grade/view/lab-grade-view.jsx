'use client';

import FileSaver from 'file-saver';
import { useParams } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { LabContent } from 'src/layouts/lab';
import Loading from 'src/app/(root)/loading';
import { exportReport, useGetReportsByLaboratoryId } from 'src/actions/report';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

import StudentGradeList from '../student-grade-list';

// ----------------------------------------------------------------------

export function LabGradeView() {
  const params = useParams();

  const excelDialog = useBoolean();
  const loading = useBoolean(false);

  const handleExportReport = async () => {
    loading.onTrue();
    try {
      const response = await exportReport(params.lid);

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });

      FileSaver.saveAs(blob, `report_lab_${params.lid}.xlsx`);

      toast.success('Export Laboratory report successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Export failed. Please try again later.');
    } finally {
      loading.onFalse();
      excelDialog.onFalse();
    }
  };

  const { reports, reportsLoading, reportsError } = useGetReportsByLaboratoryId(params.lid);

  if (reportsLoading) return <Loading />;

  return (
    <LabContent maxWidth="xl">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h4">Grading</Typography>
            <Label>{reports?.length}</Label>
          </Stack>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={excelDialog.onTrue}
            startIcon={<Iconify icon="ph:microsoft-excel-logo-fill" />}
            disabled={reports?.length === 0}
          >
            Export to Excel
          </Button>
        </Stack>

        <StudentGradeList reports={reports} />
      </Stack>

      <Dialog fullWidth maxWidth="sm" open={excelDialog.value} onClose={excelDialog.onFalse}>
        <DialogTitle>Export Laboratory Reports to Excel</DialogTitle>

        <DialogContent dividers style={{ position: 'relative' }}>
          <DialogContentText id="alert-dialog-description">
            By clicking the Export button, the laboratory reports for all students in this lab will
            be exported as an Excel file. Please ensure that all data is accurate before proceeding.
            This process may take a few moments.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={excelDialog.onFalse}>
            Cancel
          </Button>

          <LoadingButton
            color="primary"
            variant="contained"
            startIcon={<Iconify icon="ph:microsoft-excel-logo-fill" />}
            onClick={handleExportReport}
            loading={loading.value}
          >
            Export
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </LabContent>
  );
}
