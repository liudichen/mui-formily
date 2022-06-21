/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-06-21 15:22:47
 * @LastEditTime: 2022-06-21 15:25:31
 */
import React from 'react';
import { DatePickerProps as FieldProps } from 'mui-formfield';

import { fieldTransformProps } from '../types';

export interface DateRangePickerProps extends Omit<Omit<Omit<FieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, fieldTransformProps {
  initialValue?: any
}

declare const FormilyDateRangePicker : React.FunctionComponent<DateRangePickerProps>;

export default FormilyDateRangePicker;
