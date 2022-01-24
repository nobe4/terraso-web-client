import React from 'react';
import _ from 'lodash/fp';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import {
  FormControlUnstyled,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  Typography,
  Stack,
} from '@mui/material';

import theme from 'theme';

const FormField = ({
  control,
  required,
  disabled,
  id,
  name,
  label,
  info,
  inputProps,
  guideText,
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControlUnstyled style={{ marginBottom: theme.spacing(3) }}>
          <Stack
            component={InputLabel}
            direction="row"
            spacing={1}
            disabled={disabled}
            error={!!fieldState.error}
            htmlFor={id}
          >
            <Typography
              sx={{
                textTransform: 'uppercase',
              }}
            >
              {t(label)}
            </Typography>
            {required && <Typography>({t('form.required_label')})</Typography>}
          </Stack>
          {guideText ? (
            field.value
          ) : (
            <OutlinedInput
              id={id}
              disabled={disabled}
              error={!!fieldState.error}
              aria-describedby={`${id}-helper-text`}
              sx={theme =>
                _.mergeWith(
                  null,
                  {
                    width: '100%',
                  },
                  theme.components.MuiOutlinedInput.defaultProps.sx
                )
              }
              {...inputProps}
              {...field}
            />
          )}
          {info && (
            <FormHelperText id={`${id}-helper-text`}>{t(info)}</FormHelperText>
          )}
          {fieldState.error && (
            <FormHelperText error id={`${id}-helper-text`}>
              {t(
                _.getOr(
                  'form.validation_field_invalid',
                  'error.message.key',
                  fieldState
                ),
                _.getOr({}, 'error.message.params', fieldState)
              )}
            </FormHelperText>
          )}
        </FormControlUnstyled>
      )}
    />
  );
};

export default FormField;
