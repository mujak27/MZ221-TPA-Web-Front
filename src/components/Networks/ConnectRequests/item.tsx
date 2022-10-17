import { useEffect, useState } from 'react';
import { UserInfo } from '../../../Elements/User/UserInfo';

import { TypeConnectionRequest } from '../../../types/TypeUser';
import { concatUserName } from '../../../utils/User';
import Connect from '../../User/Connect';

type props={
  connectionRequest : TypeConnectionRequest
};

export const ConnectRequestItem:React.FC<props> = ({connectionRequest}) => {

  return (
    <div className='connectRequestItem' style={{display: "flex", alignItems: "center"}}>
      {
        <UserInfo user={connectionRequest.User1} showDetail={true} />
      } has requested connect {connectionRequest.Text}
      {
        <Connect userId={connectionRequest.User1.ID} />
      }
    </div>
  )
}