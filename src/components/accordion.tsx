"use client";

import React, { FC, useState, ReactNode, useEffect, useRef } from "react";

import { ChevronDown } from "lucide-react";

import { css, sva } from "../../styled-system/css";

const animationDuration = "0.35s";

const maxHeights = [
  20, 40, 60, 80, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650,
  700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700,
  1800, 1900, 2000,
];

type AccordionProps = {
  children: ReactNode;
};

export const Accordion: FC<AccordionProps> = ({ children }) => (
  <div>{children}</div>
);

type AccordionItemProps = {
  id: string;
  title: string;
  headingLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
  initiallyOpen?: boolean;
  children: ReactNode;
};

export const AccordionItem: FC<AccordionItemProps> = ({
  id,
  title,
  headingLevel: HeadingComponent = "h3",
  initiallyOpen = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [maxHeightIndex, setMaxHeightIndex] = useState<number>(0);
  const styles = accordionRecipe({ variant: isOpen ? "open" : "closed" });

  const panelRef = useRef(null);

  useEffect(() => {
    const panelElement = panelRef.current as unknown as HTMLDivElement;
    if (panelElement !== null) {
      requestAnimationFrame(() => {
        const calculatedHeight = panelElement.scrollHeight;
        const suitableMaxHeightIndex = maxHeights.findIndex(
          (height: number) => height >= calculatedHeight
        );
        const index =
          suitableMaxHeightIndex === -1
            ? maxHeights.length - 1
            : suitableMaxHeightIndex;
        setMaxHeightIndex(index);
      });
    }
  }, []);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.item}>
      <HeadingComponent>
        <button
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={handleOnClick}
        >
          <span className={styles.title}>
            {title}
            <ChevronDown className={styles.icon} aria-hidden />
          </span>
        </button>
      </HeadingComponent>
      <div
        style={{
          // @ts-ignore
          "--panel-max-height": `${maxHeights[maxHeightIndex]}px`,
        }}
        className={css({
          pt: "sm",
          overflow: "hidden",
          maxH: isOpen ? "var(--panel-max-height) !important" : "0 !important",
          transition: `max-height ${animationDuration} ease-in-out`,
        })}
        id={id}
        aria-labelledby={id}
        ref={panelRef}
        role="region"
      >
        {children}
      </div>
    </div>
  );
};

const accordionRecipe = sva({
  slots: ["item", "trigger", "icon", "title"],
  base: {
    item: {
      w: "100%",
      color: "foreground",
      borderTop: "1px solid {colors.border}",
      pt: "sm",
      mb: "xs",
    },
    trigger: { cursor: "pointer", w: "100%" },
    icon: {
      h: "1rem",
      w: "1rem",
      transition: `transform ${animationDuration} ease-in-out`,
    },
    title: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "md",
      fontWeight: "bold",
      w: "100%",
    },
  },
  variants: {
    variant: {
      open: {
        icon: { transform: "rotate(-180deg)" },
      },
      closed: {},
    },
  },
});
