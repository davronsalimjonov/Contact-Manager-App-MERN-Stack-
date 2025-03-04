import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';
import cls from './CoursesIFrame.module.scss';

const platformUrl = 'https://myteacheruz.perfectlyspoken.team/app/dashboard';

const CoursesIFrame = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cls.CoursesIFrame}>
      {!isLoaded && <Loader />}
      <iframe src={platformUrl} className={cls.iframe} onLoad={() => setIsLoaded(true)}></iframe>
    </div>
  );
};

export default CoursesIFrame;
