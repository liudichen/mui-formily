/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-16 17:20:24
 * @LastEditTime: 2022-05-16 17:22:54
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { DocumentContentProps as FieldProps } from 'mui-formfield';

type rowType = {
  [key: string]:any
};

export interface DocumentContentProps extends Omit<Omit<Omit<FieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, fieldTransformProps {
  initialValue?: rowType[]
}

declare const FormilyDocumentContent: React.FunctionComponent<DocumentContentProps>;

export default FormilyDocumentContent;
