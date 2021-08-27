module.exports = async function (context, req) {
    context.log(req.query);

    // STRIPE_SECRET_KEY is stored in the vault
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2020-08-27'
    });
    
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: session
    };
}