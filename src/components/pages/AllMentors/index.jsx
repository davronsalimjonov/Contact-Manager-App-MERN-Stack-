import { useState } from 'react'
import Loader from '@/components/UI/atoms/Loader'
import { useGetMentors } from '@/hooks/useMentor'
import MentorsSearchBar from '@/components/UI/organisms/MentorsSearchbar'
import MentorsTable from '@/components/templates/MentorsTable'
import Pagination from '@/components/UI/moleculs/CustomPagination'
import cls from './AllMentors.module.scss'

const AllMentors = () => {
    const [filter, setFilter] = useState({})
    const [pagination, setPagination] = useState({ page: 0, limit: 10 });
    const { data: allMentors, isLoading: isLoadingAllMentors } = useGetMentors({ ...filter, page: pagination.page + 1, limit: pagination.limit });

    const handleFilterChange = (key, value) => {
        setFilter(state => ({ ...state, [key]: value }))
        setPagination(state => ({ ...state, page: 0 }))
    }

    return (
      <div className={cls.AllMentors}>
          <MentorsSearchBar
              onChangeFirstName={(e) => handleFilterChange('firstName', e.target.value?.trim())}
              onChangeLastName={(e) => handleFilterChange('lastName', e.target.value?.trim())}
              onChangePhone={(phone) => handleFilterChange('phone', phone)}
              onChangeStatus={(status) => handleFilterChange('status', status?.value)}
              onChangeDegree={(degree) => handleFilterChange('degree', degree?.value)}
          />
          {!isLoadingAllMentors ? (
              <MentorsTable
                  mentors={allMentors?.items}
                  startIndex={pagination.page * pagination.limit}
              />
          ) : (
              <Loader />
          )}
          <Pagination
              page={pagination.page}
              pageCount={allMentors?.meta?.totalPages}
              onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
          />
      </div>
  )
}

export default AllMentors