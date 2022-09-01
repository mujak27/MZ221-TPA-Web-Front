import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { ItemWithUser } from '../../Elements/User/ItemWithUser';

import { UserInfo } from '../../Elements/User/UserInfo';
import { Job } from '../../types/User';

type props={
  job : Job
};

export const JobItem:React.FC<props> = ({job}) => {

  return (
    <ItemWithUser user={job.User} content={
      <div>
        {parse(job.Text)}
      </div>
    } />
  )
}