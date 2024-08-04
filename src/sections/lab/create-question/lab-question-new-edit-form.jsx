import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import {
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
import { createQuestion, createTestCase } from 'src/actions/question';

import { toast } from 'src/components/snackbar';
import { Form } from 'src/components/hook-form';
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

  const defaultValues = useMemo(
    () => ({
      title: currentLabQuestion?.title || '',
      problemStatement: currentLabQuestion?.problemStatement || '',
      testCases: [{ input: '', expectedOutput: '' }],
    }),
    [currentLabQuestion]
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
    try {
      let response;
      if (currentLabQuestion) {
        // const response = await updateLaboratory(params.lid, data);
        // await deleteAllTestCases(params.lid);
        // // eslint-disable-next-line no-restricted-syntax
        // for (const testCase of data.testCases) {
        //   // eslint-disable-next-line no-await-in-loop
        //   await createTestCase(params.lid, testCase);
        // }
      } else {
        response = await createQuestion(params.lid, data);
        // eslint-disable-next-line no-restricted-syntax
        for (const testCase of data.testCases) {
          // eslint-disable-next-line no-await-in-loop
          await createTestCase(response?.data?.questionId, testCase);
        }
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
              <LoadingButton type="submit" variant="contained" size="large" color="primary">
                Create Lab
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
                <Button variant="contained" size="large" color="error">
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
