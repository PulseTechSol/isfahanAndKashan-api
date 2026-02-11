import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { flat } from 'adminjs';

const STATUSES = [
  { value: 'pending', label: 'Pending', color: '#b45309', bg: '#fef3c7' },
  { value: 'paid', label: 'Paid', color: '#047857', bg: '#d1fae5' },
  { value: 'shipped', label: 'Shipped', color: '#1d4ed8', bg: '#dbeafe' },
  { value: 'rejected', label: 'Rejected', color: '#b91c1c', bg: '#fee2e2' },
  { value: 'failed', label: 'Failed', color: '#7f1d1d', bg: '#fecaca' },
  { value: 'refunded', label: 'Refunded', color: '#6d28d9', bg: '#ede9fe' },
  { value: 'cancelled', label: 'Cancelled', color: '#475569', bg: '#f1f5f9' },
];

const OrderStatusList = ({ property, record, resource, where }) => {
  const currentStatus = flat.get(record.params, property.path) || 'pending';
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const orderId = record?.id ?? record?.params?._id ?? record?.params?.id;
  const resourceId = resource?.id ?? 'Order';
  const statusMeta = STATUSES.find((s) => s.value === status) || STATUSES[0];
  const [dropdownRect, setDropdownRect] = useState(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const isShowPage = where === 'show';

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      const inCell = containerRef.current && containerRef.current.contains(e.target);
      const inDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
      if (!inCell && !inDropdown) setOpen(false);
    };
    document.addEventListener('click', close, true);
    return () => document.removeEventListener('click', close, true);
  }, [open]);

  useEffect(() => {
    if (open && buttonRef.current) {
      setDropdownRect(buttonRef.current.getBoundingClientRect());
    } else {
      setDropdownRect(null);
    }
  }, [open]);

  const handleSelect = async (newStatus) => {
    setOpen(false);
    if (newStatus === status) return;
    if (!orderId) {
      setError('Order ID missing');
      return;
    }
    setStatus(newStatus);
    setError(null);
    setLoading(true);
    try {
      const rootPath = (typeof window !== 'undefined' && window.REDUX_STATE?.paths?.rootPath) || '/admin';
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const url = `${origin}${rootPath}/api/resources/${resourceId}/records/${orderId}/updateStatus`;
      const form = new FormData();
      form.append('status', newStatus);
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.notice?.message || data.message || `Failed (${res.status})`);
    } catch (err) {
      setError(err?.message || 'Update failed');
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  const triggerPadding = isShowPage ? '12px 16px' : '6px 10px';
  const triggerMinWidth = isShowPage ? 160 : 120;
  const triggerFontSize = isShowPage ? 14 : 12;
  const triggerGap = isShowPage ? 12 : 8;
  const dotSize = isShowPage ? 10 : 6;
  const dropdownMinWidth = isShowPage ? 180 : 140;
  const optionPadding = isShowPage ? '12px 16px' : '8px 12px';
  const optionFontSize = isShowPage ? 14 : 12;

  return (
    <div
      ref={containerRef}
      data-order-status-cell
      style={{
        minWidth: isShowPage ? 280 : 220,
        padding: isShowPage ? '8px 0' : '2px 0',
        position: 'relative',
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {isShowPage && (
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
          {property?.title || 'Order status'}
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        title="Change order status"
        disabled={loading}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen((v) => !v);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: triggerGap,
          minWidth: triggerMinWidth,
          padding: triggerPadding,
          fontSize: triggerFontSize,
          fontWeight: 600,
          borderRadius: isShowPage ? 10 : 6,
          border: `2px solid ${statusMeta.color}`,
          outline: 'none',
          background: loading ? '#e2e8f0' : statusMeta.bg,
          color: statusMeta.color,
          cursor: loading ? 'wait' : 'pointer',
          boxShadow: isShowPage ? '0 2px 8px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.05)',
          textAlign: 'left',
          transition: 'box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!loading && !open) e.currentTarget.style.boxShadow = `0 4px 12px ${statusMeta.color}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = isShowPage ? '0 2px 8px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.05)';
        }}
      >
        <span
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            flexShrink: 0,
            backgroundColor: statusMeta.color,
          }}
        />
        <span style={{ flex: 1 }}>{statusMeta.label}</span>
        <span style={{ opacity: 0.8, fontSize: isShowPage ? 12 : 10 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && dropdownRect && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          role="listbox"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: dropdownRect.left,
            top: dropdownRect.bottom + 6,
            minWidth: dropdownMinWidth,
            maxHeight: 320,
            overflow: 'auto',
            background: '#fff',
            borderRadius: isShowPage ? 12 : 8,
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            zIndex: 10000,
          }}
        >
          {STATUSES.map((s, idx) => {
            const isSelected = s.value === status;
            const isLast = idx === STATUSES.length - 1;
            return (
              <button
                key={s.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleSelect(s.value); }}
                onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: triggerGap,
                  width: '100%',
                  padding: optionPadding,
                  fontSize: optionFontSize,
                  fontWeight: isSelected ? 600 : 500,
                  border: 'none',
                  borderRadius: isLast ? (isShowPage ? '0 0 11px 11px' : '0 0 7px 7px') : 0,
                  background: isSelected ? s.bg : '#fff',
                  color: s.color,
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderBottom: isLast ? 'none' : '1px solid #f3f4f6',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = '#fff';
                }}
              >
                <span
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: '50%',
                    flexShrink: 0,
                    backgroundColor: s.color,
                  }}
                />
                {s.label}
              </button>
            );
          })}
        </div>,
        document.body
      )}

      {loading && (
        <span style={{ fontSize: isShowPage ? 12 : 11, color: '#6b7280', marginTop: 6, display: 'block' }}>
          Updating…
        </span>
      )}
      {error && (
        <div style={{ fontSize: isShowPage ? 12 : 11, color: '#dc2626', marginTop: 6, fontWeight: 600 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default OrderStatusList;
