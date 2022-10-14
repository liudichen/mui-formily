/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-10-14 21:59:06
 * @LastEditTime: 2022-10-14 22:08:14
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { DocumentContentProps as FieldProps } from 'mui-formfield';

interface DocumentContentProps extends Omit<FieldProps, 'label'|'tooltip'|'defaultValue'|'options'| 'rows'>, fieldTransformProps {
  initialValue?: {
    id: number | string,
    type: string,
  }[]
}

declare const FormilyDocumentContent: React.FC<DocumentContentProps>;

export default FormilyDocumentContent;
