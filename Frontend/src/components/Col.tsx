import React from "react";
/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";

type ColProps = {
  children: React.ReactNode;
  reversed?: boolean;
  styles?: SerializedStyles;
};

const Col: React.FC<ColProps> = (props: ColProps) => {
  const { reversed, styles } = props;
  return (
    <div
      css={[
        {
          display: "flex",
          flexDirection: reversed ? "column-reverse" : "column"
        },
        styles
      ]}
    >
      {props.children}
    </div>
  );
};

Col.defaultProps = {
  reversed: false,
  styles: undefined
};

export default Col;
