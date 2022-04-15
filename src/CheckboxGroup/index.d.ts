/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:06:07
 * @LastEditTime: 2022-04-15 19:14:25
 */
import React from 'react';
import { fieldTransformProps, ToggleButtonGroupProps } from '../types';
import { CheckboxGroupProps as FieldProps } from 'mui-formfield';

export interface CheckboxGroupProps extends Omit<Omit<Omit<Omit<FieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, 'options'>, fieldTransformProps {
  initialValue?: any[],
  dataSource?: any[],
}

declare const CheckboxGroup: {
  (props: CheckboxGroupProps): JSX.Element,
  Button: React.FunctionComponent<ToggleButtonGroupProps>,
};

export default CheckboxGroup;
