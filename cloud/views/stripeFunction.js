require("cloud/app.js");

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account
var stripe = require("stripe")( "sk_test_sr52IMYk7RCWAEIhZhmQh21L" );

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form

AV.Cloud.define("stripeCharge", function(request, response) {

  	var stripeToken = request.object.get("stripeToken");

	var charge = stripe.charges.create({
 		amount: 1000, // amount in cents, again
  		currency: "usd",
  		card: stripeToken,
  		description: "payinguser@example.com"
	}, function(err, charge) {
  		if (err && err.type === 'StripeCardError') {
    		response.error("declined");
  		}
  		response.success(charge);


	});


});