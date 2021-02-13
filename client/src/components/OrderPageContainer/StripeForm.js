import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { addOrder } from "../../utils/fetchData";
import SuccessPaymant from "./SuccessPaymant";
import urlBasic from "../../utils/UrlVar";
import ErrorWindow from "../Utils_Components/ErrorWindow";

const StripeForm = ({ total, cartProducts, email_state, name_state }) => {
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
    email_state && setEmail(email_state);
    name_state && setName(name_state);

    const stripeRequest = async () => {
      try {
        const request = await fetch(
          `${urlBasic}/api/v1/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: (total.toFixed(2) * 100).toFixed(0),
            }),
          }
        );

        const data = await request.json();

        setClientSecret(data.clientSecret);
        setDisabled(false);

        return data;
      } catch (err) {
        console.log(err);
        setError("Something goes wrong! Try do it later.");
        setProcessing(false);
        setDisabled(true);
      }
    };

    //run ufter component loading
    if (total > 0) {
      stripeRequest();
    } else {
      setError("You need to add something in shopping cart!");
    }
  }, [total, email_state, name_state]); //check later

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
    // setDisabled(event.empty);
    // setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.persist();
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
    } else if (clientSecret !== "") {
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
    } else {
      setError("To many requests");
      setProcessing(false);
    }
  };

  return (
    <div className="stripe-form-component">
      <form
        id="payment-form"
        onSubmit={(ev) => handleSubmit(ev)}
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
        {/* {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )} */}
        {error && <ErrorWindow error={error} />}
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
