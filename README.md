<!--
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:06:56
 * @LastEditTime: 2022-08-05 21:00:44
-->
# mui-formily
mui formily组件
本地测试较少，便用边调，所以版本迭代很快，但实际基本都是修错误

## Getting Started

Install dependencies,

```bash
$ npm i mui-formily
```

```javascript
export { default as Input, InputProps } from './Input';
export { default as Select, SelectProps } from './Select';
export { default as Switch, SwitchProps } from './Switch';
export { default as DatePicker, DatePickerProps } from './DatePicker';
export { default as DateRangePicker, DateRangePickerProps } from './DateRangePicker';
export { default as CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';
export { default as RadioGroup, RadioGroupProps } from './RadioGroup';
export { default as Upload, UploadProps } from './Upload';
export { default as Transfer, TransferProps } from './Transfer';
export { default as EditableTable, EditableTableProps } from './EditableTable';
export { default as KeyWords, KeyWordsProps } from './KeyWords';


export { default as Reset, ResetProps } from './Reset';
export { default as Submit, SubmitProps } from './Submit';

export { default as ModalForm, ModalFormProps } from './ModalForm';
export { default as StepsForm, StepsFormProps, StepFormProps, ResultRenderProps, StepIconProps } from './StepsForm';
```

Build documentation,

```bash
$ npm run docs:build
```

Run test,

```bash
$ npm test
```

Build library via `father-build`,

```bash
$ npm run build
```
