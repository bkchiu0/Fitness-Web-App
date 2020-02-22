import React from "react";
import { RouteProps } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import PageContainer from "components/PageContainer";
import Col from "components/Col";

type LoginFormProps = {} & RouteProps;

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  return (
    <PageContainer>
      <Col styles={css({ flex: "0 1 25%" })}>
        <label>Email</label>
        <input type="text" />

        <label>Password</label>
        <input type="password" />

        <button>login</button>
      </Col>
    </PageContainer>
  );
};

export default LoginForm;
