/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:20:58
 * @LastEditTime: 2022-08-05 20:53:01
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { TextFieldProps } from 'mui-formfield';

export interface InputProps extends Omit<TextFieldProps, 'label'|'tooltip'| 'defaultValue'>, fieldTransformProps {
  initialValue?: string,
}

declare const FormilyInput: React.FunctionComponent<InputProps>;

export default FormilyInput;
