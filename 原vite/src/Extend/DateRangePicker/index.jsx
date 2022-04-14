/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-22 20:17:14
 * @LastEditTime: 2022-04-05 12:30:29
 */
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';
import MuiDateRangePicker from '@mui/lab/DateRangePicker';

import { FieldWrapper, useMergedState } from '../common';

const DateRangePicker = (props) => {
  const {
    label, labelPosition, tooltip, required, error, fullWidth,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps,
    value: valueProp, onChange: onChangeProp, defaultValue,
    showClear, size,
    ...restProps
  } = props;
  const [ value, onChange ] = useMergedState(defaultValue || [ null, null ], { value: valueProp, onChange: onChangeProp, postState: (s) => s || [ null, null ] });

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
      <MuiDateRangePicker
        value={value}
        onChange={onChange}
        clearable={showClear}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} size={size}/>
            <Box>{'-'}</Box>
            <TextField {...endProps} size={size}/>
          </>
        )}
        {...restProps}
      />
    </FieldWrapper>
  );
};

DateRangePicker.defaultProps = {
  size: 'small',
  labelPosition: 'top',
  showClear: true,
};

DateRangePicker.propTypes = {
  value: PropTypes.array,
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

  renderInput: PropTypes.func,
  acceptRegex: PropTypes.any, // 	/\dap/gi
  allowSameDateSelection: PropTypes.bool,
  calendars: PropTypes.oneOf([ 1, 2, 3 ]), // 2
  cancelText: PropTypes.node, // 'Cancel'
  className: PropTypes.string,
  clearText: PropTypes.node, // 'Clear'
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
  disableAutoMonthSwitching: PropTypes.bool,
  disableCloseOnSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  disableHighlightToday: PropTypes.bool,
  disableMaskedInput: PropTypes.bool,
  disableOpenPicker: PropTypes.bool,
  endText: PropTypes.node,
  InputAdornmentProps: PropTypes.object,
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
  open: PropTypes.bool,
  OpenPickerButtonProps: PropTypes.object,
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
  startText: PropTypes.node, //	'Start'
  todayText: PropTypes.node, // 'Today'
  ToolbarComponent: PropTypes.elementType,
  toolbarFormat: PropTypes.string,
  toolbarPlaceholder: PropTypes.node, // '-'
  toolbarTitle: PropTypes.node, // 'Select date range'
  TransitionComponent: PropTypes.elementType,
};

export default DateRangePicker;
