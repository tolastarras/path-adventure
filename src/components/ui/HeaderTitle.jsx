const HeaderTitle = ({ title, className, size = 'md', children }) => {
  const tags = {
    xs: { component: 'h4', style: 'text-md' },
    sm: { component: 'h3', style: 'text-2xl' },
    md: { component: 'h2', style: 'text-3xl' },
    lg: { component: 'h1', style: 'text-4xl' },
    xl: { component: 'h1', style: 'text-5xl' }
  };
  
  const { component: Tag, style } = tags[size];
  
  return (
    <Tag className={`${style} font-bold ${className} mb-4`}>
      {title || children}
    </Tag>
  );
};

export default HeaderTitle;
