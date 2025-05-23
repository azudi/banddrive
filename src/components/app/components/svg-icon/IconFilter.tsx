import * as React from "react";

type compProps = { width: string | number}

const IconFilter = ({ width }: compProps) => (
  <svg
    fill="#000000"
    width={width}
    height={width}
    viewBox="-2 -2 24 24"
    preserveAspectRatio="xMinYMin"
    className="jam jam-filter"
  >
    <path d="M2.08 2l6.482 8.101A2 2 0 0 1 9 11.351V18l2-1.5v-5.15a2 2 0 0 1 .438-1.249L17.92 2H2.081zm0-2h15.84a2 2 0 0 1 1.561 3.25L13 11.35v5.15a2 2 0 0 1-.8 1.6l-2 1.5A2 2 0 0 1 7 18v-6.65L.519 3.25A2 2 0 0 1 2.08 0z" />
  </svg>
);
export default IconFilter;
