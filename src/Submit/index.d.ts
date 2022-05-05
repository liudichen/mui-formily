/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 18:32:20
 * @LastEditTime: 2022-05-05 15:45:22
 */
import React from 'react';
import { ButtonProps } from '../types';

export interface SubmitProps extends ButtonProps {
  resetOnSuccess?: boolean,
  onSubmit?: (value: object) => void,
  onSubmitSuccess?: (res: any) => void,
  onSubmitFailed?: (error: Error) => void,
  loading?: boolean,
  loadingIndicator?: React.ReactNode,
  loadingPosition?: 'center' | 'start' | 'end',
}

declare const Submit: React.FunctionComponent<SubmitProps>;

export default Submit;
