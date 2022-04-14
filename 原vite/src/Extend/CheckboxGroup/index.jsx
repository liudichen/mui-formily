/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-12 14:06:50
 * @LastEditTime: 2022-04-12 16:14:44
 */
import PropTypes from 'prop-types';
import { useMemoizedFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Skeleton } from '@mui/material';

import { FieldWrapper, useMergedState, fetchFieldOptions } from '../common';
import ToggleButtonGroup from '../ToggleButtonGroup';

const CheckboxGroup = (props) => {
  const {
    label, labelPosition, tooltip, required, error, fullWidth,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps,
    options: optionsProp, request, minCount, maxCount,
    value: valueProp, onChange: onChangeProp, defaultValue,
    layout, sx, size, color, disabled, itemProps,
    readOnly,
  } = props;
  const [ options, setOptions ] = useState([]);
  const [ optionsValues, setOptionsValues ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ value, onChange ] = useMergedState(defaultValue, { value: valueProp, onChange: onChangeProp, postState: (s) => s || [] });

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

  const handleChange = useMemoizedFn((e, optionValue) => {
    if (readOnly) { return; }
    const checked = e.target.checked;
    let newValue = [ ...(value || []) ];
    const optionIndex = newValue.indexOf(optionValue);
    if (optionIndex === -1) {
      if (checked) {
        newValue.push(optionValue);
      }
    } else if (!checked) {
      newValue.splice(optionIndex, 1);
    }
    newValue.sort((a, b) => {
      const indexA = options.findIndex((opt) => opt.value === a);
      const indexB = options.findIndex((opt) => opt.value === b);
      return indexA - indexB;
    });
    newValue = newValue.filter((item) => optionsValues.includes(item));
    let shouldUpdate = true;
    if ((minCount !== undefined && newValue.length < minCount) || (maxCount !== undefined && newValue.length > maxCount)) {
      shouldUpdate = false;
    }
    if (shouldUpdate) {
      onChange(newValue);
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
        <FormGroup
          row={layout === 'horizontal'}
          sx={sx}
        >
          { options.map((item) => (
            <FormControlLabel
              key={item.value}
              label={item.label ?? ''}
              control={
                <Checkbox
                  size={item?.size ?? size}
                  color={item?.color ?? color}
                  disabled={item?.disabled ?? disabled}
                  {...(itemProps || {})}
                  checked={value?.includes(item.value)}
                  onChange={(e) => handleChange(e, item.value)}
                />
              }
            />
          ))}
        </FormGroup>
      )}
    </FieldWrapper>
  );
};

CheckboxGroup.defaultProps = {
  layout: 'horizontal',
  labelPosition: 'top',
};

CheckboxGroup.propTypes = {
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
  value: PropTypes.array,
  defaultValue: PropTypes.array,

  minCount: PropTypes.number,
  maxCount: PropTypes.number,
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
  itemProps: PropTypes.shape({
    checkedIcon: PropTypes.node,
    classes: PropTypes.object,
    disableRipple: PropTypes.bool,
    icon: PropTypes.node,
    indeterminate: PropTypes.bool,
    indeterminateIcon: PropTypes.node,
    inputProps: PropTypes.object,
  }),
};
CheckboxGroup.Button = ToggleButtonGroup;
export default CheckboxGroup;
