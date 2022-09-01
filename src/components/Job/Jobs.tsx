import './style.sass';

import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { queryJobs } from '../../lib/graphql/queries';
import { Job } from '../../types/User';
import { JobCreate } from './Create';
import { JobItem } from './Item';

type props={

};

export const Jobs:React.FC<props> = () => {

  const {loading : jobsLoading, data : jobsData, refetch : jobsRefetch } = useQuery(queryJobs)

  if(jobsLoading) return <>fetching data...</>

  const jobs = jobsData.Jobs as Job[]
  
  return (
    <div id='jobs'>
      {/* <h1 className='title1'>Jobs</h1> */}
      <JobCreate jobsRefetch={jobsRefetch} />
      {
        !jobs.length ? <>no jobs found...</> :
        jobs.map((job)=>{
          return <JobItem key={crypto.randomUUID()} job={job} />
        })
      }
    </div>
  )
}