/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:38
 * @LastEditTime: 2022-05-09 14:55:32
 */
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Result, Space } from 'mui-component';

const DefaultCompleteRender = (props) => {
  const { onReset, resultActions, resultTitle, resultSubTitle, showResultReset, resetText, resetProps } = props;
  return (
    <Result
      status='success'
      title={resultTitle}
      subTitle={resultSubTitle}
      actions={
        <Space>
          { showResultReset && (
            <Button
              {...(resetProps || {})}
              onClick={onReset}
            >
              {resetText}
            </Button>
          )}
          { resultActions }
        </Space>
      }
    />
  );
};

DefaultCompleteRender.defaultProps = {
  resultTitle: '操作成功',
  resultSubTitle: '点击返回以再次操作',
  resetText: '返回',
  resetProps: { variant: 'outlined' },
};

DefaultCompleteRender.propTypes = {
  onReset: PropTypes.func,
  values: PropTypes.object,
  resultTitle: PropTypes.node,
  resultSubTitle: PropTypes.node,
  showResultReset: PropTypes.bool,
  resultActions: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
  resetText: PropTypes.node,
  resetProps: PropTypes.shape({
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
