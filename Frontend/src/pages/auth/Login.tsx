import React, { useState } from "react";
import Cookie from "js-cookie";
import { RouteProps } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { AxiosResponse } from "axios";

import PageContainer from "components/PageContainer";
import Col from "components/Col";
import { loginUser } from "models/requests/authRequests";

type LoginFormProps = {} & RouteProps;

const loginHandler = async (
  email: string,
  password: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  try {
    const response = await loginUser({
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

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesage, toggleErrorMessage] = useState("");
  return (
    <PageContainer>
      <Col styles={css({ flex: "0 1 25%" })}>
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

        <button
          onClick={() => loginHandler(email, password, toggleErrorMessage)}
        >
          login
        </button>

        {errorMesage === "" ? null : <div>{errorMesage}</div>}
      </Col>
    </PageContainer>
  );
};

export default LoginForm;
