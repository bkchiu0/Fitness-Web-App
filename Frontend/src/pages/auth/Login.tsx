import React, { useState } from "react";
import { RouteProps } from "react-router";

type LoginFormProps = {} & RouteProps;

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <label>Email</label>
      <input type="text" />

      <label>Password</label>
      <input type="password" />

      <button>login</button>
    </div>
  );
};

export default LoginForm;
