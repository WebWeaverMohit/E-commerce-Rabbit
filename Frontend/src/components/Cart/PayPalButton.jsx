import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const PayPalButton = ({ amount, onSuccess, onError, currency = 'USD' }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AYM6Igdz3fCEsdKr75_g4osYcBBVkkVSNi5T3WkpHR5qwdcYi9D1FQPNYFyH5m_jP579PQOaDBR0x8SF" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency_code: 'USD'
              }
            }]
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
