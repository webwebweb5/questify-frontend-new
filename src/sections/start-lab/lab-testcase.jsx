import { useState, useCallback } from 'react';

import { Tab, Box, Tabs, Stack, styled, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'one', label: 'Test Case' },
  { value: 'two', label: 'Test Case Result' },
];

// Custom Tab styling
const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: { minWidth: 0 },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': { color: '#fff', opacity: 1 },
  '&.Mui-selected': {
    color: '#fff',
    px: 2,
    backgroundColor: theme.palette.grey[500],
    borderRadius: theme.shape.borderRadius,
  },
  '&.MuiTabs-indicator': { display: 'none' },
}));

// Custom Tabs styling
const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    margin: '8px 0px',
    marginRight: '8px',
    borderRadius: '6px',
    lineHeight: 0,
    minHeight: 'unset',
    padding: '8px 12px',
    color: 'grey',
    fontWeight: 700,
    transition: 'all 0.3s ease',
  },
  '& .MuiTab-root.Mui-selected': {
    backgroundColor: '#ffffff',
    fontWeight: 700,
    color: 'black',
    transition: 'all 0.3s ease',
  },
  '& .MuiTabs-indicator': { display: 'none' },
}));

// ----------------------------------------------------------------------

export default function LabTestCase({ testCases, results, currentTab, setCurrentTab }) {
  const [currentTestCaseTab, setCurrentTestCaseTab] = useState(0);

  const handleChangeTab = useCallback(
    (event, newValue) => {
      setCurrentTab(newValue);
    },
    [setCurrentTab]
  );

  const handleChangeTestCaseTab = useCallback((event, newValue) => {
    setCurrentTestCaseTab(newValue);
  }, []);

  return (
    <>
      <Stack sx={{ px: 2, pb: 1, mb: 1, bgcolor: '#1B212A' }}>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Stack>

      {currentTab === 'one' ? (
        <>
          <Stack sx={{ px: 2, pb: 1 }}>
            <CustomTabs value={currentTestCaseTab} onChange={handleChangeTestCaseTab}>
              {testCases.map((_, index) => (
                <CustomTab
                  key={index}
                  value={index}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="tabler:test-pipe" /> Case {index + 1}
                    </Stack>
                  }
                />
              ))}
            </CustomTabs>
          </Stack>
          <Stack sx={{ px: 2, pb: 1 }}>
            {testCases.map((testCase, index) => (
              <Box key={testCase.testCaseId}>
                {currentTestCaseTab === index && (
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Input =</Typography>
                    <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#1B212A' }}>{testCase.input}</Box>
                    <Typography variant="subtitle2">Expected Output =</Typography>
                    <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#1B212A' }}>
                      {testCase.expectedOutput}
                    </Box>
                  </Stack>
                )}
              </Box>
            ))}
          </Stack>
        </>
      ) : currentTab === 'two' && results.length !== 0 ? (
        <Stack sx={{ px: 2, pb: 2 }}>
          <Typography
            variant="h4"
            color={results[currentTestCaseTab].result === 'PASS' ? 'success.main' : 'error.main'}
            sx={{ py: 1 }}
          >
            {results[currentTestCaseTab].result === 'PASS' ? 'Accepted' : 'Failed'}
          </Typography>
          <Stack>
            <CustomTabs value={currentTestCaseTab} onChange={handleChangeTestCaseTab}>
              {results.map((result, index) => (
                <CustomTab
                  key={result.testCaseId}
                  value={index}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify
                        icon={
                          result.result === 'PASS' ? 'line-md:check-all' : 'line-md:close-small'
                        }
                        sx={{ color: result.result === 'PASS' ? 'primary.main' : 'error.main' }}
                      />
                      Case {index + 1}
                    </Stack>
                  }
                />
              ))}
            </CustomTabs>
          </Stack>
          <Stack>
            <Box>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Input =</Typography>
                <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#1B212A' }}>
                  {results[currentTestCaseTab]?.testCase?.input}
                </Box>
                <Typography variant="subtitle2">Expected Output =</Typography>
                <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#1B212A' }}>
                  {results[currentTestCaseTab]?.testCase?.expectedOutput}
                </Box>
                <Typography variant="subtitle2">Output =</Typography>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: '#1B212A',
                    color:
                      results[currentTestCaseTab].result === 'PASS' ? 'success.main' : 'error.main',
                  }}
                >
                  {results[currentTestCaseTab]?.actualOutput}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2">You must run your code first</Typography>
        </Stack>
      )}
    </>
  );
}
