/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-08-05 20:25:43
 * @LastEditTime: 2022-08-05 20:48:09
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { KeyWords } from 'mui-formfield';

const FormilyKeyWords = connect(
  KeyWords,
  mapProps({
    title: 'label',
    description: 'tooltip',
    required: true,
    readOnly: true,
    disabled: true,
    initialValue: 'defaultValue',
  },
  (props, field) => {
    if (!field || isVoidField(field)) return props;
    return {
      showHelperText: true,
      fullWidth: true,
      error: field.selfInvalid,
      helperText: field.selfErrors.join(),
      ...props,
    };
  }
  )
);

FormilyKeyWords.displayName = 'formilyMuiKeyWords';

export default FormilyKeyWords;
