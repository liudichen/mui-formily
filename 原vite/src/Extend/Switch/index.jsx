/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-23 13:19:27
 * @LastEditTime: 2022-04-05 12:27:58
 */
import PropTypes from 'prop-types';
import { Switch as MuiSwith, Stack } from '@mui/material';

import { FieldWrapper, useMergedState } from '../common';

const Switch = (props) => {
  const {
    label, tooltip, required, error, fullWidth,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps,
    value: valueProp, onChange: onChangeProp, defaultValue,
    readOnly,
    unCheckedChildren, checkedChildren, spacing,
    edge, unCheckedIcon,
    ...restProps
  } = props;
  const [ value, onChange ] = useMergedState(defaultValue, { value: valueProp, onChange: onChangeProp, postState: (s) => !!s });
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
      tooltip={tooltip}
      helperText={helperText}
      showHelperText={showHelperText}
      helperTextSx={helperTextSx}
      helperTextProps={helperTextProps}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={spacing}
      >
        { !!unCheckedChildren && (
          <span style={{ color: error ? 'red' : undefined }}>
            { unCheckedChildren }
          </span>
        )}
        <MuiSwith
          checked={value}
          onChange={(e) => {
            if (!readOnly) {
              onChange(e.target.checked);
            }
          }}
          edge={edge ?? (!unCheckedChildren ? 'start' : false)}
          {...(unCheckedIcon ? { icon: unCheckedIcon } : {})}
          {...restProps}
        />
        { !!checkedChildren && (
          <span style={{ color: error ? 'red' : undefined }}>
            { checkedChildren }
          </span>
        )}
      </Stack>
    </FieldWrapper>
  );
};

Switch.defaultProps = {
  spacing: 1,
};

Switch.propTypes = {
  value: PropTypes.any,
  label: PropTypes.node,
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
  readOnly: PropTypes.bool,
  spacing: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  fullWidth: PropTypes.bool,
  unCheckedChildren: PropTypes.node,
  checkedChildren: PropTypes.node,

  checkedIcon: PropTypes.node,
  unCheckedIcon: PropTypes.node,
  classes: PropTypes.object,
  color: PropTypes.oneOfType([
    PropTypes.oneOf([ 'primary', 'default', 'secondary', 'error', 'info', 'success', 'warning' ]),
    PropTypes.string,
  ]), // 'primary'
  disabled: PropTypes.bool,
  disableRipple: PropTypes.bool,
  edge: PropTypes.oneOf([ 'end', 'start', false ]), // false
  id: PropTypes.string,
  inputProps: PropTypes.object,
  inputRef: PropTypes.object,
  size: PropTypes.oneOfType([
    PropTypes.oneOf([ 'medium', 'small' ]),
    PropTypes.string,
  ]), // 'medium'
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.object, PropTypes.func, PropTypes.bool ])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Switch;
