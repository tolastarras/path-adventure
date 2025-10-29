import { ReactSVG } from 'react-svg';

const CustomIcon = ({icon, ...props}) => {
  const classes = `stroke-current text-gray-900 ${props.className}`;
  const classesArray = classes.split(" ") || [];

  return (
    <div>
      <ReactSVG 
        src={icon}
        alt="icon"
        beforeInjection={(svg) => {
          svg.classList.add(...classesArray);
        }}
      />
    </div>
  )
}

export default CustomIcon;
