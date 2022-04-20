import React from 'react';
import { fieldTransformProps } from '../types';
import { DatePickerProps as FieldProps } from 'mui-formfield';

export interface DatePickerProps extends Omit<Omit<Omit<FieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, fieldTransformProps {
  initialValue?: any,
}

declare const FormilyDatePicker: React.FunctionComponent<DatePickerProps>;

export default FormilyDatePicker;
