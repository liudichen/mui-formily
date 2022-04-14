import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';

import Upload from '../../Extend/UploadButton';

const FormilyUpload = connect(
  Upload,
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
      error: field.selfInvalid,
      helperText: field.selfErrors.join(),
      ...props,
    };
  })
);

export default FormilyUpload;
