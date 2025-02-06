import React, { FC, FormEvent, useState } from "react";

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, email });
  };

  return (
    <div className="flex flex-col gap-5 bg-base-100 p-6 rounded-lg m-6">
      <p className="text-2xl">Get ready to meet your new best friend!</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="login-name" className="text-lg">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          id="login-name"
          placeholder="Fido"
          className="input input-bordered"
        />
        <label htmlFor="login-email" className="text-lg mt-3">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="login-email"
          type="text"
          placeholder="bark@park.com"
          className="input input-bordered"
        />
        <button
          type="submit"
          className="btn btn-primary mt-3 text-lg"
          disabled={!name || !email}
        >
          Login
        </button>
      </form>
    </div>
  );
};
