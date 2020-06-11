import React from 'react';
import PageHeader from './PageHeader';
import OrderHistoryItemOriginal from './OrderHistoryItemOriginal';

const OrderHistory = () => {
  return (
    <div className="columns is-multiline">
      <PageHeader title="Order History (original)" />
      <OrderHistoryItemOriginal />
    </div>
  );
};

export default OrderHistory;
