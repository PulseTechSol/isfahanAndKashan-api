import React from 'react';
import { flat } from 'adminjs';

const formatGbp = (pence) => {
  if (pence == null || pence === '') return '—';
  const n = Number(pence);
  if (Number.isNaN(n)) return String(pence);
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n / 100);
};

const OrderItemsShow = ({ property, record }) => {
  const items = flat.get(record.params, property.path) || [];
  const totalAmount = flat.get(record.params, 'totalAmount') ?? 0;
  const arr = Array.isArray(items) ? items : [];

  const subtotalPence = arr.reduce(
    (sum, item) =>
      sum + (Number(item?.priceAmount) || 0) * (Number(item?.quantity) || 0),
    0,
  );
  const shippingPence = Math.max(0, Number(totalAmount) - subtotalPence);

  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {arr.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: 16,
              background: '#f8f9fa',
              borderRadius: 8,
              border: '1px solid #eee',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 8,
                overflow: 'hidden',
                background: '#e9ecef',
                flexShrink: 0,
              }}
            >
              {item?.productImage ? (
                <img
                  src={item.productImage}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#868e96',
                    fontSize: 12,
                  }}
                >
                  No image
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                {item?.productName || item?.productSlug || 'Item'}
              </div>
              <div style={{ fontSize: 13, color: '#495057' }}>
                Qty: {item?.quantity ?? 1} × {formatGbp(item?.priceAmount)} ={' '}
                {formatGbp((item?.priceAmount ?? 0) * (item?.quantity ?? 1))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid #dee2e6',
          maxWidth: 280,
          marginLeft: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 14,
          }}
        >
          <span>Subtotal</span>
          <span>{formatGbp(subtotalPence)}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 14,
          }}
        >
          <span>Shipping</span>
          <span>{formatGbp(shippingPence)}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: 16,
            paddingTop: 8,
          }}
        >
          <span>Total</span>
          <span>{formatGbp(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsShow;
