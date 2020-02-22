import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

type RowProps = {
  children: React.ReactNode;
  reversed?: boolean;
};

const Row: React.FC<RowProps> = (props: RowProps) => {
  const { reversed } = props;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: reversed ? "row-reverse" : "row"
      }}
    >
      {props.children}
    </div>
  );
};

Row.defaultProps = {
  reversed: false
};

export default Row;
