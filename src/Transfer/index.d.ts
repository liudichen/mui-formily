/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-18 18:39:25
 * @LastEditTime: 2022-04-18 18:45:40
 */
import React from 'react';
import { TransferProps as FieldProps } from 'mui-formfield';

import { fieldTransformProps } from '../types';

type Item = string | number;
interface Option {
  vallue: Item,
  label?: React.ReactNode
}

export interface TransferProps extends Omit<Omit<Omit<Omit<FieldProps, 'label'>, 'tooltip'>, 'defaultValue'>, 'options'>, fieldTransformProps {
  initialValue?: Item[],
  dataSource?: Option[] | Item[],
}

declare const Transfer: React.FunctionComponent<TransferProps>;

export default Transfer;
