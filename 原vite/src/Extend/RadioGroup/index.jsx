/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-12 16:29:23
 * @LastEditTime: 2022-04-12 16:57:24
 */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
import { FormControlLabel, Radio, RadioGroup as MuiRadioGroup, Skeleton } from '@mui/material';

import { FieldWrapper, useMergedState, fetchFieldOptions, sx } from '../common';
import ToggleButtonGroup from '../ToggleButtonGroup';

const RadioGroup = (props) => {
  const {
    label, labelPosition, tooltip, required, error, fullWidth,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps,
    options: optionsProp, request,
    value: valueProp, onChange: onChangeProp, defaultValue,
    layout, sx, size, color, disabled, itemProps,
    readOnly,
  } = props;
  const [ options, setOptions ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ value, onChange ] = useMergedState(defaultValue, { value: valueProp, onChange: onChangeProp });

  const fetchOptions = useMemoizedFn(async () => {
    setLoading(true);
    const newOptions = await fetchFieldOptions(optionsProp, request);
    setOptions(newOptions);
    setLoading(false);
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleChange = useMemoizedFn((e) => {
    if (!readOnly) {
      onChange(e.target.value);
    }
  });

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
      { loading ? (
        <Skeleton
          variant='rectangular'
          animation='wave'
          width={'100%'}
        >
          <Radio />
        </Skeleton>
      ) : (
        <MuiRadioGroup
          row={layout === 'horizontal'}
          value={value}
          onChange={handleChange}
          sx={sx}
        >
          { options.map((item) => (
            <FormControlLabel
              key={item.value}
              label={item.label ?? ''}
              value={item.value}
              control={
                <Radio
                  size={item?.size ?? size}
                  color={item?.color ?? color}
                  disabled={item?.disabled ?? disabled}
                  {...(itemProps || {})}
                />
              }
            />
          ))}
        </MuiRadioGroup>
      )}
    </FieldWrapper>
  );
};

RadioGroup.defaultProps = {
  labelPosition: 'top',
  layout: 'horizontal',
};

RadioGroup.propTypes = {
  label: PropTypes.node,
  labelPosition: PropTypes.oneOf([ 'top', 'border' ]),
  labelSx: PropTypes.object,
  labelProps: PropTypes.object,
  tooltip: PropTypes.node,
  options: PropTypes.array,
  request: PropTypes.func,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  fieldSx: PropTypes.object,
  fieldProps: PropTypes.object,
  helperText: PropTypes.node,
  showHelperText: PropTypes.bool,
  helperTextSx: PropTypes.object,
  helperTextProps: PropTypes.object,
  value: PropTypes.any,
  defaultValue: PropTypes.any,

  readOnly: PropTypes.bool,
  layout: PropTypes.oneOf([ 'horizontal', 'vertical' ]),
  disabled: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.oneOf([ 'standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning' ]),
    PropTypes.string,
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf([ 'medium', 'small', 'large' ]),
    PropTypes.string,
  ]),
  sx,
  itemProps: PropTypes.shape({
    checkedIcon: PropTypes.node,
    classes: PropTypes.object,
    disableRipple: PropTypes.bool,
    icon: PropTypes.node,
    inputProps: PropTypes.object,
    sx,
  }),
};

RadioGroup.Button = (props) => <ToggleButtonGroup {...{ minCount: 1, ...(props || {}), exclusive: true }} />;

export default RadioGroup;
