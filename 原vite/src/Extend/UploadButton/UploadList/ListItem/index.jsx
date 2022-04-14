/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-28 10:40:47
 * @LastEditTime: 2022-04-11 22:39:16
 */
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IconTrash, IconCloudDownload } from '@tabler/icons';
import { useMemoizedFn } from 'ahooks';

const useStyles = makeStyles({
  root: {
    width: '100%',
    flex: 'auto',
    display: 'flex',
    fontSize: '14px',
    alignItems: 'center',
    verticalAlign: 'middle',
    // lineHeight: 1.5715,
    // margin: 0,
    // padding: 0,
    '&:hover': {
      background: '#f0f0f0',
    },
    border: (props) => (props.error ? '1px solid red' : (props.listType === 'picture-card' ? '1px solid #f0f0f0' : '')),
  },
  icon: {
    display: 'block',
    flex: 'none',
  },
  preview: {
    width: '60px',
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center',
    // verticalAlign: 'middle',
    alignItems: 'center',
    opacity: 0.8,
    cursor: 'pointer',
    mr: 0.5,
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    },
  },
  info: {
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  action: {
    position: 'static',
    flex: 'none',
    right: 0,
  },
});

const ListItem = (props) => {
  const {
    style,
    listType,
    file,
    onClickThumb,
    iconRender,
    isImage, imageIndex,
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    previewIcon: customPreviewIcon,
    removeIcon,
    downloadIcon,
    onPreview,
    onDownload,
    onRemove,
  } = props;

  const classes = useStyles({ listType, error: file?.error });
  const iconNode = iconRender?.(file) || customPreviewIcon;
  let icon = (
    <div>
      {iconNode}
    </div>
  );
  if (listType === 'picture-card') {
    if (isImage?.(file) && (file.url || file.thumbUrl)) {
      icon = (
        <img
          src={file.url || file.thumbUrl}
          alt={file.name}
        />
      );
    }
  }
  const handleOnPreview = useMemoizedFn(async (file, e, imageIndex) => {
    if (onPreview && typeof onPreview === 'function') {
      onPreview(file, e);
    } else if (imageIndex !== -1 && typeof imageIndex === 'number' && typeof onClickThumb === 'function') {
      onClickThumb(imageIndex);
    }
  });
  return (
    <span
      className={classes.root}
      style={style}
    >
      { showPreviewIcon && (
        <div
          // className={listType === 'picture-card' ? classes.preview : classes.icon}
          className={ classes.preview }
        >
          <IconButton
            onClick={(e) => handleOnPreview(file, e, imageIndex)}
          >
            {icon}
          </IconButton>
        </div>
      )}
      <span
        title={file.name}
        className={classes.info}
        style={{
          color: file.error ? 'red' : undefined,
        }}
      >
        {file.name}
      </span>
      <span
        className={classes.action}
      >
        {showDownloadIcon && (onDownload) && (
          <Tooltip title='下载' arrow placement='top'>
            <IconButton onClick={() => onDownload(file)}>
              { downloadIcon || <IconCloudDownload size='1.2rem' color={file.error ? 'red' : 'grey'}/>}
            </IconButton>
          </Tooltip>
        )}
        { showRemoveIcon && (onRemove) && (
          <Tooltip title='删除' arrow placement='top'>
            <IconButton onClick={() => onRemove(file)}>
              { removeIcon || <IconTrash size='1.2rem' color={file.error ? 'red' : 'grey'}/> }
            </IconButton>
          </Tooltip>
        )}
      </span>
    </span>
  );
};

ListItem.defaultProps = {
  showRemoveIcon: true,
  showPreviewIcon: true,
};

ListItem.propTypes = {
  isImage: PropTypes.func,
  imageIndex: PropTypes.number,
  showPreviewIcon: PropTypes.bool,
  showRemoveIcon: PropTypes.bool,
  showDownloadIcon: PropTypes.bool,
  onPreview: PropTypes.func,
  onDownload: PropTypes.func,
  onRemove: PropTypes.func,
  images: PropTypes.array,
  file: PropTypes.object.isRequired,
  removeIcon: PropTypes.node,
  downloadIcon: PropTypes.node,
};

export default ListItem;
