/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-21 22:52:24
 * @LastEditTime: 2022-04-05 12:26:56
 */
import PropTypes from 'prop-types';
import { TextField as MuiTextField, InputAdornment, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { FieldWrapper, LabelRender, useMergedState } from '../common';

const TextField = (props) => {
  const {
    label, labelPosition, tooltip, required, error, fullWidth,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps,
    value: valueProp, onChange: onChangeProp, defaultValue,
    showClear, readOnly,
    InputProps, inputProps,
    ...restProps
  } = props;

  const [ value, onChange ] = useMergedState(defaultValue, { value: valueProp, onChange: onChangeProp, postState: (v) => v || '' });

  return (
    <FieldWrapper
      error={error}
      required={required}
      fullWidth={fullWidth}
      fieldSx={fieldSx}
      fieldProps={fieldProps}
      label={label}
      labelSx={labelSx}
      labelProps={labelProps}
      labelPosition={labelPosition}
      tooltip={tooltip}
      helperText={helperText}
      showHelperText={showHelperText}
      helperTextSx={helperTextSx}
      helperTextProps={helperTextProps}
    >
      <MuiTextField
        value={value}
        onChange={(e) => {
          if (!readOnly) {
            onChange(e.target.value || '');
          }
        }}
        label={ labelPosition === 'border' ? (
          <LabelRender
            labelPosition='border'
            tooltip={tooltip}
            required={required}
            label={label}
            labelSx={labelSx}
            labelProps={labelProps}
          />
        ) : undefined}
        inputProps={{
          readOnly,
          ...(inputProps || {}),
        }}
        InputProps={{
          endAdornment: !readOnly && showClear && !!value ? (
            <InputAdornment
              position='end'
              sx={{
                mr: props.multiline ? 1.5 : undefined,
              }}
            >
              <IconButton
                edge='end'
                tabIndex={-1}
                onClick={() => {
                  if (!readOnly)onChange('');
                }}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
          ) : undefined,
          ...(InputProps || {}),
        }}
        {...restProps}
      />
    </FieldWrapper>
  );
};


TextField.defaultProps = {
  size: 'small',
  labelPosition: 'top',
  showClear: true,
};

TextField.propTypes = {
  label: PropTypes.node,
  labelPosition: PropTypes.oneOf([ 'top', 'border' ]),
  labelSx: PropTypes.object,
  labelProps: PropTypes.object,
  tooltip: PropTypes.node,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  fieldSx: PropTypes.object,
  fieldProps: PropTypes.object,
  helperText: PropTypes.node,
  showHelperText: PropTypes.bool,
  helperTextSx: PropTypes.object,
  helperTextProps: PropTypes.object,
  showClear: PropTypes.bool,
  readOnly: PropTypes.bool,

  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  classes: PropTypes.bool,
  color: PropTypes.oneOfType([ PropTypes.oneOf([ 'primary', 'secondary', 'error', 'info', 'success', 'warning' ]), PropTypes.string ]),
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  errro: PropTypes.bool,
  FormHelperTextProps: PropTypes.object,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  inputRef: PropTypes.object,
  margin: PropTypes.oneOf([ 'none', 'dense', 'normal' ]),
  maxRows: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  multiline: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  select: PropTypes.bool,
  SelectProps: PropTypes.object,
  size: PropTypes.oneOfType([ PropTypes.oneOf([ 'medium', 'small' ]), PropTypes.string ]),
  sx: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])), PropTypes.func, PropTypes.object ]),
  type: PropTypes.string,
  value: PropTypes.any,
  variant: PropTypes.oneOf([ 'outlined', 'filled', 'standard' ]),
  hiddenLabel: PropTypes.bool,
  focused: PropTypes.bool,
  component: PropTypes.oneOfType([ PropTypes.element, PropTypes.elementType ]),
};

export default TextField;
