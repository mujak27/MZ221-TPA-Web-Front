import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

import { UserInfo } from '../../Elements/User/UserInfo';
import { TypeJob } from '../../types/TypeUser';

type props={
  job : TypeJob
};

export const JobItem:React.FC<props> = ({job}) => {

  return (
    <div>
      <UserInfo user={job.User} showDetail={false} />
      {parse(job.Text)}
    </div>
  )
}