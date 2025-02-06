import React, { FC, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "./userSlice";

interface LoginProps {
  closeModal: () => void;
}

/**
 * Login component that allows the user to enter their name and email
 */
export const Login: FC<LoginProps> = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const userStatus = useAppSelector((state) => state.user.status);

  const dispatch = useAppDispatch();

  /**
   * Sends a login request to the server with the name and email
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ name, email }));
  };

  /**
   * Displays an error message for 3 seconds if the login request fails
   */
  const handleError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  /**
   * Closes the modal if the login request is successful; otherwise, displays an error message for 3 seconds
   */
  useEffect(() => {
    if (userStatus === "failed") {
      handleError();
    } else if (userStatus === "succeeded") {
      closeModal();
    }
  }, [userStatus]);

  return (
    <div className="flex flex-col bg-base-100 p-6 rounded-lg m-6">
      <p className="text-2xl mb-6">Get ready to meet your new best friend!</p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
          <label htmlFor="login-email" className="text-lg">
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
        </div>
        <button
          type="submit"
          className="btn btn-primary text-lg"
          disabled={!name || !email}
        >
          Login
        </button>
        {showError ? (
          <p className="w-full text-center text-error">
            invalid name and/or email
          </p>
        ) : null}
      </form>
    </div>
  );
};
