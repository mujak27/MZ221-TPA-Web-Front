import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  console.info(jobs)

  return (
    <div>
      <h3>Jobs:</h3>
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