module.exports = async function (context, req) {
    context.log('Create STRIPE payment session with a pre-defined price/product');
    context.log(req.query.redirect_url);

    const domainURL = req.query.redirect_url; 
    
    // STRIPE_SECRET_KEY is stored in the vault
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2020-08-27'
    });
    
    const pmTypes = ('card').split(',').map((m) => m.trim());
  
    // Create new Checkout Session for the order
    const session = await stripe.checkout.sessions.create({
      payment_method_types: pmTypes,
      mode: 'payment',
      line_items: [{
        price: 'price_1JRXqnI1j8vpeqybwoPXGb1n',
        quantity: 1,
      }],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled`,
    });

    // Redirect to STRIPE
    context.res.status(302)
    context.res.header('Location', session.url)
    context.done()
}
