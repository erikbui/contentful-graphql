import { FC, ReactNode } from "react";

import { css } from "../../styled-system/css";

type ContainerProps = {
  children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => (
  <div
    className={css({
      maxW: "75rem",
      marginX: "auto",
      py: "xl",
      flex: 1,
    })}
  >
    {children}
  </div>
);
