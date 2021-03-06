import { React, useState } from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../constants/api";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name.").min(3, "The name must be at least 3 characters!"),
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address!"),
  message: yup.string().required("Please enter a message.").min(15, "Please provide atleast 15 characters as your message!"),
});

export default function Modal({ closeModal, pageTitle, pageId }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const url = api + "enquiries/?populate=*";
    data.accommodation = { id: pageId };

    const options = {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log("response", json.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      history("/accommodations");
    }
  }

  return (
    <>
      <div className="ModalBackground">
        <form className="ModalForm" onSubmit={handleSubmit(onSubmit)}>
          <MdClose className="CloseModal" onClick={() => closeModal(false)} />
          <div className="ModalForm__title">
            <h1>Send an enquiry about {pageTitle} below:</h1>
          </div>
          <div className="ModalForm__Item">
            <label htmlFor="name">Name:</label>
            <input {...register("name")} placeholder="Your name here..." />
            {errors.subject && <span className="Error">{errors.subject.message}</span>}
          </div>
          <div className="ModalForm__Item">
            <label htmlFor="email">E-mail:</label>
            <input {...register("email")} placeholder="Your e-mail here..." />
            {errors.email && <span className="Error">{errors.email.message}</span>}
          </div>
          <div className="ModalForm__Item">
            <label htmlFor="accommodation">Accommodation:</label>
            <input {...register("accommodation")} value={pageTitle} disabled />
            {errors.accommodation && <span className="Error">{errors.accommodation.message}</span>}
          </div>
          <div className="ModalForm__Item">
            <label htmlFor="message">Message:</label>
            <textarea {...register("message")} placeholder="Your message here..." />
            {errors.message && <span className="Error">{errors.message.message}</span>}
          </div>
          {serverError && <span className="error">{serverError}</span>}
          <div className="Centered">
            <button>{submitting ? "Sending message..." : "Send"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
