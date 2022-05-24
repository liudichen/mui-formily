import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { createForm } from '@formily/core';
import { toJS } from '@formily/reactive';
import { FormProvider, ObjectField, observer } from '@formily/react';
import { Box, Step, StepContent, StepIcon, StepLabel, Stepper } from '@mui/material';

import StepForm from './StepForm';
import DefaultCompleteRender from './DefaultCompleteRender';

const StepsForm = observer((props) => {
  const {
    children,
    createFormOptions, onFinish,
    ResultRender, resultTitle, resultSubTitle, showResultReset, resultActions, resultResetText, resultResetProps, onResultReset,
    stepContentProps,
    direction, orientation, alternativeLabel, labelPlacement,
    ...restProps
  } = props;
  const [ stepsCount, setStepCount ] = useSafeState(() => React.Children.count(children));
  useEffect(() => {
    setStepCount(React.Children.count(children));
  }, [ React.Children.count(children) ]);
  const [ activeStep, setActiveStep ] = useSafeState(0);
  const form = useMemo(() => createForm(createFormOptions || { validateFirst: true }), []);
  const handleStepChange = useMemoizedFn((step) => {
    if (typeof step === 'number') {
      setActiveStep(step);
    } else {
      if (step === 'next') {
        setActiveStep((s) => s + 1);
      } else if (step === 'previous') {
        setActiveStep((s) => (s - 1) || 0);
      }
    }
  });

  return (
    <Box>
      <FormProvider form={form}>
        <Stepper
          activeStep={activeStep}
          orientation={direction ?? orientation}
          alternativeLabel={alternativeLabel ?? (labelPlacement === 'vertical')}
          {...restProps}
        >
          { React.Children.map(children, (child, index) => {
            if (!child) { return null; }
            const { title, subTitle, icon = StepIcon, onFinish: onFinishProp, name } = child.props;
            const overwriteProps = {
              handleStepChange,
              current: activeStep,
              stepIndex: index,
              stepsCount,
            };
            if (!onFinishProp && index + 1 === stepsCount && onFinish) {
              overwriteProps.onFinish = onFinish;
            }
            return (
              <Step>
                <StepLabel optional={ subTitle } StepIconComponent={icon}>
                  { title }
                </StepLabel>
                { (direction ?? orientation) === 'vertical' && (
                  <StepContent {...(stepContentProps || {})}>
                    <ObjectField name={name ?? index}>
                      {(_field) => {
                        return (
                          <>
                            {React.cloneElement(child, overwriteProps)}
                          </>
                        );
                      }}
                    </ObjectField>
                  </StepContent>
                )}
              </Step>
            );
          })?.filter((ele) => !!ele)}
        </Stepper>
        { (direction ?? orientation) !== 'vertical' && (
          React.Children.map(children, (child, index) => {
            if (!child || index !== activeStep) { return null; }
            const { onFinish: onFinishProp, name } = child.props;
            const overwriteProps = {
              handleStepChange,
              current: activeStep,
              stepIndex: index,
              stepsCount,
            };
            if (!onFinishProp && index + 1 === stepsCount && onFinish) {
              overwriteProps.onFinish = onFinish;
            }
            return (
              <ObjectField name={name ?? index}>
                {(_field) => {
                  return (
                    <Box>
                      { React.cloneElement(child, overwriteProps)}
                    </Box>
                  );
                }}
              </ObjectField>
            );
          })?.filter((ele) => !!ele)
        )}
        { activeStep === stepsCount && stepsCount !== 0 && (
          <ResultRender
            handleStepChange={handleStepChange}
            form={form}
            values={toJS(form?.values)}
            resultTitle={resultTitle}
            resultSubTitle={resultSubTitle}
            resultActions={resultActions}
            showResultReset={showResultReset}
            resultResetText={resultResetText}
            resultResetProps={resultResetProps}
            onResultReset={onResultReset}
          />
        )}
      </FormProvider>
    </Box>
  );
});

StepsForm.defaultProps = {
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  ResultRender: DefaultCompleteRender,
  showResultReset: true,
  resultResetText: '返回',
};

StepsForm.propTypes = {
  direction: PropTypes.oneOf([ 'horizontal', 'vertical' ]),
  labelPlacement: PropTypes.oneOf([ 'horizontal', 'vertical' ]),
  onFinish: PropTypes.func,
  createFormOptions: PropTypes.object,

  // ----- 结果展示部分 ↓↓ -------
  onResultReset: PropTypes.func,
  resultResetText: PropTypes.node,
  resultTitle: PropTypes.node,
  resultSubTitle: PropTypes.node,
  showResultReset: PropTypes.bool,
  resultActions: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
  ResultRender: PropTypes.oneOfType([ PropTypes.func, PropTypes.elementType ]),
  resultResetProps: PropTypes.shape({
    variant: PropTypes.oneOf([ 'text', 'outlined', 'contained' ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([ 'small', 'medium', 'large' ]),
      PropTypes.string,
    ]),
    disabled: PropTypes.bool,
    color: PropTypes.oneOfType([
      PropTypes.oneOf([ 'inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning' ]),
      PropTypes.string,
    ]),
    sx: PropTypes.object,
  }),
};

StepsForm.StepForm = StepForm;

export default StepsForm;
