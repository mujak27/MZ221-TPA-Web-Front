import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Activation } from './components/Activation/Activation';
import { Chat } from './components/Chats/Chat';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Nav/Navbar';
import { Posts } from './components/posts/Posts';
import { Register } from './components/register/Register';
import Profile from './components/User/Profile/Profile';
import { querySearch } from './lib/graphql/queries';
import { ContextProvider } from './Provider/ContextProvider';
import { Search } from './types/Search';

type props={

};

export const App:React.FC<props> = () => {
  const searchLimit = 4
  const [searchOffset, setSearchOffset] = useState(0)

  const [processing, setProcessing] = useState(false);
  const [search, setSearch] = useState<Search>()
  
  const [searchFunc, {loading: searchLoading, data: searchData, called:searchCalled}] = useLazyQuery(querySearch);

  
  
  const onSearchHandle = (searchString : string)=>{
    try{
      setProcessing(true);
      searchFunc({
        variables:{
          Keyword: searchString,
          Limit: searchLimit,
          Offset: searchOffset
        }
      })
    }catch(err){
    }
  }
  
  useEffect(()=>{
    if(!searchLoading){
      if(processing){
        setProcessing(false);
        setSearch(searchData.Search as Search);
      }
    }
  }, [searchData, processing])

  return (
    <div>
      <Navbar 
        search={search} setSearch={setSearch} showPopup={searchCalled && !searchLoading} onSearchHandle={onSearchHandle} 
        />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Routes>
      <Chat />
    </div>
  )
}

export default App
