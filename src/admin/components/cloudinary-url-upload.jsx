import React, { useState } from 'react';
import { EditPropertyProps, flat } from 'adminjs';
import {
  DropZone,
  FormGroup,
  Label,
  DropZoneItem,
} from '@adminjs/design-system';

const UPLOAD_URL = '/cloudinary/upload';
const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
];

const CloudinaryUrlUpload = ({ property, record, onChange }) => {
  const { params } = record;
  const custom = (property && property.custom) || {};
  const isMultiple = custom.isMultiple ?? false;

  const currentValue = flat.get(params, property.path);
  const urls = isMultiple
    ? Array.isArray(currentValue)
      ? currentValue
      : currentValue
        ? [currentValue]
        : []
    : currentValue
      ? [currentValue]
      : [];

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Upload failed');
    }
    const data = await res.json();
    return data.url;
  };

  const onFilesSelected = async (files) => {
    setError(null);
    setUploading(true);
    try {
      const newUrls = [];
      for (const file of files) {
        const url = await uploadFile(file);
        newUrls.push(url);
      }
      if (isMultiple) {
        onChange(property.path, [...urls, ...newUrls]);
      } else {
        onChange(property.path, newUrls[0] || '');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => {
    if (isMultiple) {
      const newUrls = urls.filter((_, i) => i !== index);
      onChange(property.path, newUrls);
    } else {
      onChange(property.path, '');
    }
  };

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      {uploading && <div style={{ marginBottom: 8 }}>Uploading...</div>}
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <DropZone
        onChange={onFilesSelected}
        multiple={isMultiple}
        validate={{ mimeTypes: ALLOWED_TYPES, maxSize: 10 * 1024 * 1024 }}
        files={[]}
      />
      {urls.filter(Boolean).map((url, index) => (
        <DropZoneItem
          key={url}
          filename={url.split('/').pop() || `Image ${index + 1}`}
          src={url}
          onRemove={() => handleRemove(index)}
        />
      ))}
    </FormGroup>
  );
};

export default CloudinaryUrlUpload;
