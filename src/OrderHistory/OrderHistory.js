import React, { useState, useEffect } from 'react'
import PageHeader from '../PageHeader'
import OrderHistoryItem from './OrderHistoryItem'
import axios from 'axios'
import dayjs from 'dayjs'

const OrderHistoryDynamic = () => {
	const [orderData, setOrderData] = useState([])

	const handleStructureOrderData = (orders) => {
    let structuredOrderData = []
    
		orders.forEach(order => {
      // Format data
      const delivered = order.delivered ? 'delivered' : 'dispatched'
      const shippingAddress = order.shipping_address
      const address = shippingAddress.address1 + (shippingAddress.address2 ? ', ' + shippingAddress.address2 : '') + ', ' + shippingAddress.city + ', ' + shippingAddress.zip
      const processedAt = order.processed_at

      // Add superscript to day of month
      let day = dayjs(processedAt).format('D')
      const superscriptDay = (day) => {
        if (day >= 11 && day <= 13)
          return 'th'

        switch (day % 10) {
          case 1:  return 'st'
          case 2:  return 'nd'
          case 3:  return 'rd'
          default: return 'th'
        }
      }
      day = day + superscriptDay(day)

      const month = dayjs(processedAt).format('MMMM')
      const year = dayjs(processedAt).format('YYYY')
      const date = `${month} ${day} ${year}`

      // Build data object
      const structuredOrder = {
        orderNumber: order.order_number,
        orderName: order.name,
				totalPrice: order.total_price,
				delivered: delivered,
				lineItems: order.line_items,
        shippingAddress: address,
        dispatchedOn: date
			}

			structuredOrderData.push(structuredOrder)
		})

    setOrderData(structuredOrderData)
	}

  // Get order data from api
	useEffect(() => {
		axios
			.get('https://cors-anywhere.herokuapp.com/https://reactasty.apps.huel.io/api/customer/orders')
			.then((response) => {
				handleStructureOrderData(response.data[0].orders)
			})
  }, [])
  
  const containerStyle = {
    width:
      '100%'
  }

  return (
    <div className="columns is-multiline">
      <PageHeader title="Order History (dynamic)" />
      <div style={containerStyle}>
        {orderData.map((order) => {
          return (
            <OrderHistoryItem
              key={order.orderNumber}
              orderName={order.orderName}
              totalPrice={order.totalPrice}
              delivered={order.delivered}
              lineItems={order.lineItems}
              shippingAddress={order.shippingAddress}
              dispatchedOn={order.dispatchedOn}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OrderHistoryDynamic
