import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = (
  props: PageContainerProps
) => {
  const { className } = props;
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "60%",
        margin: "auto"
      }}
      className={className}
    >
      {props.children}
    </div>
  );
};

PageContainer.defaultProps = {
  className: undefined
};

export default PageContainer;
