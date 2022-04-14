const getItemColsProps = ({ xs, sm, md, lg, xl }) => {
  const props = {};
  if (xs) props.xs = xs;
  if (sm)props.sm = sm;
  if (md)props.md = md;
  if (lg)props.lg = lg;
  if (xl) props.xl = xl;
  return props;
};


export {
  getItemColsProps,
};
