/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-08-05 20:29:17
 * @LastEditTime: 2022-08-05 20:46:40
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { KeyWordsProps as FieldProps } from 'mui-formfield';

export interface KeyWordsProps extends fieldTransformProps, Omit<FieldProps, 'label'|'tooltip'|'defaultValue'> {
  initialValue?: string[],
}

declare const FormilyKeyWords: React.FunctionComponent<KeyWordsProps>;

export default FormilyKeyWords;
