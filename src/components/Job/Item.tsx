import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Job } from '../../types/User';
import { concatUserName } from '../../utils/User';

type props={
  job : Job
};

export const JobItem:React.FC<props> = ({job}) => {

  return (
    <div>
      {concatUserName(job.User)} has posted a new job : {job.Text}
    </div>
  )
}