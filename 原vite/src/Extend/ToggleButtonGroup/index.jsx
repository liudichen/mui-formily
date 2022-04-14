/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-12 15:11:12
 * @LastEditTime: 2022-04-12 16:14:28
 */
import PropTypes from 'prop-types';
import { useMemoizedFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { Checkbox, Skeleton, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton as MuiToggleButton } from '@mui/material';

import { FieldWrapper, useMergedState, fetchFieldOptions } from '../common';

const ToggleButtonGroup = (props) => {
  const {
    label, labelPosition, tooltip, required, error, fullWidth,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps,
    options: optionsProp, request, minCount, maxCount, exclusive, buttonFullWidth,
    value: valueProp, onChange: onChangeProp, defaultValue,
    layout, sx, size, color, disabled, itemProps,
    readOnly,
  } = props;
  const [ options, setOptions ] = useState([]);
  const [ optionsValues, setOptionsValues ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ value, onChange ] = useMergedState(defaultValue, { value: valueProp, onChange: onChangeProp, postState: (s) => s || (exclusive ? null : []) });

  const fetchOptions = useMemoizedFn(async () => {
    setLoading(true);
    const newOptions = await fetchFieldOptions(optionsProp, request);
    setOptions(newOptions);
    setOptionsValues(newOptions.map((item) => item.value));
    setLoading(false);
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleChange = useMemoizedFn((e, newValue) => {
    if (readOnly) { return; }
    if (exclusive) {
      if (!(minCount === 1 && !newValue)) {
        onChange(newValue);
      }
    } else {
      if (!((minCount !== undefined && newValue.length < minCount) || (maxCount !== undefined && newValue.length > maxCount))) {
        let newV = [ ...(newValue || []) ];
        newV.sort((a, b) => {
          const indexA = options.findIndex((opt) => opt.value === a);
          const indexB = options.findIndex((opt) => opt.value === b);
          return indexA - indexB;
        });
        newV = newV.filter((item) => optionsValues.includes(item));
        onChange(newV);
      }
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
          <Checkbox />
        </Skeleton>
      ) : (
        <MuiToggleButtonGroup
          orientation={layout}
          disabled={disabled}
          exclusive={exclusive}
          fullWidth={buttonFullWidth}
          size={size}
          color={color}
          value={value}
          onChange={handleChange}
          sx={sx}
        >
          { options.map((item) => (
            <MuiToggleButton
              key={item.value}
              size={item?.size ?? size}
              color={item?.color ?? color}
              disabled={item?.disabled ?? disabled}
              value={item.value}
              {...(itemProps || {})}
            >
              { item.label }
            </MuiToggleButton>
          ))}
        </MuiToggleButtonGroup>
      )}
    </FieldWrapper>
  );
};

ToggleButtonGroup.defaultProps = {
  layout: 'horizontal',
  labelPosition: 'top',
};

ToggleButtonGroup.propTypes = {
  label: PropTypes.node,
  labelPosition: PropTypes.oneOf([ 'top', 'border' ]),
  labelSx: PropTypes.object,
  labelProps: PropTypes.object,
  tooltip: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.node,
  })),
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

  minCount: PropTypes.number,
  maxCount: PropTypes.number,
  exclusive: PropTypes.bool,
  readOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
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
  sx: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])), PropTypes.func, PropTypes.object ]),
  buttonFullWidth: PropTypes.bool,
  itemProps: PropTypes.shape({
    classes: PropTypes.object,
    disableFocusRipple: PropTypes.bool,
    disableRipple: PropTypes.bool,
    onClick: PropTypes.func, // (e,v)=>void
    sx: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])), PropTypes.func, PropTypes.object ]),
  }),
};

export default ToggleButtonGroup;
