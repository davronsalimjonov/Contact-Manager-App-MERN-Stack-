import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Rater from '@/components/UI/atoms/Rater';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import TextArea from '@/components/UI/atoms/Form/TextArea';
import MediaPreviewer from '@/components/UI/moleculs/MediaPreviewer';
import FilePreviewItem from '@/components/UI/moleculs/FilePreviewItem';
import { useGetStudentLessonHomework, useRateLessonHomeWorkMutation } from '@/hooks/useLessons';
import cls from './HomeworkReview.module.scss';

const HomeworkReview = () => {
  const { homeWorkId } = useParams()
  const [isOpenMediaModal, setIsOpenMediaModal] = useState(false)
  const { data: homework, isLoading } = useGetStudentLessonHomework(homeWorkId)
  const { register, handleSubmit, setValue, formState: { errors, isDirty, isSubmitting, isValid } } = useForm()
  const rateLessonHomeWorkMutation = useRateLessonHomeWorkMutation()

  useEffect(() => {
    register('mark', { required: true })
  }, [])

  const handleSubmitForm = async (data) => {
    data.id = homework?.id
    data.homeWorkId = homeWorkId
    await rateLessonHomeWorkMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success('Baxolandi')
      },
      onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
    })
  }

  return !isLoading ? (
    <form className={cls.page} onSubmit={handleSubmit(handleSubmitForm)}>
      <MediaPreviewer
        urls={homework?.lessonFiles?.map(file => file?.url)}
        visible={isOpenMediaModal}
        setVisible={() => setIsOpenMediaModal(false)}
      />
      <div className={cls.page__files}>
        {homework?.lessonFiles?.map(file => (
          <FilePreviewItem
            key={file?.id}
            className={cls.page__files__item}
            name={file?.fileName}
            size={file?.size}
            onClick={() => setIsOpenMediaModal(true)}
          />
        ))}
      </div>
      <div className={cls.page__section}>
        <h2 className={cls.page__task__title}>{homework?.lessonHomeTask?.title}</h2>
        <p className={cls.page__task__description}>{homework?.description}</p>
      </div>
      <div className={cls.page__section}>
        <TextArea
          className={cls.page__textarea}
          placeholder='Izoh yozing...'
          disabled={homework?.mark}
          defaultValue={homework?.comment}
          register={register('comment', { required: 'Izoh qoldiring' })}
          error={errors?.comment?.message}
        />
        <div className={cls.page__rating}>
          <span>Baholang:</span>
          <Rater
            width='32px'
            height='32px'
            defaultValue={homework?.mark}
            isDisabled={homework?.mark}
            onRate={value => setValue('mark', value, { shouldValidate: true, shouldDirty: true })}
          />
        </div>
      </div>
      <Button
        className={cls.page__send}
        type='submit'
        disabled={!isDirty || !isValid || homework?.mark}
        isLoading={isSubmitting}
      >
        Yuborish
      </Button>
    </form>
  ) : (
    <Loader />
  )
}

export default HomeworkReview;