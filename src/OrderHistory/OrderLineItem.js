import React from 'react'
import PropTypes from 'prop-types'

const OrderLineItem = (props) => {
	const { image, title, variantTitle, qty, price } = props

	return (
		<div className="column is-6">
			<div className="media">
				<div className="media-left">
					<img
						alt="Product bars"
						className="image"
						src={image}
					/>
				</div>
				<div className="media-content">
					<div>
						<p className="product-title">
							{title}
						</p>
						<p className="product-variants">{qty}x {variantTitle}</p>
					</div>
				</div>
				<div className="media-right">
					<p className="product-price">${price}</p>
				</div>
			</div>
		</div>
	)
}

OrderLineItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variantTitle: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
}

export default OrderLineItem