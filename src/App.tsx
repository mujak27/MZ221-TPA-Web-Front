import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Chat } from './components/Chats/Chat';
import { Home } from './components/Home/Home';
import { Jobs } from './components/Job/Jobs';
import { Navbar } from './components/Nav/Navbar';
import { Networks } from './components/Networks/Networks';
import Activities from './components/Notifications/Activities';
import { SearchPost } from './components/Search/SearchPost';
import { SearchUser } from './components/Search/SearchUser';
import Profile from './components/User/Profile/Profile';
import { toastError, toastPromiseErrorOnly } from './Elements/Toast/Toast';
import { querySearch } from './lib/graphql/queries';
import { useThemeContext } from './Provider/ThemeProvider';
import { Post } from './types/Post';
import { Search } from './types/Search';
import { User } from './types/User';

type props={

};

const searchPage = ['/SearchUser', '/SearchPost']

export const App:React.FC<props> = () => {
  
  const {currTheme} = useThemeContext()

  const [searchString, setSearchString] = useState("")

  const [searchOffset, setSearchOffset] = useState(0)
  const [searchLimit, setSearchLimit] = useState(1)

  const [processing, setProcessing] = useState(false);
  const [search, setSearch] = useState<Search>()
  
  const [searchFunc, {loading: searchLoading, data: searchData, called:searchCalled}] = useLazyQuery(querySearch);
  
  const [showPopup, setShowPopup] = useState(searchCalled && !searchLoading && !processing)

  useEffect(()=>{
    setShowPopup(searchCalled && !searchLoading && !processing)
    if(searchPage.includes(window.location.pathname)) setShowPopup(false)
  },[searchCalled, searchLoading, processing])

  const onSearchHandle = (searchString : string)=>{
    if(searchString === ''){
      return toastError("query must be filled", currTheme)
    }
    setSearchString(searchString)
    try{
      setProcessing(true);
      toastPromiseErrorOnly(
          searchFunc({
            variables:{
              Keyword: searchString,
              Limit: searchLimit,
              Offset: searchOffset
            }
          }).then((data)=>{
            console.info(data)
            setSearch(data.data.Search as Search)
            setProcessing(false)
          })
          , currTheme
        )
    }catch(err : any){
    }
  }

  useEffect(()=>{
    if(searchString === '') return
    console.info(searchOffset)
    console.info("changed")
    searchFunc({
      variables:{
        Keyword: searchString,
        Limit: searchLimit,
        Offset: searchOffset
      }
    }).then((data)=>{
      console.info(data)
      setSearch(data.data.Search as Search)
      setProcessing(false)
    })
  }, [searchOffset])

  return (
    <div>
      <Navbar 
        search={search} setSearch={setSearch} showPopup={showPopup} onSearchHandle={onSearchHandle} 
        />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile/:userProfileLink" element={<Profile />} />
        <Route path="/notifications/" element={<Activities />} />
        <Route path="/networks/" element={<Networks />} />
        <Route path="/jobs/" element={<Jobs />} />
        <Route path="/SearchUser/"  element={<SearchUser searchLimit={searchLimit} searchOffset={searchOffset} setSearchLimit={setSearchLimit} setSearchOffset={setSearchOffset} searchString={searchString} users={search?.Users as User[]} setSearch={setSearch} />} />
        <Route path="/SearchPost/"  element={<SearchPost searchLimit={searchLimit} searchOffset={searchOffset} setSearchLimit={setSearchLimit} setSearchOffset={setSearchOffset} searchString={searchString} posts={search?.Posts as Post[]} setSearch={setSearch} />} />
      </Routes>
      <Chat />
    </div>
  )
}

export default App
