const withClass = (Component, className) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <div className={className}>
        <Component {...props} />
      </div>
    );
  };
};

export default withClass;
