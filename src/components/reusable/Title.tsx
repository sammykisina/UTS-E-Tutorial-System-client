const Title = ({
  title,
  titleStyles,
}: {
  title: string;
  titleStyles?: string;
}) => {
  return (
    <h2
      className={`whitespace-nowrap font-semibold leading-tight tracking-wider text-textColor ${titleStyles}`}
    >
      {title}
    </h2>
  );
};

export default Title;
