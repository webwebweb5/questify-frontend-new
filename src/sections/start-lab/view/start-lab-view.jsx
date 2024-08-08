'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { Box, styled } from '@mui/material';

import { varAlpha } from 'src/theme/styles';
import Loading from 'src/app/(root)/loading';
import { useGetSubmissionsAndTestCases } from 'src/actions/submission';

import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from 'src/components/ui/resizable';

import LabEditor from '../lab-editor';
import LabTestCase from '../lab-testcase';
import LabProblemStatement from '../lab-problem-statement';

// ----------------------------------------------------------------------

const CustomResizablePanel = styled(ResizablePanel)(({ theme }) => ({
  borderRadius: 8,
  bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
  border: `dashed 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

export function StartLabView() {
  const params = useParams();

  const [comparedResults, setComparedResults] = useState([]);

  const [currentTab, setCurrentTab] = useState('one');

  const { submissions, testCases, loading, error } = useGetSubmissionsAndTestCases(params.id);

  if (loading) return <Loading />;
  if (error) return <Box>Something wrong</Box>;

  return (
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
  );
}
