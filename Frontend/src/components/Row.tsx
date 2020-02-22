import React from "react";
/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";

type RowProps = {
  children: React.ReactNode;
  reversed?: boolean;
  styles?: SerializedStyles;
};

const Row: React.FC<RowProps> = (props: RowProps) => {
  const { reversed, styles } = props;
  return (
    <div
      css={[
        {
          display: "flex",
          flexDirection: reversed ? "row-reverse" : "row"
        },
        styles
      ]}
    >
      {props.children}
    </div>
  );
};

Row.defaultProps = {
  reversed: false,
  styles: undefined
};

export default Row;
