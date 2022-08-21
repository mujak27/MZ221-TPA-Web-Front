import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Message } from '../../../types/Message';
import { User } from '../../../types/User';
import { concatUserName } from '../../../utils/User';

type props={
  message : Message
};

export const MessageItem:React.FC<props> = ({message}) => {

  return (
    <div>
      from {concatUserName(message.User1)} : {message.Text}
    </div>
  )
}

