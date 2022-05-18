import PropTypes from 'prop-types';
import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { toJS } from '@formily/reactive';
import { observer, useParentForm } from '@formily/react';
import { Box, Button, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Space } from 'mui-component';

const StepForm = observer((props) => {
  const { stepIndex, stepsCount, onFinish, onPrevious, nextProps, nextText, previousText, previousProps, children, handleStepChange, name,
    // eslint-disable-next-line no-unused-vars
    title, subTitle, icon,
    ...restProps } = props;
  const [ loading, setLoading ] = React.useState(false);
  const form = useParentForm();
  const onSubmit = useMemoizedFn(async () => {
    try {
      setLoading(true);
      await form.validate();
      if (form.valid) {
        let res = false;
        const allValues = toJS(form?.form?.values || {});
        if (stepIndex + 1 !== stepsCount) {
          res = await onFinish?.(toJS(form.value), allValues);
        } else {
          const valuesArr = Object.values(allValues);
          let values = {};
          for (let i = 0; i < valuesArr; i++) {
            values = { ...values, ...(valuesArr[i] || {}) };
          }
          res = await onFinish?.(values, allValues);
        }
        setLoading(false);
        if (res !== false) {
          handleStepChange?.('next');
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(`stepForm-${name ?? stepIndex}-SubmitError`, error);
      setLoading(false);
    }
  });
  const onPreviousClick = useMemoizedFn(() => {
    onPrevious?.();
    handleStepChange?.('previous');
  });

  return (
    <Box
      {...restProps}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Space sx={{}}>
            { !!stepIndex && (
              <Button
                {...(previousProps || {})}
                onClick={onPreviousClick}
              >
                {previousText}
              </Button>
            )}
            <LoadingButton
              variant='contained'
              loading={loading}
              size='small'
              {...(nextProps || {})}
              onClick={onSubmit}
            >
              { stepIndex + 1 === stepsCount ? nextText?.[1] : nextText?.[0] }
            </LoadingButton>
          </Space>
        </Grid>
      </Grid>
    </Box>
  );
});

StepForm.defaultProps = {
  nextText: [ '下一步', '提交' ],
  previousText: '上一步',
};

StepForm.propTypes = {
  // -------------- 1 -------------
  // 此部分props是给stepsForm拦截并使用的
  name: PropTypes.string,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  icon: PropTypes.oneOfType([ PropTypes.func, PropTypes.element, PropTypes.object ]),
  // -------------- 1 -------------

  // -------------- 2 -------------
  // 此部分props是由StepsForm组件自动生成并传递的，不要手动传递，可以通过props获取使用
  current: PropTypes.number, // 当前激活的stepForm的index(从0开始)
  stepIndex: PropTypes.number, // 此步骤的index编号(从0开始)
  stepsCount: PropTypes.number, // StepForm的步骤总数
  handleStepChange: PropTypes.func,
  // -------------- 2 -------------

  //-------------------
  onFinish: PropTypes.func,
  onPrevious: PropTypes.func,
  previousText: PropTypes.node,
  nextText: PropTypes.arrayOf(PropTypes.node),
  nextProps: PropTypes.shape({
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

