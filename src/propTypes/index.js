/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-07 21:16:46
 * @LastEditTime: 2022-05-07 21:18:39
 */
import PropTypes from 'prop-types';

const sx = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])),
  PropTypes.object,
  PropTypes.func,
]);

const dialog = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  BackdropComponent: PropTypes.elementType,
  BackdropProps: PropTypes.object,
  classes: PropTypes.object,
  closeAfterTransition: PropTypes.bool, // false
  component: PropTypes.elementType,
  components: PropTypes.shape({ Root: PropTypes.elementType }), // {}
  componentsProps: PropTypes.shape({ root: PropTypes.object }), // {}
  disableAutoFocus: PropTypes.bool, // false
  disableEnforceFocus: PropTypes.bool, // false
  disableEscapeKeyDown: PropTypes.bool, // false
  disablePortal: PropTypes.bool, // false
  disableRestoreFocus: PropTypes.bool, // false
  disableScrollLock: PropTypes.bool, // false
  hideBackdrop: PropTypes.bool, // false
  keepMounted: PropTypes.bool, // false
  fullScreen: PropTypes.bool, // false
  fullWidth: PropTypes.bool, // false
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf([ 'xs', 'sm', 'md', 'lg', 'xl', false ]),
    PropTypes.string,
  ]), // 'sm'
  onBackdropClick: PropTypes.func,
  PaperComponent: PropTypes.elementType, // Paper
  PaperProps: PropTypes.object,
  scroll: PropTypes.oneOf([ 'paper', 'body' ]), // 'paper'
  sx,
  TransitionComponent: PropTypes.elementType, // Fade
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]), // { enter: theme.transitions.duration.enteringScreen, exit: theme.transitions.duration.leavingScreen, }
  TransitionProps: PropTypes.object,
};

const createFormOptions = PropTypes.shape({
  values: PropTypes.object,
  initialValues: PropTypes.object,
  pattern: PropTypes.oneOf([ 'editable', 'disabled', 'readOnly', 'readPretty' ]),
  display: PropTypes.oneOf([ 'visible', 'hidden', 'none' ]),
  hidden: PropTypes.bool,
  visible: PropTypes.bool,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  readPretty: PropTypes.bool,
  effects: PropTypes.func,
  validateFirst: PropTypes.bool,
});

export {
  createFormOptions,
  sx,
  dialog,
};
