import React, { useState, useEffect } from "react";
import { RouteProps } from "react-router";

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
    <div>
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
    </div>
  );
};

export default RegisterForm;
