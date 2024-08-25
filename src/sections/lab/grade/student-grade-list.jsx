'use client';

import { useState } from 'react';

import {
  Box,
  Stack,
  Table,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { Scrollbar } from 'src/components/scrollbar';

import { StudentReportDialog } from './student-report-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', minWidth: 180, width: { xs: 300, lg: 450 } },
  { id: 'question', label: 'Question' },
  { id: 'status', label: 'Status' },
  { id: 'score', label: 'Score' },
  { id: 'actions', label: '', align: 'right' },
];

// ----------------------------------------------------------------------

export default function StudentGradeList({ reports }) {
  const mdUp = useResponsive('up', 'md');

  const reportDialog = useBoolean();

  const [selectedReport, setSelectedReport] = useState({});

  const handleReportDialog = (report) => {
    setSelectedReport(report);
    reportDialog.onTrue();
  };

  if (reports?.length === 0) {
    return <Box>No reports available. Students have not started the lab yet</Box>;
  }

  return (
    <>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align || 'left'}
                    sx={{
                      backgroundColor: 'transparent',
                      minWidth: headCell.minWidth,
                      // eslint-disable-next-line no-nested-ternary
                      width: headCell.width
                        ? mdUp
                          ? headCell.width.lg
                          : headCell.width.xs
                        : 'auto',
                    }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {reports &&
                reports.map((report) => (
                  <TableRow key={report.submission.student.studentId}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          alt={report.submission.student.firstName_EN}
                          sx={{ width: 36, height: 36 }}
                        >
                          {report.submission.student.firstName_EN.charAt(0)}
                        </Avatar>
                        <Box
                          sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}
                        >
                          <Typography sx={{ width: 'fit-content' }}>
                            {report.submission.student.displayName
                              .toLowerCase()
                              .split(' ')
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.disabled"
                            sx={{ mt: 0.5, width: 'fit-content' }}
                          >
                            {report.submission.student.studentId}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography>{report?.question?.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{report?.submitStatus}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {report?.givenScore !== null ? report?.givenScore : '-'}/{report?.maxScore}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={() => handleReportDialog(report)}>
                        See Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <StudentReportDialog
        open={reportDialog.value}
        onClose={reportDialog.onFalse}
        report={selectedReport}
      />
    </>
  );
}
