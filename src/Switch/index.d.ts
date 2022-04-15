/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:27:13
 * @LastEditTime: 2022-04-15 19:29:20
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { SwitchProps as FieldProps } from 'mui-formfield';

export interface SwitchProps extends Omit<Omit<Omit<FieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, fieldTransformProps {
  initialValue?: any,
}

declare const Switch: React.FunctionComponent<SwitchProps>;

export default Switch;
