/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 18:17:43
 * @LastEditTime: 2022-04-15 18:37:45
 */
import React from 'react';
import { ButtonProps } from '@mui/material';

interface ResetProps extends ButtonProps {
  initial?: boolean,
  forceClear?: boolean,
  validate?: boolean,
  onResetValidateSuccess?: (payload: any) => void,
  onResetValidateFailed?: (error: Error) => void,
}

declare const Reset: React.FunctionComponent<ResetProps>;

export default Reset;