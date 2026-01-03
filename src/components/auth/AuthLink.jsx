const AuthLink = ({
  promptText = 'New here?',
  linkText = 'Create an account',
  onClick,
}) => {
  return (
    <p className="text-sm">
      {promptText}{' '}
      <button
        type="button"
        className="text-primary cursor-pointer"
        onClick={onClick}
      >
        {linkText}
      </button>
    </p>
  );
};

export default AuthLink;
