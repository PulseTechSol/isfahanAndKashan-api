import React from 'react';
import { flat } from 'adminjs';

const ImageListCell = ({ property, record }) => {
  let url = flat.get(record.params, property.path);

  // mainImage: use mainImage or fallback to first image in images array
  if (property.path === 'mainImage' && !url) {
    const images = flat.get(record.params, 'images');
    url = Array.isArray(images) && images[0] ? images[0] : null;
  }
  // images: use first image from array
  if (property.path === 'images') {
    const images = Array.isArray(url) ? url : url ? [url] : [];
    url = images[0] || null;
  }

  if (!url || typeof url !== 'string') return null;

  return (
    <img
      src={url}
      alt=""
      style={{
        width: 56,
        height: 56,
        objectFit: 'cover',
        borderRadius: 6,
        display: 'block',
      }}
    />
  );
};

export default ImageListCell;
