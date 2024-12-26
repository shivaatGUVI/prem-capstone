const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.paymentProcess=async (req,res,next) => {
    const { amount, token } = req.body;
    const paymentInten = await stripe.paymentIntents.create({
       
        amount:amount,
        currency:"usd",
        description: 'Charge for test@example.com',
    })
    res.status(200).json({
        success:true,
        client_secret:paymentInten.client_secret 
    }) 
}

exports.sendStripe=async (req,res,next) => {
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_KEY
    })
}