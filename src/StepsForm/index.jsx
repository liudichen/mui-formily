import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLatest, useMemoizedFn } from 'ahooks';
import { Box, Step, StepContent, StepIcon, StepLabel, Stepper } from '@mui/material';

import StepForm from './StepForm';
import DefaultCompleteRender from './DefaultCompleteRender';
import { sx } from '../propTypes';

const StepsForm = (props) => {
  const {
    ResultRender, resultTitle, resultSubTitle, showResultReset, resultActions, resultResetText, onReset, resultResetProps,
    direction, labelPlacement, activeStep: activeStepProp,
    initialValues, onFinish, showStepReset, stepResetMode,
    children,
    // eslint-disable-next-line no-unused-vars
    orientation, alternativeLabel,
    rootSx,
    ...restProps
  } = props;
  const [ stepsCount, setStepCount ] = useState(() => React.Children.count(children));
  useEffect(() => {
    setStepCount(React.Children.count(children));
  }, [ React.Children.count(children) ]);
  const [ activeStep, setActiveStep ] = useState(activeStepProp || 0);
  const [ values, setValues ] = useState(initialValues ?? {});
  const valuesRef = useLatest(values);
  const handlePrevious = useMemoizedFn(() => setActiveStep((s) => (s < 1 ? s : s - 1)));
  const handleNext = useMemoizedFn(() => setActiveStep((s) => (s < stepsCount ? s + 1 : s)));
  const handleReset = useMemoizedFn(() => {
    onReset?.();
    setValues(initialValues ?? {});
    setActiveStep(0);
  });
  const getPreviousValues = useMemoizedFn((index) => {
    let previousValues = {};
    for (let i = 0; i < index; i++) {
      previousValues = {
        ...previousValues,
        ...(valuesRef.current?.[i] || {}),
      };
    }
    return previousValues;
  });
  if (direction === 'vertical') {
    return (
      <Box
        sx={{ width: '100%', ...(rootSx || {}) }}
      >
        <Stepper
          activeStep={activeStep}
          orientation={direction}
          alternativeLabel={labelPlacement === 'vertical'}
          {...restProps}
        >
          { React.Children.map(children, (child, index) => {
            if (!child) { return null; }
            const { title, subTitle, icon = StepIcon, createFormOptions, onSubmit: childOnSubmit, onPrevious: childOnPrevious, showStepReset: childShowStepReset, stepResetMode: childStepResetMode, initialValues: childInitialValues } = child.props;
            const previousValues = getPreviousValues(index);
            const onSubmit = async (v) => {
              const submit = index === stepsCount - 1 ? childOnSubmit || onFinish : childOnSubmit;
              const res = await submit?.({ ...previousValues, ...(v || {}) });
              if (res !== false) {
                setValues((s) => {
                  const newS = { ...(s || []) };
                  newS[index] = { ...(v || {}) };
                  return newS;
                });
                handleNext();
              }
            };
            const extraProps = { current: activeStep, stepIndex: index, stepsCount, onSubmit, onPrevious: () => { childOnPrevious?.(); handlePrevious(); }, previousValues };
            if (!childStepResetMode) { extraProps.stepResetMode = stepResetMode; }
            if (typeof childShowStepReset === 'undefined') { extraProps.showStepReset = showStepReset; }
            if (valuesRef.current?.[index]) {
              extraProps.createFormOptions = createFormOptions?.initialValues ? { ...createFormOptions, initialValues: { ...createFormOptions.initialValues, ...valuesRef.current[index] } } : { ...(createFormOptions || {}), initialValues: valuesRef.current[index] };
            } else if ((childInitialValues || initialValues?.[index]) && !createFormOptions?.initialValues) {
              extraProps.createFormOptions = { ...(createFormOptions || {}), initialValues: { ...(initialValues?.[index] || {}), ...childInitialValues } };
            }
            if (initialValues?.[index] && Object.keys(initialValues[index]).length) {
              extraProps.initialValues = { ...initialValues[index], ...(childInitialValues || {}) };
            }
            return (
              <Step>
                <StepLabel optional={subTitle} StepIconComponent={icon} >{title}</StepLabel>
                <StepContent>
                  { React.cloneElement(child, extraProps)}
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        { activeStep === stepsCount && (
          <ResultRender
            onReset={handleReset}
            values={getPreviousValues(stepsCount)}
            resultTitle={resultTitle}
            resultSubTitle={resultSubTitle}
            resultActions={resultActions}
            showResultReset={showResultReset}
            resultResetText={resultResetText}
            resultResetProps={resultResetProps}
          />
        )}
      </Box>
    );
  }
  return (
    <Box
      sx={{ width: '100%', ...(rootSx || {}) }}
    >
      <Stepper
        activeStep={activeStep}
        orientation={direction}
        alternativeLabel={labelPlacement === 'vertical'}
        {...restProps}
      >
        { React.Children.map(children, (child, _index) => {
          if (!child) { return null; }
          const { title, subTitle, icon = StepIcon } = child.props;
          return (
            <Step>
              <StepLabel
                optional={subTitle}
                StepIconComponent={icon}
              >
                {title}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      { React.Children.map(children, (child, index) => {
        if (index !== activeStep) { return null; }
        const { createFormOptions, onSubmit: childOnSubmit, onPrevious: childOnPrevious, showStepReset: childShowStepReset, stepResetMode: childStepResetMode, initialValues: childInitialValues } = child.props;
        const previousValues = getPreviousValues(index);
        const onSubmit = async (v) => {
          const submit = index === stepsCount - 1 ? (childOnSubmit ?? onFinish) : childOnSubmit;
          const res = await submit?.({ ...previousValues, ...(v || {}) });
          if (res !== false) {
            setValues((s) => {
              const newS = { ...(s || []) };
              newS[index] = { ...(v || {}) };
              return newS;
            });
            handleNext();
          }
        };
        const extraProps = { current: activeStep, stepIndex: index, stepsCount, onSubmit, onPrevious: () => { childOnPrevious?.(); handlePrevious(); }, previousValues };
        if (!childStepResetMode) { extraProps.stepResetMode = stepResetMode; }
        if (typeof childShowStepReset === 'undefined') { extraProps.showStepReset = showStepReset; }
        if (valuesRef.current?.[index]) {
          extraProps.createFormOptions = createFormOptions?.initialValues ? { ...createFormOptions, initialValues: { ...createFormOptions.initialValues, ...valuesRef.current[index] } } : { ...(createFormOptions || {}), initialValues: valuesRef.current[index] };
        } else if ((childInitialValues || initialValues?.[index]) && !createFormOptions?.initialValues) {
          extraProps.createFormOptions = { ...(createFormOptions || {}), initialValues: { ...(initialValues?.[index] || {}), ...childInitialValues } };
        }
        if (initialValues?.[index] && Object.keys(initialValues[index]).length) {
          extraProps.initialValues = { ...initialValues[index], ...(childInitialValues || {}) };
        }
        return (
          <div>
            {React.cloneElement(child, extraProps)}
          </div>
        );
      }) }
      { activeStep === stepsCount && stepsCount !== 0 && (
        <ResultRender
          onReset={handleReset}
          values={getPreviousValues(stepsCount)}
          resultTitle={resultTitle}
          resultSubTitle={resultSubTitle}
          resultActions={resultActions}
          showResultReset={showResultReset}
          resultResetText={resultResetText}
          resultResetProps={resultResetProps}
        />
      )}
    </Box>
  );
};

StepsForm.defaultProps = {
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  ResultRender: DefaultCompleteRender,
  showResultReset: true,
  resultResetText: '返回',
  showStepReset: false,
  stepResetMode: 'lastCommit',
};

StepsForm.propTypes = {
  direction: PropTypes.oneOf([ 'horizontal', 'vertical' ]),
  labelPlacement: PropTypes.oneOf([ 'horizontal', 'vertical' ]),
  onFinish: PropTypes.func,

  showStepReset: PropTypes.bool, // 是否显示步骤的重置按钮，如果子表单没设置则采用此StepsForm设置
  stepResetMode: PropTypes.oneOf([ 'initial', 'lastCommit' ]), // 重置模式：重置到初始状态，或者上次提交时的状态

  rootSx: sx,

  // ----- 结果展示部分 ↓↓ -------
  resultResetText: PropTypes.node,
  onReset: PropTypes.func,
  resultTitle: PropTypes.node,
  resultSubTitle: PropTypes.node,
  showResultReset: PropTypes.bool,
  resultActions: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
  ResultRender: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
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
