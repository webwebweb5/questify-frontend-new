'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { Box, styled } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axiosInstance, { endpoints } from 'src/utils/axios';

import { varAlpha } from 'src/theme/styles';
import Loading from 'src/app/(root)/loading';
import { useGetSubmissionsAndTestCases } from 'src/actions/submission';

import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from 'src/components/ui/resizable';

import LabEditor from '../lab-editor';
import LabTestCase from '../lab-testcase';
import LabProblemStatement from '../lab-problem-statement';
import { LabConfirmSubmissionDialog } from '../lab-comfirm-submission-dialog';

// ----------------------------------------------------------------------

const CustomResizablePanel = styled(ResizablePanel)(({ theme }) => ({
  borderRadius: 8,
  bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
  border: `dashed 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

export function StartLabView() {
  const params = useParams();

  const submitDialog = useBoolean();

  const [comparedResults, setComparedResults] = useState([]);

  const [currentTab, setCurrentTab] = useState('one');

  const { submissions, testCases, loading, error } = useGetSubmissionsAndTestCases(params.id);

  useEffect(() => {
    const keyDownHandler = async (e) => {
      if (e.ctrlKey && e.code === 'KeyC') {
        await axiosInstance.post(`${endpoints.logging}?submissionId=${submissions?.submissionId}`, {
          actionName: 'COPY',
        });
        console.log('You pressed Ctrl+C (Copy).');
      } else if (e.ctrlKey && e.code === 'KeyV') {
        await axiosInstance.post(`${endpoints.logging}?submissionId=${submissions?.submissionId}`, {
          actionName: 'PASTE',
        });
        console.log('You pressed Ctrl+V (Paste).');
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [submissions?.submissionId]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        await axiosInstance.post(`${endpoints.logging}?submissionId=${submissions?.submissionId}`, {
          actionName: 'SWITCH_TAB',
        });
        console.log('User has switched away from the tab.');
        // You can perform additional actions here, such as pausing videos, stopping timers, etc.
      } else if (document.visibilityState === 'visible') {
        console.log('User has returned to the tab.');
        // Resume any paused actions here.
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [submissions?.submissionId]);

  if (loading) return <Loading />;
  if (error)
    return (
      <Box
        typography="h4"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        {error.message}
      </Box>
    );

  return (
    <>
      <Box
        sx={{
          height: 'calc(100vh - 74px)',
          p: 2,
          py: 1,
        }}
      >
        <ResizablePanelGroup direction="horizontal" className="gap-2">
          <CustomResizablePanel
            defaultSize={40}
            collapsedSize={0}
            collapsible
            minSize={5}
            className="bg-[#1B212A]"
            // ref={panelRef}
          >
            <LabProblemStatement />
          </CustomResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical" className="gap-2">
              <CustomResizablePanel defaultSize={60} className="bg-[#1B212A]">
                <LabEditor
                  testCases={testCases}
                  setComparedResults={setComparedResults}
                  submissions={submissions}
                  setCurrentTab={setCurrentTab}
                  submitDialog={submitDialog}
                />
              </CustomResizablePanel>
              <ResizableHandle withHandle />
              {/* 292A35 */}
              <CustomResizablePanel defaultSize={40} className="bg-[#1c1d24] !overflow-auto">
                <LabTestCase
                  testCases={testCases}
                  results={comparedResults}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />
              </CustomResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Box>

      <LabConfirmSubmissionDialog
        open={submitDialog.value}
        onClose={submitDialog.onFalse}
        submissionId={submissions?.submissionId}
      />
    </>
  );
}
