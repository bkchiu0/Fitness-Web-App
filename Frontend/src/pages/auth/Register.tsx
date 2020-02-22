import React, { useState } from "react";
import { RouteProps } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import PageContainer from "components/PageContainer";
import Col from "components/Col";

type RegisterFormProps = {} & RouteProps;

const RegisterForm: React.FC<RegisterFormProps> = (
  props: RegisterFormProps
) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
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

        <button onClick={() => console.log()}>Register</button>
      </Col>
    </PageContainer>
  );
};

export default RegisterForm;
