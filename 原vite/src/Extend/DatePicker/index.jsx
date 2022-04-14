/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-23 08:57:32
 * @LastEditTime: 2022-04-05 12:29:57
 */
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import MuiDatePicker from '@mui/lab/DatePicker';

import { FieldWrapper, LabelRender, useMergedState } from '../common';

const DatePicker = (props) => {
  const {
    label, labelPosition, tooltip, required, error, fullWidth,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps,
    value: valueProp, onChange: onChangeProp, defaultValue,
    showClear,
    inputLabel, size, placeholder, inputProps,
    ...restProps
  } = props;
  const [ value, onChange ] = useMergedState(defaultValue || null, { value: valueProp, onChange: onChangeProp, postState: (s) => s || null });
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
      <MuiDatePicker
        value={value}
        label={inputLabel ?? (labelPosition === 'border' && !!label ? (
          <LabelRender
            labelPosition='border'
            tooltip={tooltip}
            required={required}
            label={label}
            labelSx={labelSx}
            labelProps={labelProps}
          />
        ) : undefined)}
        onChange={onChange}
        clearable={showClear}
        inputProps={{
          placeholder,
          ...(inputProps || {}),
        }}
        renderInput={(params) => (
          <TextField
            size={size}
            {...params}
          />
        )}
        {...restProps}
      />
    </FieldWrapper>
  );
};

DatePicker.defaultProps = {
  mask: '____/__/__',
  size: 'small',
  labelPosition: 'top',
  placeholder: 'yyyy/mm/dd',
  showClear: true,
  cancelText: '取消',
  clearText: '清除',
  okText: '确定',
  todayText: '今天',
  toolbarTitle: '选择日期',
};

DatePicker.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.node,
  labelPosition: PropTypes.oneOf([ 'top', 'border' ]),
  labelSx: PropTypes.object,
  labelProps: PropTypes.object,
  tooltip: PropTypes.node,
  options: PropTypes.array,
  request: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.bool,
  fieldSx: PropTypes.object,
  fieldProps: PropTypes.object,
  helperText: PropTypes.node,
  showHelperText: PropTypes.bool,
  helperTextSx: PropTypes.object,
  helperTextProps: PropTypes.object,
  showClear: PropTypes.bool,
  inputLabel: PropTypes.node,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOfType([ PropTypes.oneOf([ 'medium', 'small' ]), PropTypes.string ]),
  placeholder: PropTypes.string,

  renderInput: PropTypes.func,
  acceptRegex: PropTypes.any, //	/\dap/gi
  allowSameDateSelection: PropTypes.bool,
  cancelText: PropTypes.node,
  className: PropTypes.string,
  clearText: PropTypes.node,
  components: PropTypes.shape({
    LeftArrowButton: PropTypes.elementType,
    LeftArrowIcon: PropTypes.elementType,
    OpenPickerIcon: PropTypes.elementType,
    RightArrowButton: PropTypes.elementType,
    RightArrowIcon: PropTypes.elementType,
    SwitchViewButton: PropTypes.elementType,
    SwitchViewIcon: PropTypes.elementType,
  }), // {}
  componentsProps: PropTypes.shape({
    leftArrowButton: PropTypes.object,
    rightArrowButton: PropTypes.object,
    switchViewButton: PropTypes.object,
  }), // {}
  defaultCalendarMonth: PropTypes.any,
  desktopModeMediaQuery: PropTypes.string, //	'@media (pointer: fine)'
  DialogProps: PropTypes.object,
  disableCloseOnSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  disableHighlightToday: PropTypes.bool,
  disableMaskedInput: PropTypes.bool,
  disableOpenPicker: PropTypes.bool,
  InputAdornmentProps: PropTypes.object,
  inputProps: PropTypes.object,
  inputFormat: PropTypes.string,
  inputRef: PropTypes.oneOfType([ PropTypes.func, PropTypes.shape({ current: PropTypes.object }) ]),
  leftArrowText: PropTypes.string,
  loading: PropTypes.bool,
  mask: PropTypes.string, //	'____/__/__'
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  okText: PropTypes.node, // 'OK'
  onAccept: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  onMonthChange: PropTypes.func,
  onOpen: PropTypes.func,
  onViewChange: PropTypes.func,
  onYearChange: PropTypes.func,
  open: PropTypes.bool,
  OpenPickerButtonProps: PropTypes.object,
  openTo: PropTypes.oneOf([ 'day', 'month', 'year' ]),
  orientation: PropTypes.oneOf([ 'landscape', 'portrait' ]),
  PaperProps: PropTypes.object,
  PopperProps: PropTypes.object,
  readOnly: PropTypes.bool,
  reduceAnimations: PropTypes.bool,
  renderDay: PropTypes.func,
  renderLoading: PropTypes.func,
  rifmFormatter: PropTypes.func,
  rightArrowButtonText: PropTypes.string,
  shouldDisableDate: PropTypes.func,
  shouldDisableYear: PropTypes.func,
  showDaysOutsideCurrentMonth: PropTypes.bool,
  showTodayButton: PropTypes.bool,
  showToolbar: PropTypes.bool,
  todayText: PropTypes.node,
  ToolbarComponent: PropTypes.elementType,
  toolbarFormat: PropTypes.string,
  toolbarPlaceholder: PropTypes.node, // '-'
  toolbarTitle: PropTypes.node, // 'Select date range'
  TransitionComponent: PropTypes.elementType,
  views: PropTypes.arrayOf(PropTypes.oneOf([ 'day', 'month', 'year' ])),
};

export default DatePicker;
