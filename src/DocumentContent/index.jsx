/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-16 17:20:24
 * @LastEditTime: 2022-05-16 17:20:45
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { DocumentContent } from 'mui-formfield';

const FormilyDocumentContent = connect(
  DocumentContent,
  mapProps({
    title: 'label',
    description: 'tooltip',
    required: true,
    readOnly: true,
    disabled: true,
    initialValue: 'defaultValue',
  },
  (props, field) => {
    if (isVoidField(field)) return props;
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

FormilyDocumentContent.displayName = 'formilyMuiDocumentContent';

export default FormilyDocumentContent;
