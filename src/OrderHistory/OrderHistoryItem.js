import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const OrderHistoryItem = (props) => {
  const { orderName, totalPrice, delivered, lineItems, shippingAddress, dispatchedOn } = props
  
  useEffect(() => {
    
  })
  
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
                  <div className="column is-6">
                    <div className="media">
                      <div className="media-left">
                        <img
                          alt="Product bars"
                          className="image"
                          src="https://huel-assets.s3.eu-west-2.amazonaws.com/temp-public/thumbnails/rtd.jpg"
                        />
                      </div>
                      <div className="media-content">
                        <div>
                          <p className="product-title">Huel Ready-to-drink</p>
                          <p className="product-variants">
                            2x Ready-to-drink Vanilla
                          </p>
                        </div>
                      </div>
                      <div className="media-right">
                        <p className="product-price">$99.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="media">
                      <div className="media-left">
                        <img
                          alt="Product bars"
                          className="image"
                          src="https://cdn.shopify.com/s/files/1/1374/5287/products/Free_Tshirt_and_Shaker.png?v=1551882727"
                        />
                      </div>
                      <div className="media-content">
                        <div>
                          <p className="product-title">
                            Free T-Shirt &amp; Shaker
                          </p>
                          <p className="product-variants">1x Small / Male</p>
                        </div>
                      </div>
                      <div className="media-right">
                        <p className="product-price">$0.00</p>
                      </div>
                    </div>
                  </div>
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
