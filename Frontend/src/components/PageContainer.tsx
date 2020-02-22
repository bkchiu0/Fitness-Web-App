import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

type PageContainerProps = {
  children: React.ReactNode;
};

const RegisterForm: React.FC<PageContainerProps> = (
  props: PageContainerProps
) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "60%",
        margin: "auto"
      }}
    >
      {props.children}
    </div>
  );
};

export default RegisterForm;
