/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-28 08:57:36
 * @LastEditTime: 2022-04-11 22:44:17
 */
import PropTypes from 'prop-types';
import { useMemoizedFn } from 'ahooks';
import { Button } from '@mui/material';

import { removeFileItem, updateFileList } from './utils';
import { FieldWrapper, useMergedState, isImage, fileToBase64 } from '../common';
import UploadZone from './UploadZone';
import UploadList from './UploadList';

const defaultPreviewFile = (file) => {
  if (isImage(file)) {
    return fileToBase64(file);
  }
  return new Promise((resolve) => resolve(''));
};

const UploadButton = (props) => {
  const {
    fullWidth, label, tooltip, required, error,
    helperText, showHelperText, helperTextSx, helperTextProps,
    fieldSx, fieldProps, labelSx, labelProps, uploadListStyle,
    value, onChange, defaultValue,
    readOnly, disabled, children,
    accept, transformFile,
    isImage,
    maxCount,
    onRemove,
    showUploadList,
    previewFile,
    listType,
    onPreview,
    onDownload,
    onDrop,
    onDropAccepted,
    onDropRejected,
    validator,
    ...restProps
  } = props;
  const [ fileList, setFileList ] = useMergedState(defaultValue, { value, onChange, postState: (s) => (s ? (Array.isArray(s) ? s : [ s ]) : []) });

  const onInternalChange = useMemoizedFn(async (changedFileList) => {
    if (disabled || readOnly) { return; }
    let cloneList = [ ...changedFileList ];
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount);
    }
    if (transformFile && typeof transformFile === 'function') {
      for (let i = 0; i < cloneList.length; i++) {
        const file = await transformFile(cloneList[i]);
        cloneList[i] = file;
      }
    }
    setFileList(cloneList);
  });

  const handleRemove = useMemoizedFn(async (file) => {
    let res = onRemove;
    if (typeof res === 'function') {
      res = await onRemove();
    }
    if (res === false) { return; }
    const newFileList = removeFileItem(file, fileList);
    if (newFileList) {
      await onInternalChange(newFileList);
    }
  });

  const onInternalDropAccepted = useMemoizedFn(async (acceptedFiles, e) => {
    const newFileList = updateFileList(acceptedFiles, fileList);
    if (newFileList) {
      if (validator && typeof validator === 'function') {
        for (let i = 0; i < newFileList.length; i++) {
          const validatorStatus = await validator(newFileList[i]);
          if (validatorStatus) {
            newFileList[i].error = validatorStatus;
          }
        }
      }
      await onInternalChange(newFileList);
    }
    onDropAccepted?.(acceptedFiles, e);
  });

  return (
    <FieldWrapper
      error={error}
      required={required}
      fullWidth={fullWidth}
      fieldSx={fieldSx}
      fieldProps={fieldProps}
      label={label}
      labelSx={labelSx}
      labelProps={labelProps}
      tooltip={tooltip}
      helperText={helperText}
      showHelperText={showHelperText}
      helperTextSx={helperTextSx}
      helperTextProps={helperTextProps}
    >
      <UploadZone
        multiple={maxCount !== 1}f
        disabled={disabled || readOnly}
        accept={accept}
        onDrop={onDrop}
        onDropAccepted={onInternalDropAccepted}
        onDropRejected={onDropRejected}
        maxFiles={maxCount}
        validator={validator}
        {...restProps}
      >
        {children}
      </UploadZone>
      { showUploadList && fileList.length > 0 && (
        <UploadList
          items={fileList}
          isImage={isImage}
          previewFile={previewFile}
          listType={listType}
          onRemove={handleRemove}
          onPreview={onPreview}
          onDownload={onDownload}
          style={uploadListStyle ?? {}}
          {...(showUploadList ? (showUploadList === true ? { showPreviewIcon: true, showRemoveIcon: true } : showUploadList) : {})}
        />
      )}
    </FieldWrapper>
  );
};

UploadButton.defaultProps = {
  showUploadList: true,
  listType: 'text',
  children: <Button variant='outlined' size='small'>文件上传</Button>,
  isImage,
  previewFile: defaultPreviewFile,
};

UploadButton.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.node,
  labelSx: PropTypes.object,
  labelProps: PropTypes.object,
  tooltip: PropTypes.node,
  options: PropTypes.array,
  request: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.bool,
  fieldSx: PropTypes.object,
  fieldProps: PropTypes.object,
  helperText: PropTypes.node,
  showHelperText: PropTypes.bool,
  helperTextSx: PropTypes.object,
  helperTextProps: PropTypes.object,
  fullWidth: PropTypes.bool,

  isImage: PropTypes.func,
  previewFile: PropTypes.func, // interface: (file) => void
  transformFile: PropTypes.func,
  uploadButtonStyle: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  validator: PropTypes.func, // interface: （file) => '' || errorMsg
  showUploadList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      showPreviewIcon: PropTypes.bool,
      showRemoveIcon: PropTypes.bool,
      showDownloadIcon: PropTypes.bool,
      previewIcon: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
      downloadIcon: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
      removeIcon: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
    }) ]),
  listType: PropTypes.oneOf([ 'text', 'picture-card' ]),
  maxCount: PropTypes.number,
  onRemove: PropTypes.func,
  onPreview: PropTypes.func,
  onDownload: PropTypes.func,
  accept: PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string) ]),
  multiple: PropTypes.bool,
  preventDropOnDocument: PropTypes.bool, // If false, allow dropped items to take over the current browser window
  noClick: PropTypes.bool, // If true, disables click to open the native file selection dialog
  noKeyboard: PropTypes.bool, // If true, disables SPACE/ENTER to open the native file selection dialog. * Note that it also stops tracking the focus state
  noDrag: PropTypes.bool, // If true, disables drag 'n' drop
  noDragEventsBubbling: PropTypes.bool, // If true, stops drag event propagation to parents
  minSize: PropTypes.number, // Minimum file size (in bytes)
  maxSize: PropTypes.number, // Maximum file size (in bytes)
  maxFiles: PropTypes.number, // Maximum accepted number of files * The default value is 0 which means there is no limitation to how many files are accepted.
  getFilesFromEvent: PropTypes.func, // Use this to provide a custom file aggregator  @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
  onFileDialogCancel: PropTypes.func, // Cb for when closing the file dialog with no selection
  onFileDialogOpen: PropTypes.func, // Cb for when opening the file dialog
  useFsAccessApi: PropTypes.bool, // Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API  to open the file picker instead of using an `<input type="file">` click event.
  onDragEnter: PropTypes.func, // Cb for when the `dragenter` event occurs. @param {DragEvent} event
  onDragLeave: PropTypes.func, // Cb for when the `dragleave` event occurs  @param {DragEvent} event
  onDragOver: PropTypes.func, // Cb for when the `dragover` event occurs  @param {DragEvent} event
  onDrop: PropTypes.func, // Cb for when the `drop` event occurs.   * Note that this callback is invoked after the `getFilesFromEvent` callback is done. Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props. Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected. If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props. @param {File[]} acceptedFiles;  @param {FileRejection[]} fileRejections; @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
  onDropAccepted: PropTypes.func, // Cb for when the `drop` event occurs.   * Note that if no files are accepted, this callback is not invoked. @param {File[]} files  @param {(DragEvent|Event)} event
  onDropRejected: PropTypes.func, // Cb for when the `drop` event occurs.   * Note that if no files are rejected, this callback is not invoked. @param {FileRejection[]} fileRejections ;@param {(DragEvent|Event)} event
};

export default UploadButton;
