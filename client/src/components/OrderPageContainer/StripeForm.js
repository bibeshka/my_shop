import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { addOrder } from "../../utils/fetchData";
import SuccessPaymant from "./SuccessPaymant";

const StripeForm = ({ total, cartProducts }) => {
  //Stripe state
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  //form order state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    total > 0 &&
      window
        .fetch("http://localhost:5000/api/v1/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: total.toFixed(2) * 100 }),
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {},
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      addOrder(ev, {
        name,
        email,
        phone,
        total: total * 100,
        stripeClientSecret: clientSecret,
        order_items: cartProducts,
      });
    }
  };

  return (
    <div className="stripe-form-component">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className={succeeded ? "payment-form-hidden" : "payment-form"}
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter Name"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Enter your phone number"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email adress"
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Confirm"
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
      {/* Show a success message upon completion */}
      <div className={succeeded ? "result-message" : "result-message hidden"}>
        <SuccessPaymant name={name} email={email} phone={phone} />
        <p>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </div>
    </div>
  );
};

export default StripeForm;
