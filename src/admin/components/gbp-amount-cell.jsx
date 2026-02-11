import React from 'react';
import { flat } from 'adminjs';

/**
 * Displays amount in pence as GBP (e.g. 133000 -> £1,330.00).
 * Use for list and show views.
 */
const GbpAmountCell = ({ property, record }) => {
  const value = flat.get(record.params, property.path);
  if (value == null || value === '') return '—';
  const pence = Number(value);
  if (Number.isNaN(pence)) return String(value);
  const pounds = pence / 100;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pounds);
};

export default GbpAmountCell;
