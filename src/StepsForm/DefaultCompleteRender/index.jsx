/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:38
 * @LastEditTime: 2022-05-18 15:08:22
 */
import PropTypes from 'prop-types';
import { useMemoizedFn } from 'ahooks';
import { observer } from '@formily/react';
import { Button } from '@mui/material';
import { Result, Space } from 'mui-component';

const DefaultCompleteRender = observer((props) => {
  const { resultActions, resultTitle, resultSubTitle, showResultReset, resultResetText, resultResetProps, handleStepChange, form } = props;
  const handleReset = useMemoizedFn(() => {
    form?.reset('*');
    handleStepChange(0);
  });
  return (
    <Result
      status='success'
      title={resultTitle}
      subTitle={resultSubTitle}
      actions={
        <Space>
          { showResultReset && (
            <Button
              {...(resultResetProps || {})}
              onClick={handleReset}
            >
              {resultResetText}
            </Button>
          )}
          { resultActions }
        </Space>
      }
    />
  );
});

DefaultCompleteRender.defaultProps = {
  resultTitle: '操作成功',
  resultSubTitle: '点击返回以再次操作',
  resultResetText: '返回',
  resultResetProps: { variant: 'outlined' },
};

DefaultCompleteRender.propTypes = {
  values: PropTypes.func,
  form: PropTypes.object,
  handleStepChange: PropTypes.func,
  resultTitle: PropTypes.node,
  resultSubTitle: PropTypes.node,
  showResultReset: PropTypes.bool,
  resultActions: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
  resultResetText: PropTypes.node,
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

export default DefaultCompleteRender;
