/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:02
 * @LastEditTime: 2022-05-18 15:22:18
 */
import React from 'react';
import { IFormProps } from '@formily/core';
import { StepperProps, StepIconProps } from '@mui/material';

import { ResultRenderProps } from './DefaultCompleteRender';
import { StepFormProps } from './StepForm';

export interface StepsFormProps extends StepperProps, Omit<Omit<Omit<ResultRenderProps, 'values'>, 'form'>, 'handleStepChange'> {
  direction?: 'horizontal'| 'vertical',
  labelPlacement?: 'horizontal'| 'vertical',
  onFinish?: (values?: object, allValues?: object) => void,
  createFormOptions?: IFormProps,

  ResultRender?: React.Component<ResultRenderProps> | React.FunctionComponent<ResultRenderProps> | React.ElementType,
}

declare const StepsForm: {
  (props: StepsFormProps): JSX.Element,
  StepForm: React.FunctionComponent<StepFormProps>
};

export default StepsForm;

export {
  StepFormProps,
  ResultRenderProps,
  StepIconProps,
};
