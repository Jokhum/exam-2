import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Please enter your name.").min(3, "The name must be at least 3 characters!"),
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address!"),
  subject: yup.string().required("Please enter a subject.").min(5, "Subject must be atleast 5 characters!"),
  message: yup.string().required("Please enter a message.").min(15, "Please provide atleast 15 characters as your message!"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const success = document.querySelector(".success");
    const form = document.querySelector(".contactForm");
    success.style.display = "block";

    form.reset();
    console.log(data);
  }

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="contactForm">
        <div className="contactForm__item">
          <label htmlFor="fullName">Full Name:</label>
          <input {...register("fullName")} placeholder="Your name here..." />
          {errors.fullName && <span className="error">{errors.fullName.message}</span>}
        </div>

        <div className="contactForm__item">
          <label htmlFor="email">E-mail:</label>
          <input {...register("email")} placeholder="Your mail address here..." />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="contactForm__item">
          <label htmlFor="subject">Subject:</label>
          <input {...register("subject")} placeholder="Your subject here..." />
          {errors.subject && <span className="error">{errors.subject.message}</span>}
        </div>
        <div className="contactForm__item">
          <label htmlFor="message">Message:</label>
          <textarea {...register("message")} placeholder="Your message here..." />
          {errors.message && <span className="error">{errors.message.message}</span>}
        </div>
        <span className="success">Your message has been sent!</span>
        <div className="centered">
          <button className="contactForm__button">Send</button>
        </div>
      </form>
    </>
  );
}
