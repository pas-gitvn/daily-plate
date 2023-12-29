import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

interface AProps {

}

const Time = (props:AProps) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
        const date: Date = new Date();
        const hours: number | string = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes: number | string = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const seconds: number | string = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => {
        clearInterval(timer);
    };
}, []);

  return (
    <div>
      {time && 
        <span className="current-time title is-5 has-text-info-light">        
          <FontAwesomeIcon icon={faClock} /> <span className='pl-2'>{time}</span>
        </span>
      }
    </div> 
  )
}

export default Time;