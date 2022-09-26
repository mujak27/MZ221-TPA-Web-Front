import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Chat } from './components/Chats/Chat';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Jobs } from './components/Job/Jobs';
import { Navbar } from './components/Nav/Navbar';
import { Networks } from './components/Networks/Networks';
import Activities from './components/Notifications/Activities';
import { Search } from './components/Search/Search';
import { SearchUser } from './components/Search/SearchUser';
import Profile from './components/User/Profile/Profile';
import { toastError, toastPromiseErrorOnly } from './Elements/Toast/Toast';
import { querySearch } from './lib/graphql/queries';
import { useThemeContext } from './Provider/ThemeProvider';
import { useUserContext } from './Provider/UserProvider';
import { TypeSearch } from './types/Search';
import { User } from './types/User';

type props={

};

const searchPage = ['/SearchUser', '/SearchPost', '/Search']

export const App:React.FC<props> = () => {
  
  const {currTheme} = useThemeContext()
  const {user, userRefetch} = useUserContext()

  const [searchString, setSearchString] = useState("")

  const [searchOffset, setSearchOffset] = useState(0)
  const searchLimit = 4

  const [search, setSearch] = useState<TypeSearch>()
  
  const [searchFunc] = useLazyQuery(querySearch);

  const onSearchHandle = (searchString : string)=>{
    if(searchString === ''){
      return toastError("query must be filled", currTheme)
    }
    setSearchString(searchString)
    try{
      toastPromiseErrorOnly(
          searchFunc({
            variables:{
              Keyword: searchString,
              Limit: searchLimit,
              Offset: searchOffset
            }
          }).then((data)=>{
            setSearch(data.data.Search as TypeSearch)
          })
          , currTheme
        )
    }catch(err : any){
    }
  }


  useEffect(()=>{
    if(searchString === '') return
    searchFunc({
      variables:{
        Keyword: searchString,
        Limit: searchLimit,
        Offset: searchOffset
      }
    }).then((data)=>{
      setSearch(data.data.Search as TypeSearch)
    })
  }, [searchOffset])


  return (
    <div id='app'>
      <Navbar  onSearchHandle={onSearchHandle} />
      <div id='appBody'>
        <div id="appLeft">

        </div>
        <div id="appMain">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/profile/:userProfileLink" element={<Profile />} />
            <Route path="/notifications/" element={<Activities />} />
            <Route path="/networks/" element={<Networks />} />
            <Route path="/jobs/" element={<Jobs />} />
            <Route path="/Search/"  element={<Search  search={search!} />} />
            <Route path="/SearchUser/"  element={<SearchUser 
                searchLimit={searchLimit}
                searchOffset={searchOffset}
                searchString={searchString}
                setSearchOffset={setSearchOffset}
                users={search?.Users as User[]} 
              />} />
          </Routes>
        </div>
        <div id="appRight">
          <Footer />
        </div>
      </div>
      <Chat />
    </div>

  )
}

export default App
