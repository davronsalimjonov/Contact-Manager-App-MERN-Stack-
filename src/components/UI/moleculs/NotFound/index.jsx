import cls from "./NotFound.module.scss"
import NotFoundImg from '../../atoms/NotFound'
import NotFoundText from '../../atoms/NotFoundText'

const NotFound = () => {
  return (
    <div className={cls.NotFound}>
      <NotFoundImg />
      <NotFoundText />
    </div>
  )
}

export default NotFound