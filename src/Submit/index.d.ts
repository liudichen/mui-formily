/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 18:32:20
 * @LastEditTime: 2022-04-15 18:38:58
 */
import React from 'react';
import { LoadingButtonProps } from '@mui/lab';

interface SubmitProps extends LoadingButtonProps {
  onSubmit?: (value: object) => void,
  onSubmitSuccess?: (res: any) => void,
  onSubmitFailed?: (error: Error) => void,
}

declare const Submit: React.FunctionComponent<SubmitProps>;

export default Submit;
