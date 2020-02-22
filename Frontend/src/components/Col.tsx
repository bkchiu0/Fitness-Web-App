import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

type ColProps = {
  children: React.ReactNode;
  reversed?: boolean;
};

const Col: React.FC<ColProps> = (props: ColProps) => {
  const { reversed } = props;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: reversed ? "column-reverse" : "column"
      }}
    >
      {props.children}
    </div>
  );
};

Col.defaultProps = {
  reversed: false
};

export default Col;
