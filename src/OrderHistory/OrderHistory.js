import React, { useState, useEffect } from 'react'
import PageHeader from '../PageHeader'
import OrderHistoryItem from './OrderHistoryItem'
import axios from 'axios'

const OrderHistoryDynamic = () => {
	const [orderData, setOrderData] = useState([])

	const handleStructureOrderData = (orders) => {
		let structuredOrderData = []

		orders.forEach(order => {
			const structuredOrder = {
				order_number: order.order_number,
				total_price_usd: order.total_price_usd,
				delivered: order.delivered,
				fulfillment_status: order.fulfillment_status,
				line_items: {
					image: order.line_items.image,
					title: order.line_items.title,
					price: order.line_items.price,
					quantity: order.line_items.quantity,
					variant_title: order.line_items.variant_title
				},
				shipping_address: {
					address1: order.shipping_address.address1,
					address2: order.shipping_address.address2,
					city: order.shipping_address.city,
					zip: order.shipping_address.zip
				}
			}

			structuredOrderData.push(structuredOrder)
		})

		setOrderData(structuredOrderData)
	}

	useEffect(() => {
		axios
			.get('https://cors-anywhere.herokuapp.com/https://reactasty.apps.huel.io/api/customer/orders')
			.then((response) => {
				handleStructureOrderData(response.data[0].orders)
			})
	}, [])

  return (
    <div className="columns is-multiline">
      <PageHeader title="Order History (dynamic)" />
			{orderData.map((order) => {
				return <OrderHistoryItem key={order.order_number} />
			})}
    </div>
  )
}

export default OrderHistoryDynamic
