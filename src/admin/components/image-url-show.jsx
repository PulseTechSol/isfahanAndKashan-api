import React from 'react';
import { flat } from 'adminjs';

const ImageUrlShow = ({ property, record }) => {
  const value = flat.get(record.params, property.path);
  const custom = (property && property.custom) || {};
  const combineWithMain = custom.combineWithMain === true;

  let urls = Array.isArray(value) ? value : value ? [value] : [];
  if (combineWithMain && property.path === 'images') {
    const main = flat.get(record.params, 'mainImage');
    const mainArr = main ? [main] : [];
    urls = [...mainArr, ...(Array.isArray(urls) ? urls : [])];
  }

  urls = urls.filter(Boolean);
  if (!urls.length) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'flex-start',
      }}
    >
      {urls.map((url) => (
        <img
          key={url}
          src={url}
          alt=""
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: 4,
            border: '1px solid #eee',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
};

export default ImageUrlShow;
