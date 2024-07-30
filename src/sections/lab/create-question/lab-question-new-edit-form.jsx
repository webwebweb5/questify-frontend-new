import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Card,
  Step,
  Fade,
  Stack,
  Button,
  Divider,
  Stepper,
  StepLabel,
  CardHeader,
  Typography,
} from '@mui/material';

import { maxLine } from 'src/theme/styles';

import { toast } from 'src/components/snackbar';
import { Form } from 'src/components/hook-form';
import { Markdown } from 'src/components/markdown';

import LabQuestionProblemForm from './lab-question-problem-form';

// ----------------------------------------------------------------------

const steps = ['Question Info', 'Test Case', 'Run Code', 'Summary'];

export const NewLabQuestionSchema = zod.object({
  title: zod.string().min(3, { message: 'Title is required!' }),
  problemStatement: zod.string().min(3, { message: 'Problem Statement is required!' }),
});

// ----------------------------------------------------------------------

export default function LabQuestionNewEditForm({ currentLabQuestion }) {
  const params = useParams();
  const [activeStep, setActiveStep] = useState(0);

  const defaultValues = useMemo(
    () => ({
      title: currentLabQuestion?.title || '',
      problemStatement: currentLabQuestion?.problemStatement || '',
    }),
    [currentLabQuestion]
  );

  const methods = useForm({
    resolver: zodResolver(NewLabQuestionSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentLabQuestion) {
      reset(defaultValues);
    }
  }, [currentLabQuestion, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success('Lab Question created');
      console.info('DATA', data);
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
                <div className="">LabSummaryForm</div>
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
        <Grid container>
          <Grid item xs={12} md={6}>
            {/* Conditional rendering based on activeStep */}
            <Fade in={activeStep === 0}>
              <div style={{ display: activeStep === 0 ? 'block' : 'none' }}>
                <LabQuestionProblemForm />
              </div>
            </Fade>
            <Fade in={activeStep === 1}>
              <div style={{ display: activeStep === 1 ? 'block' : 'none' }}>
                {/* <LabTestCaseForm /> */}
                <div className="">LabTestCaseForm</div>
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
          <Grid item>
            <Divider orientation="vertical" sx={{ borderStyle: 'dashed', mx: 2 }} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardHeader title="Type Header" />
              <Stack spacing={3} sx={{ p: 3 }}>
                <Markdown children="<p>Problem Statement</p>" />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      )}
    </Form>
  );
}
