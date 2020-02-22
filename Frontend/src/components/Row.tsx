import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

type RowProps = {
  children: React.ReactNode;
  reversed?: boolean;
  className?: string;
};

const Row: React.FC<RowProps> = (props: RowProps) => {
  const { reversed, className } = props;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: reversed ? "row-reverse" : "row"
      }}
      className={className}
    >
      {props.children}
    </div>
  );
};

Row.defaultProps = {
  reversed: false,
  className: undefined
};

export default Row;
