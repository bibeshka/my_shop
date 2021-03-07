import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import useInput from "../../hooks/useInput";
import urlBasic from "../../utils/UrlVar";

import SuccessPaymant from "./SuccessPaymant";
import ErrorWindow from "../Utils_Components/ErrorWindow";

const StripeForm = ({
  total,
  cartProducts,
  email_state,
  name_state,
  addOrder,
}) => {
  //Stripe state
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  //form order state
  const email = useInput(email_state ? email_state : "");
  const phone = useInput("");
  const name = useInput(name_state ? name_state : "");

  const builData = {
    name: name.value,
    email: email.value,
    total: total * 100,
    stripeClientSecret: clientSecret,
    order_items: cartProducts,
  };

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
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
  }, [total]); //check later

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
      addOrder(ev, builData);
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
        <CardElement id="card-element" />

        <input
          type="text"
          value={name.value}
          {...name}
          required
          placeholder="Enter Name"
        />

        <input
          type="text"
          value={phone.value}
          {...phone}
          required
          placeholder="Enter your phone number"
        />

        <input
          type="email"
          value={email.value}
          {...email}
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
        {error && <ErrorWindow error={error} />}
      </form>
      {/* Show a success message upon completion */}
      <div className={succeeded ? "result-message" : "result-message hidden"}>
        <SuccessPaymant
          name={name.value}
          email={email.value}
          phone={phone.value}
        />
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
