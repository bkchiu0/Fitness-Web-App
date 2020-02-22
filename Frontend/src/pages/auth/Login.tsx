import React from "react";
import { RouteProps } from "react-router";

import PageContainer from "components/PageContainer";
import Col from "components/Col";

type LoginFormProps = {} & RouteProps;

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  return (
    <PageContainer>
      <Col>
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
