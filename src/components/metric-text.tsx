import { Fragment } from "react";

const metricPattern = /(\d+(?:[.,]\d+)?\s?%)/;

type MetricTextProps = {
  text: string;
  /** Classes of the <strong> that wraps each figure. */
  className: string;
};

/** Wraps figures such as "40%" in <strong>, so results stand out while scanning. */
export default function MetricText({ text, className }: MetricTextProps) {
  return (
    <>
      {text.split(metricPattern).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className={className}>
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
