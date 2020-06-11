import React from 'react'
import PropTypes from 'prop-types'
import OrderLineItem from './OrderLineItem'

const OrderHistoryItem = (props) => {
  const { orderName, totalPrice, delivered, lineItems, shippingAddress, dispatchedOn } = props
  
  return (
    <div>
      <div className="column is-12">
        <div className="box orders-history-block has-shadow-hover">
          <div className="is-flex orders-block-header">
            <div className="item">
              <div>Order Number</div>
              <div>{orderName}</div>
            </div>

            <div className="item">
              <div>Order Type</div>
              <div>
                <p className="is-onetime">One-time</p>
              </div>
            </div>
            <div className="item">
              <div>Price</div>
              <div>${totalPrice}</div>
            </div>
            <div className="item">
              <div>Dispatch Date</div>
              <div>{dispatchedOn}</div>
            </div>
          </div>

          <hr />

          <div className="order-information">
            <p className="title is-6 is-marginless">
              It&apos;s been {delivered}!
            </p>

            <div>
              <div className="order-information-expanded">
                <div className="product-list-boxes columns is-multiline">
                  {lineItems.map((item) => {
                    console.log(item)
                    return (
                      <OrderLineItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        variantTitle={item.variant_title}
                        qty={item.quantity}
                        price={item.price}
                      />
                    )
                  })}
                </div>
                <hr />
                <div className="is-flex order-footer-information">
                  <div className="left-info">
                    <div>Delivery Address</div>
                    <div>{shippingAddress}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

OrderHistoryItem.propTypes = {
  orderName: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  delivered: PropTypes.string.isRequired,
  lineItems: PropTypes.array.isRequired,
  shippingAddress: PropTypes.string.isRequired,
  dispatchedOn: PropTypes.string.isRequired
}

export default OrderHistoryItem
