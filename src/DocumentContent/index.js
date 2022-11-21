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

FormilyDocumentContent.displayName = 'formilyMuiDocumentContent';

export default FormilyDocumentContent;
