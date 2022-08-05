/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:12:54
 * @LastEditTime: 2022-04-20 16:34:46
 */
import React from 'react';
import { fieldTransformProps, ToggleButtonGroupProps } from '../types';
import { RadioGroupProps as FieldProps } from 'mui-formfield';

export interface RadioGroupProps extends Omit<FieldProps, 'label' | 'tooltip'|'defaultValue'|'options'>, fieldTransformProps {
  initialValue?: any[],
  /**
   * items
   */
  dataSource?: any[],
}
declare const FormilyRadioGroup: {
  (props: RadioGroupProps): JSX.Element,
  Button: React.FunctionComponent<ToggleButtonGroupProps>,
};

export default FormilyRadioGroup;
