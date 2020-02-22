import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

type ColProps = {
  children: React.ReactNode;
  reversed?: boolean;
  className?: string;
};

const Col: React.FC<ColProps> = (props: ColProps) => {
  const { reversed, className } = props;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: reversed ? "column-reverse" : "column"
      }}
      className={className}
    >
      {props.children}
    </div>
  );
};

Col.defaultProps = {
  reversed: false,
  className: undefined
};

export default Col;
