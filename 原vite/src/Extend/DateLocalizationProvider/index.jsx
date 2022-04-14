/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-11 22:47:37
 * @LastEditTime: 2022-04-11 22:49:58
 */
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const DateLocalizationProvider = (props) => {
  const { children, dateAdapter, ...restProps } = props;
  return (
    <LocalizationProvider dateAdapter={dateAdapter} {...restProps}>
      {children}
    </LocalizationProvider>
  );
};

DateLocalizationProvider.defaultProps = {
  dateAdapter: DateAdapter,
};

export default DateLocalizationProvider;
