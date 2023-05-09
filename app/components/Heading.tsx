'use client'

interface IHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<IHeadingProps> = ({title,center,subtitle}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bolf'>
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">
        {subtitle}
      </div>
    </div>
  );
}
 
export default Heading;