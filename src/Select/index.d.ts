/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 18:49:31
 * @LastEditTime: 2022-04-15 19:03:15
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { AutocompleteProps } from 'mui-formfield';

export interface SelectProps extends Omit<Omit<Omit<Omit<AutocompleteProps, 'label'>, 'tooltip'>, 'defaultValue'>, 'options'>, fieldTransformProps {
  initialValue?: any[],
  dataSource?: any[],
}

declare const Select: React.FunctionComponent<SelectProps>;

export default Select;
