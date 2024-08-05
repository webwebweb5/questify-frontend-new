import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Step,
  Fade,
  Card,
  Stack,
  Button,
  Stepper,
  Divider,
  StepLabel,
  Typography,
  CardHeader,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { maxLine } from 'src/theme/styles';
import Loading from 'src/app/(root)/loading';
import {
  createQuestion,
  createTestCase,
  updateQuestion,
  updateTestCase,
  useGetALlTestCases,
} from 'src/actions/question';

import { Form } from 'src/components/hook-form';
import { toast } from 'src/components/snackbar';
import { Markdown } from 'src/components/markdown';

import LabQuestionProblemForm from './lab-question-problem-form';
import LabQuestionSummaryForm from './lab-question-summary-form';
import LabQuestionTestCaseForm from './lab-question-testcase-form';

// ----------------------------------------------------------------------

const steps = ['Question Info', 'Test Case', 'Summary'];

export const NewLabQuestionSchema = zod.object({
  title: zod.string().min(3, { message: 'Title is required!' }),
  problemStatement: zod.string().min(3, { message: 'Problem Statement is required!' }),
  testCases: zod
    .array(
      zod.object({
        id: zod.string().optional(),
        input: zod.string().min(1, { message: 'Input is required!' }),
        expectedOutput: zod.string().min(1, { message: 'Expected output is required!' }),
      })
    )
    .min(1, { message: 'At least one test case is required!' })
    .max(3, { message: 'You can add a maximum of 3 test cases.' }),
});

// ----------------------------------------------------------------------

export default function LabQuestionNewEditForm({ currentLabQuestion }) {
  const params = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const { testCases, testCasesLoading, testCasesError } = useGetALlTestCases(
    currentLabQuestion?.questionId
  );

  const defaultValues = useMemo(
    () => ({
      title: currentLabQuestion?.title || '',
      problemStatement: currentLabQuestion?.problemStatement || '',
      testCases:
        testCases.length > 0
          ? testCases.map((testCase) => ({
              id: testCase.testCaseId || '',
              input: testCase.input || '',
              expectedOutput: testCase.expectedOutput || '',
            }))
          : [{ id: '', input: '', expectedOutput: '' }],
    }),
    [currentLabQuestion, testCases]
  );

  const methods = useForm({
    resolver: zodResolver(NewLabQuestionSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const title = watch('title', defaultValues.title);
  const problemStatement = watch('problemStatement', defaultValues.problemStatement);

  useEffect(() => {
    if (currentLabQuestion) {
      reset(defaultValues);
    }
  }, [currentLabQuestion, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('Form data:', data);
    try {
      let response;
      if (currentLabQuestion) {
        response = await updateQuestion(currentLabQuestion?.questionId, data);

        const updatePromises = data.testCases.map((testCase) => {
          if (testCase.id) {
            return updateTestCase(testCase.id, {
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
            });
          }
          return createTestCase(currentLabQuestion?.questionId, testCase);
        });

        await Promise.all(updatePromises);
      } else {
        response = await createQuestion(params.lid, data);

        const createPromises = data.testCases.map((testCase) =>
          createTestCase(response?.data?.questionId, testCase)
        );

        await Promise.all(createPromises);
      }

      reset();
      toast.success(`${response.message}`);
      console.info('DATA', data);
      router.push(paths.lab.main(params.lid));
    } catch (error) {
      console.error(error);
    }
  });

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (testCasesLoading) return <Loading />;
  if (testCasesError) return <Box>Something wrong</Box>;

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 3,
        }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography sx={{ ...maxLine({ line: 1 }) }} line={1}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <Grid container>
          <Grid item xs={12}>
            <Fade in={activeStep === 2}>
              <div style={{ display: activeStep === 2 ? 'block' : 'none' }}>
                <LabQuestionSummaryForm
                  title={title}
                  problemStatement={problemStatement}
                  setActiveStep={setActiveStep}
                />
              </div>
            </Fade>

            <Stack spacing={1} direction="row" sx={{ my: 3 }}>
              <Button size="large" color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                loading={isSubmitting}
              >
                {!currentLabQuestion ? 'Create Question' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* Conditional rendering based on activeStep */}
            <Fade in={activeStep === 0}>
              <div style={{ display: activeStep === 0 ? 'block' : 'none' }}>
                <LabQuestionProblemForm />
              </div>
            </Fade>
            <Fade in={activeStep === 1}>
              <div style={{ display: activeStep === 1 ? 'block' : 'none' }}>
                <LabQuestionTestCaseForm />
              </div>
            </Fade>

            <Stack spacing={1} direction="row" sx={{ my: 3 }}>
              {activeStep === 0 ? (
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              ) : (
                <Button size="large" color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Button size="large" variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Stack>
          </Grid>
          {/* <Grid item>
            <Divider orientation="vertical" sx={{ borderStyle: 'dashed', mx: 2 }} />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Preview" sx={{ mb: 3 }} />
              <Divider />
              <CardHeader title={title || 'Title'} />
              <Stack spacing={3} sx={{ p: 3 }}>
                <Markdown children={problemStatement || '<p>Problem Statement</p>'} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      )}
    </Form>
  );
}
