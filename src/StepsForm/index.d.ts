/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:02
 * @LastEditTime: 2022-05-10 10:51:19
 */
import React from 'react';
import { StepperProps, SxProps, StepIconProps } from '@mui/material';
import { Form } from '@formily/core';

import { ResultRenderProps } from './DefaultCompleteRender';
import { StepFormProps } from './StepForm';

export interface StepsFormProps extends Omit<Omit<StepperProps, 'orientation'>, 'alternativeLabel'>, Omit<ResultRenderProps, 'values'> {
  direction?: 'horizontal'| 'vertical',
  labelPlacement?: 'horizontal'| 'vertical',
  onFinish?: (values: object) => void,

  showStepReset?: boolean,
  stepResetMode?: 'initial' | 'lastCommit',

  rootSx?: SxProps
}

declare const StepsForm: {
  (props: StepsFormProps): JSX.Element,
  StepForm: React.ForwardRefRenderFunction<Form, StepFormProps>
};

export default StepsForm;

export {
  StepFormProps,
  ResultRenderProps,
  StepIconProps,
};
