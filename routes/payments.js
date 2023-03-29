import express from "express"
import mercadopago from "mercadopago"

const router = express.Router()

mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY })

router.post("/", (req, res) => {
    const don = req.body
    let preference = {
        items: [ {
            id: 123,
            title: don.title,
            currency_id: 'ARS',
            picture_url: don.image,
            descriptopn: don.description,
            category_id: 'donion',
            quantity: 1,
            unit_price: don.price,

        }],
        back_urls: {
            success: 'http://localhost:3000',
            failure: '',
            pending: '',
        },
        auto_return: "approved",
        binary_mode: true,
    }
    mercadopago.preferences
               .create(preference)
               .then((response) => res.status(200)
               .send( {response} ))
               .catch((error) => res.status(400)
               .send( {error: error.message}))
})

export default router