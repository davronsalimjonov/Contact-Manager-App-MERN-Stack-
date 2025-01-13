import React, { useState } from 'react'
import cls from './AllMentors.module.scss'
import useGetMentors from '@/hooks/useGetMentors'
import MentorsSearchBar from '@/components/UI/organisms/MentorsSearchbar'
import Loader from '@/components/UI/atoms/Loader'
import MentorsTable from '@/components/templates/MentorsTable'
import Pagination from '@/components/UI/moleculs/Pagination'

const AllMentors = () => {
  const [filter, setFilter] = useState({})
  const [id, setId] = useState('')
  const [role, setRole] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const handlePageChange = (page) => {
    setPagination((prev) => ({...prev, page }));
  };

  const handleLimitChange = (limit) => {
    setPagination((prev) => ({...prev, limit }));
  };

  const { 
    allMentors: { data: allMentors, isLoading: isLoadingAllMentors }
  } = useGetMentors({...filter, ...pagination}, id, role)

  return (
    <div className={cls.AllMentors}>
        <MentorsSearchBar 
            onChangeFirstName={(e) => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
            onChangeLastName={(e) => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
            onChangePhone={(phone) => setFilter(state => ({ ...state, phone }))}
            onChangeDegree={(degree) => setFilter(state => ({ ...state, degree: degree?.value }))}
            onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value  }))}
        />
        {(!isLoadingAllMentors) ? (
            <div className={cls.AllMentors__Table}>
                <MentorsTable
                    mentors={allMentors?.items}
                    isLoading={isLoadingAllMentors}
                    setId={setId}
                    setRole={setRole}
                    role={role}
                />
                <Pagination
                    metaData={allMentors?.meta}
                    limit={pagination.limit}
                    setLimit={handleLimitChange}
                    page={pagination.page}
                    setPage={handlePageChange}
                />
            </div>
        ) : (<Loader />)}
    </div>
  )
}

export default AllMentors