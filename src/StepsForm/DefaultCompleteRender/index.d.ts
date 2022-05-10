/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:43
 * @LastEditTime: 2022-05-10 10:53:03
 */
import React from 'react';
import { ButtonProps } from '@mui/material';

export interface ResultRenderProps {
  onReset?: () => void,
  /**
   * 表单的所有字段值汇总,不可手动指定，由StepsForm组件自动生成并传递
   */
  values?: object,
  resultTitle?: React.ReactNode,
  resultSubTitle?: React.ReactNode,
  showResultReset?: boolean, // true,
  resultActions?: React.ReactNode | React.ReactNode[],
  resultResetText?: React.ReactNode,
  resultResetProps?: Omit<ButtonProps, 'onClick'> // { variant: 'outlined' }
}

declare const DefaultCompleteRender:React.FunctionComponent<ResultRenderProps>;
