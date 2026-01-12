import './HeaderTitle.css';

const HeaderTitle = ({ title, className = '', size = 'md', children }) => {
  const tags = {
    xs: { component: 'h4', style: 'text-sm' },
    sm: { component: 'h3', style: 'text-md' },
    md: { component: 'h2', style: 'text-lg' },
    lg: { component: 'h1', style: 'text-xl' },
    xl: { component: 'h1', style: 'text-3xl' }
  };
  
  const { component: Tag, style } = tags[size];
  
  return (
    <Tag className={`mb-1 ${style} ${className} font-bold`}>
      <div className="cool-text">{title || children}</div>
    </Tag>
  );
};

export default HeaderTitle;
