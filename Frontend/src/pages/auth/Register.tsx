import React from "react";
import { RouteProps } from "react-router";

import PageContainer from "components/PageContainer";
import Col from "components/Col";

type RegisterFormProps = {} & RouteProps;

const RegisterForm: React.FC<RegisterFormProps> = (
  props: RegisterFormProps
) => {
  return (
    <PageContainer>
      <Col>
        <label>First Name</label>
        <input type="text" />

        <label>Last Name</label>
        <input type="text" />

        <label>Email</label>
        <input type="text" />

        <label>Password</label>
        <input type="password" />

        <label>Confirm Password</label>
        <input type="password" />

        <button>Register</button>
      </Col>
    </PageContainer>
  );
};

export default RegisterForm;
