/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:38
 * @LastEditTime: 2022-10-14 22:13:53
 */
import { useMemoizedFn } from 'ahooks';
import { observer } from '@formily/react';
import { Button } from '@mui/material';
import { Result, Space } from 'mui-component';

const DefaultCompleteRender = observer((props) => {
  const { resultActions, resultTitle, resultSubTitle, showResultReset, resultResetText, resultResetProps, onResultReset, handleStepChange, form } = props;
  const handleReset = useMemoizedFn(() => {
    onResultReset?.();
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

export default DefaultCompleteRender;
