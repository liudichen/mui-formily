/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:20:58
 * @LastEditTime: 2022-04-15 19:23:34
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { TextFieldProps } from 'mui-formfield';

export interface InputProps extends Omit<Omit<Omit<TextFieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, fieldTransformProps {
  initialValue?: string,
}

declare const Input: React.FunctionComponent<InputProps>;

export default Input;
