/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-28 09:31:31
 * @LastEditTime: 2022-03-28 09:31:31
 */
import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle } from 'react';
import { useDropzone } from 'react-dropzone';

const rootDefaultStyle = {
  display: 'inline',
  // textAlign: 'center',
  verticalAlign: 'middle',
};

const UploadZone = forwardRef((props, ref) => {
  const {
    children,
    style,
    ...otherProps
  } = props;
  const { getInputProps, getRootProps, open } = useDropzone({ ...otherProps });

  useImperativeHandle(ref, () => ({ open }), [ open ]);

  return (
    <div {...getRootProps({ style: { ...rootDefaultStyle, ...style } })} >
      <input
        {...getInputProps()}
      />
      { children }
    </div>
  );
});

UploadZone.defaultProps = {
  useFsAccessApi: false,
};
UploadZone.propTypes = {
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
  disabled: PropTypes.bool,
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
  validator: PropTypes.func, // Custom validation function   * @param {File} file   * @returns {FileError|FileError[]}
};

UploadZone.displayName = 'UploadZone';

export default UploadZone;
