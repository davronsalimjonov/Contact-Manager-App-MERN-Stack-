import Loader from '@/components/UI/atoms/Loader'
import { useGetMentors } from '@/hooks/useMentor'
import useSessionState from '@/hooks/useSessionState'
import MentorsTable from '@/components/templates/MentorsTable'
import Pagination from '@/components/UI/moleculs/CustomPagination'
import MentorsSearchBar from '@/components/UI/organisms/MentorsSearchbar'
import cls from './AllMentors.module.scss'

const AllMentors = () => {
    const [filter, setFilter] = useSessionState('all-mentors-filter', {})
    const [pagination, setPagination] = useSessionState('all-mentors-pagination', { page: 0, limit: 10 });
    const { data: allMentors, isLoading: isLoadingAllMentors } = useGetMentors({ ...filter, page: pagination.page + 1, limit: pagination.limit });

    const handleFilterChange = (value) => {
        setFilter(value)
        setPagination(state => ({ ...state, page: 0 }))
    }

    return (
      <div className={cls.AllMentors}>
          <MentorsSearchBar onChange={handleFilterChange} defaultValue={filter} />
          {!isLoadingAllMentors ? (
              <MentorsTable
                  mentors={allMentors?.items}
                  startIndex={pagination.page * pagination.limit}
              />
          ) : (
              <Loader />
          )}
          <Pagination
              initialPage={pagination.page}
              pageCount={allMentors?.meta?.totalPages}
              page={pagination.page}
              onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
          />
      </div>
  )
}

export default AllMentors