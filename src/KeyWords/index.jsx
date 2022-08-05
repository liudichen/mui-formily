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
    dataSource: 'options',
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

FormilyKeyWords.displayName = 'formilyMuiKeyWords';

export default FormilyKeyWords;
