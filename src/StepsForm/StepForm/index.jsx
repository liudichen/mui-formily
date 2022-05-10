/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:49
 * @LastEditTime: 2022-05-10 17:25:51
 */
import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { Button, Grid } from '@mui/material';
import { Space } from 'mui-component';

import Submit from '../../Submit';
import { createFormOptions } from '../../propTypes';
import { useMemoizedFn } from 'ahooks';

const StepForm = forwardRef((props, ref) => {
  const { stepIndex, stepsCount, onSubmit, onPrevious, submitProps, nextText, previousText, createFormOptions, children, initialValues, showStepReset, stepResetMode, resetProps, resetText } = props;
  const form = useMemo(() => createForm(createFormOptions), []);
  useImperativeHandle(ref, () => form, [ form ]);
  const handleReset = useMemoizedFn(() => {
    if (stepResetMode === 'initial') {
      form?.setInitialValues(initialValues || {}, 'overwrite');
      form?.reset('*');
    } else if (stepResetMode === 'lastCommit') {
      form?.reset?.('*');
    }
  });
  return (
    <>
      <FormProvider form={form}>
        { children }
        <Grid container>
          <Space>
            { showStepReset && (
              <Button
                { ...(resetProps || {})}
                onClick={handleReset}
              >
                { resetText }
              </Button>
            )}
            { !!stepIndex && (
              <Button
                onClick={onPrevious}
              >
                {previousText}
              </Button>
            )}
            <Submit
              {...(submitProps || {})}
              onSubmit={onSubmit}
            >
              { stepIndex + 1 === stepsCount ? nextText?.[1] : nextText?.[0] }
            </Submit>
          </Space>
        </Grid>
      </FormProvider>
    </>
  );
});

StepForm.defaultProps = {
  createFormOptions: { validateFirst: true },
  submitProps: { size: 'small' },
  nextText: [ '下一步', '提交' ],
  previousText: '上一步',
  resetText: '重置',
  resetProps: { variant: 'outlined', color: 'secondary' },
};

StepForm.propTypes = {
  // -------------- 1 -------------
  // 此部分props是给stepsForm拦截并使用的
  title: PropTypes.node,
  subTitle: PropTypes.node,
  icon: PropTypes.oneOfType([ PropTypes.func, PropTypes.element, PropTypes.object ]),
  // -------------- 1 -------------

  // -------------- 2 -------------
  // 此部分props是由StepsForm组件自动生成并传递的，不要手动传递，可以通过props获取使用
  current: PropTypes.number, // 当前激活的stepForm的index(从0开始)
  stepIndex: PropTypes.number, // 此步骤的index编号(从0开始)
  stepsCount: PropTypes.number, // StepForm的步骤总数
  previousValues: PropTypes.object, // 此步骤之前所有步骤的values汇总
  // -------------- 2 -------------

  // -------------- 3 -------------
  // 融合props
  initialValues: PropTypes.object, // 直接通过props传递的initialValues，如果createFormOption里指定了initalValues则此值不会生效，而只会用来重置
  showStepReset: PropTypes.bool, // 是否显示步骤的重置按钮，如果没设置则采用父级StepsForm设置
  stepResetMode: PropTypes.oneOf([ 'initial', 'lastCommit' ]), // 重置模式：重置到初始状态，或者上次提交时的状态
  // -------------- 3 -------------

  //-------------------
  createFormOptions,
  onSubmit: PropTypes.func,
  onPrevious: PropTypes.func,
  previousText: PropTypes.node,
  nextText: PropTypes.arrayOf(PropTypes.node),
  resetText: PropTypes.node,
  resetProps: PropTypes.shape({
    size: PropTypes.oneOfType([
      PropTypes.oneOf([ 'small', 'medium', 'large' ]),
      PropTypes.string,
    ]),
    disabled: PropTypes.bool,
    color: PropTypes.oneOfType([
      PropTypes.oneOf([ 'inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning' ]),
      PropTypes.string,
    ]),
    variant: PropTypes.oneOf([ 'text', 'outlined', 'contained' ]),
    sx: PropTypes.object,
  }),
  submitProps: PropTypes.shape({
    onSubmitFailed: PropTypes.func,
    onSubmitSuccess: PropTypes.func,
    onClick: PropTypes.func,
    size: PropTypes.oneOfType([
      PropTypes.oneOf([ 'small', 'medium', 'large' ]),
      PropTypes.string,
    ]),
    disabled: PropTypes.bool,
    color: PropTypes.oneOfType([
      PropTypes.oneOf([ 'inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning' ]),
      PropTypes.string,
    ]),
    variant: PropTypes.oneOf([ 'text', 'outlined', 'contained' ]),
    sx: PropTypes.object,
  }),
};

export default StepForm;
