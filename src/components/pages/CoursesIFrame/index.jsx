import React from 'react';
import cls from './CoursesIFrame.module.scss';

const CoursesIFrame = () => {
  return (
    <div className={cls.CoursesIFrame}>
      <iframe
        src="https://myteacheruz.perfectlyspoken.team/app/dashboard"
        className={cls.iframe}
      ></iframe>
    </div>
  );
};

export default CoursesIFrame;
