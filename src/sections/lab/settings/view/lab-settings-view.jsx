'use client';

import { useCallback } from 'react';

import { Card, Stack, Button, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import { LabContent } from 'src/layouts/lab';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

import { SettingsItem } from '../settings-item';
import { LabDeleteForm } from '../lab-delete-form';

// ----------------------------------------------------------------------

export function LabSettingsView() {
  const deleteForm = useBoolean();

  const { copy } = useCopyToClipboard();

  const onCopy = useCallback(
    (text) => {
      if (text) {
        toast.success(`Copied: ${text}`);
        copy(text);
      }
    },
    [copy]
  );

  return (
    <>
      <LabContent maxWidth="xl">
        <Typography variant="h4"> Settings </Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Card>
            <Stack spacing={2.5} sx={{ p: 3 }}>
              <SettingsItem
                title="Copy invitation code"
                sub="Give invitation to student to let them join this lab."
                label={
                  <Label color="success" sx={{ ml: 1 }}>
                    Essential
                  </Label>
                }
                action={
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="carbon:copy" />}
                    onClick={() => onCopy('123456')}
                    sx={{ width: 'fit-content', alignSelf: 'center' }}
                  >
                    123456
                  </Button>
                }
              />
            </Stack>
          </Card>

          <Card>
            <Stack spacing={2.5} sx={{ p: 3 }}>
              <SettingsItem
                title="Delete this laboratory"
                sub="Once you delete a repository, there is no going back. Please be certain."
                label={
                  <Label color="error" sx={{ ml: 1 }}>
                    Danger
                  </Label>
                }
                action={
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    sx={{ width: 'fit-content', alignSelf: 'center' }}
                    onClick={deleteForm.onTrue}
                  >
                    Delete
                  </Button>
                }
              />
            </Stack>
          </Card>
        </Stack>
      </LabContent>

      <LabDeleteForm open={deleteForm.value} onClose={deleteForm.onFalse} />
    </>
  );
}
