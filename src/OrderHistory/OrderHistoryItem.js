import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import OrderLineItem from './OrderLineItem'

const OrderHistoryItem = (props) => {
  const { orderName, totalPrice, delivered, lineItems, shippingAddress, dispatchedOn } = props
  const [formattedLineItems, setFormattedLineItems] = useState([])
  
  useEffect(() => {
    // Format line items data object
    let newFormattedLineItems = []

    lineItems.forEach(item => {
      const qty = item.quantity
      const calculatedPrice = item.price * qty

      let newItem = {
        id: item.id,
        image: item.image,
        title: item.title,
        variantTitle: qty + 'x ' + item.variant_title,
        qty: qty,
        price: calculatedPrice.toFixed(2),
        sku: item.sku
      }

      const appendQty = () => item.quantity + 'x '

      /*
        Format Ready-to-drink title to not include flavour
        and move flavour into variant slot
      */
      if (item.sku.includes('RTD12-')) {
        const splitAt = 'Huel '
        const newVariant = item.title.split(splitAt)[1]

        newItem.title = 'Huel Ready-to-drink'
        newItem.variantTitle = appendQty() + newVariant
      }

      // Apply title as variant if null
      if (!item.variant_title)
        newItem.variantTitle = appendQty() + item.title
      
      /*
        Format powder title to not include flavour
        and move flavour into variant slot
      */
      if (item.sku.includes('POW-')) {
        const splitAt = 'Huel Powder'
        const newVariant = item.title.split(splitAt)[1]

        newItem.title = splitAt
        newItem.variantTitle = appendQty() + newVariant
      }

      // Add new item
      newFormattedLineItems.push(newItem)
    })

    /*
      Loop over newly formatted items array to
      see if we have a match on a powder product
      and move all flavours (products) into 1 variant
      slot on 1 line_item component
    */
    let triggered = false
    let firstPowderIndex = 0
    let powderItemsToRemove = []

    // Find the first instance of the powder product
    for (let i = 0; i < newFormattedLineItems.length; i++) {
      if (triggered)
        break

      const thisItem = newFormattedLineItems[i]
      if (thisItem.sku.includes('POW-')) {
        firstPowderIndex = i
        triggered = true
      }
    }

    // Loop again to assign values to first powder product
    for (let i = 0; i < newFormattedLineItems.length; i++) {

      const thisItem = newFormattedLineItems[i]
      if (thisItem.sku.includes('POW-') && i !== firstPowderIndex) {
        const itemToUpdate = newFormattedLineItems[firstPowderIndex]
        
        // Append the variantTitle
        const thisVariantTitle = newFormattedLineItems[i].variantTitle
        const originalVariantTitle = itemToUpdate.variantTitle
        itemToUpdate.variantTitle = originalVariantTitle + ', ' + thisVariantTitle
        
        // Calculate and update the price
        const qty = newFormattedLineItems[i].qty
        const thisPrice = newFormattedLineItems[i].price * qty
        const originalPrice = itemToUpdate.price
        const newPrice = parseInt(originalPrice) + parseInt(thisPrice)
        itemToUpdate.price = newPrice.toFixed(2)

        // Set this item to be removed from the array
        powderItemsToRemove.push(i)
      }
    }

    // Remove excess powder items from array
    for (let i = powderItemsToRemove.length -1; i >= 0; i--) 
      newFormattedLineItems.splice(powderItemsToRemove[i], 1)

    // Push correctly formatted items to state
    setFormattedLineItems(newFormattedLineItems)
  }, [])

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
                  {formattedLineItems.map((item, index) => {
                    return (
                      <OrderLineItem
                        key={index + '-' + item.id}
                        image={item.image}
                        title={item.title}
                        variantTitle={item.variantTitle}
                        qty={item.qty}
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
