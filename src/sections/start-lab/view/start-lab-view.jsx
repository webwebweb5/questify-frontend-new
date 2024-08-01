'use client';

import { Box, styled, useTheme } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

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
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        p: 2,
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
              <LabEditor />
            </CustomResizablePanel>
            <ResizableHandle withHandle />
            {/* 292A35 */}
            <CustomResizablePanel defaultSize={40} className="bg-[#1c1d24] !overflow-auto">
              <LabTestCase />
            </CustomResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Box>
  );
}
