# Notes
- It would be more beneficial to pull the data using GraphQL (via Apollo) so that we can retrieve only the data we need. To do this I would need the Shopify store URL and X-Shopify-Storefront-Acess-Token header value which understandably might be a secruity issue at this stage
- 'Order Type' data doesn't seem to be availble ie 'One-time'
- Address field line2 is optional in the data source. Both hardcoded orders do not show line2 but the second order does include the data so I added it it optionally (formats correctly with ', ')
- Future updates I would:
	- Add a simple css fade in effect on OrderHistoryItem based on a 'loading' state to avoid the harsh content load
	- Add tests with Jest, maybe where the new cumulative price is calculated when we combine the powder products
