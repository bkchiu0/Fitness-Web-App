import React, { useState } from "react";
import Cookie from "js-cookie";
import { RouteProps } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { AxiosResponse } from "axios";

import PageContainer from "components/PageContainer";
import Col from "components/Col";
import { registerUser } from "models/requests/authRequests";

type RegisterFormProps = {} & RouteProps;

const registrationHandler = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPass: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  if (password !== confirmPass) {
    setErrorMessage("Passwords are incorrect.");
    return;
  }
  try {
    const response = await registerUser({
      firstName,
      lastName,
      email,
      password
    });
    const bearerToken: string = response.headers.authentication;
    Cookie.set("authentication", bearerToken);
  } catch (e) {
    const { response }: { response: AxiosResponse } = e;
    setErrorMessage(response.statusText);
  }
};

const RegisterForm: React.FC<RegisterFormProps> = (
  props: RegisterFormProps
) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMesage, toggleErrorMessage] = useState("");
  return (
    <PageContainer>
      <Col styles={css({ flex: "0 1 25%" })}>
        <label>First Name</label>
        <input
          type="text"
          value={first}
          onChange={event => setFirst(event.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          value={last}
          onChange={event => setLast(event.target.value)}
        />

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPass}
          onChange={event => setConfirmPass(event.target.value)}
        />

        <button
          onClick={() =>
            registrationHandler(
              first,
              last,
              email,
              password,
              confirmPass,
              toggleErrorMessage
            )
          }
        >
          Register
        </button>

        {errorMesage === "" ? null : <div>{errorMesage}</div>}
      </Col>
    </PageContainer>
  );
};

export default RegisterForm;
