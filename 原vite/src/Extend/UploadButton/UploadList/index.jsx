/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-28 10:40:18
 * @LastEditTime: 2022-04-11 22:38:34
 */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useMemoizedFn, useUpdate } from 'ahooks';
import { IconPaperclip, IconPhoto, IconFileInfo } from '@tabler/icons';

import ImageCarouselModal from './ImageCarouselModal';
import { generateFileDownload } from '../../common';
import ListItem from './ListItem';

const UploadList = (props) => {
  const {
    listType,
    items,
    previewFile,
    onPreview,
    onDownload,
    onRemove,
    iconRender,
    isImage,
    style,
    ...restProps
  } = props;
  const forceUpdate = useUpdate();
  const [ open, setOpen ] = useState(false);
  const [ selectedItem, setSelectedItem ] = useState(0);
  // 更新文件的预览图
  useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    (items || []).forEach((file) => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !window.FileReader ||
        !window.File ||
        file.url !== undefined
      ) {
        return;
      }
      file.url = '';
      if (previewFile) {
        previewFile(file).then((previewDataUrl) => {
          // Need append '' to avoid dead loop
          file.url = previewDataUrl || '';
          forceUpdate();
        });
      }
    });
  }, [ listType, items, previewFile ]);

  const onInternalDownload = useMemoizedFn((file) => {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    } else if (file.name) {
      generateFileDownload(file, file.name);
    }
  });

  const internalIconRender = useMemoizedFn((file) => {
    if (iconRender && typeof iconRender === 'function') {
      return iconRender(file, listType);
    }
    const fileIcon = isImage && isImage(file) ? <IconPhoto size='1.2rem' color={file.error ? 'red' : 'grey'}/> : <IconFileInfo size='1.2rem' color={file.error ? 'red' : 'grey'}/>;
    if (listType === 'picture' || listType === 'picture-card') {
      return fileIcon;
    }
    return <IconPaperclip size='1.2rem' color={file.error ? 'red' : 'grey'}/>;
  });

  const imagesList = (items || []).filter((item) => isImage(item) && (item.url || item.thumbUrl)).map((item, index) => ({ src: item.url || item.thumbUrl, title: item.name, itemIndex: index }));

  const getImageIndex = useMemoizedFn((file, imagesList) => {
    const index = imagesList.filter((item) => item.src === file.url || item.src === file.thumbUrl)[0]?.itemIndex ?? -1;
    return index;
  });

  const onClickThumb = useMemoizedFn((index) => {
    if (index === -1) { return; }
    if (imagesList.length) {
      setSelectedItem(index);
      setOpen(true);
    }
  });

  return (
    <div
      style={{
        display: 'block',
        width: '100%',
        fontSize: '14px',
        alignItems: 'center',
        ...(style || {}),
      }}
    >
      { !!imagesList.length && (
        <ImageCarouselModal
          images={imagesList}
          selectedItem={selectedItem}
          onChange={(index) => setSelectedItem(index)}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
      {items.map((file, index) => (
        <ListItem
          key={`${index}-${file.name}`}
          file={file}
          imagesList={imagesList}
          imageIndex={getImageIndex(file, imagesList)}
          onClickThumb={onClickThumb}
          listType={listType}
          onRemove={onRemove}
          onDownload={onInternalDownload}
          onPreview={onPreview}
          iconRender={internalIconRender}
          isImage={isImage}
          {...restProps}
        />
      ))}
    </div>
  );
};

UploadList.propTypes = {
  previewFile: PropTypes.func,
  iconRender: PropTypes.func,
  isImage: PropTypes.func,
  onRemove: PropTypes.func,
  onDownload: PropTypes.func,
  onPreview: PropTypes.func,
  items: PropTypes.array.isRequired,
};

export default UploadList;
