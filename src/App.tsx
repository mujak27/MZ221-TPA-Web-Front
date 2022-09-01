import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Chat } from './components/Chats/Chat';
import { Home } from './components/Home/Home';
import { Jobs } from './components/Job/Jobs';
import { Navbar } from './components/Nav/Navbar';
import { Networks } from './components/Networks/Networks';
import Activities from './components/Notifications/Activities';
import { SearchUser } from './components/Search/SearchUser';
import Profile from './components/User/Profile/Profile';
import { toastError, toastPromiseErrorOnly } from './Elements/Toast/Toast';
import { querySearch } from './lib/graphql/queries';
import { useThemeContext } from './Provider/ThemeProvider';
import { Search } from './types/Search';

type props={

};

export const App:React.FC<props> = () => {
  
  const {currTheme} = useThemeContext()

  const searchLimit = 4
  const [searchOffset, setSearchOffset] = useState(0)

  const [showPopup_, setShowPopup_] = useState(true)
  const [processing, setProcessing] = useState(false);
  const [search, setSearch] = useState<Search>()
  
  
  const [searchFunc, {loading: searchLoading, data: searchData, called:searchCalled}] = useLazyQuery(querySearch);



  const onClosePopup = () =>{
    setShowPopup_(false)
  }

  const onSearchHandle = (searchString : string)=>{
    if(searchString === ''){
      return toastError("query must be filled", currTheme)
    }
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
            setSearch(data.data.Search as Search)
            setProcessing(false)
          })
          , currTheme
        )
    }catch(err : any){
    }
  }

  return (
    <div>
      <Navbar 
        search={search} setSearch={setSearch} showPopup={searchCalled && !searchLoading && !processing} onSearchHandle={onSearchHandle} 
        />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile/:userProfileLink" element={<Profile />} />
        <Route path="/notifications/" element={<Activities />} />
        <Route path="/networks/" element={<Networks />} />
        <Route path="/jobs/" element={<Jobs />} />
        <Route path="/SearchUser/" element={<SearchUser />} />
        <Route path="/SearchPost/" element={<SearchUser />} />
      </Routes>
      <Chat />
    </div>
  )
}

export default App
