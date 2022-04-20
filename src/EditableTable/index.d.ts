/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-20 16:19:09
 * @LastEditTime: 2022-04-20 16:25:43
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { EditableTableProps as FieldProps } from 'mui-formfield';

type rowType = {
  [key: string]:any
};

export interface EditableTableProps extends Omit<Omit<Omit<Omit<Omit<FieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, 'options'>, 'rows'>, fieldTransformProps {
  initialValue?: rowType[]
}

declare const FormilyEditableTable: React.FunctionComponent<EditableTableProps>;

export default FormilyEditableTable;
