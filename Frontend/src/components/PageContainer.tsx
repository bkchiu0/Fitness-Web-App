import React from "react";
/** @jsx jsx */
import { jsx, SerializedStyles } from "@emotion/core";

type PageContainerProps = {
  children: React.ReactNode;
  styles?: SerializedStyles;
};

const PageContainer: React.FC<PageContainerProps> = (
  props: PageContainerProps
) => {
  const { styles } = props;
  return (
    <div
      css={[
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          margin: "auto"
        },
        styles
      ]}
    >
      {props.children}
    </div>
  );
};

PageContainer.defaultProps = {
  styles: undefined
};

export default PageContainer;
