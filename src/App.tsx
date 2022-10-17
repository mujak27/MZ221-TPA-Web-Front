import { useLazyQuery } from '@apollo/client';
import { useEffect, useState, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Chat } from './components/Chats/Chat';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Jobs } from './components/Job/Jobs';
import { Navbar } from './components/Nav/Navbar';
import { Networks } from './components/Networks/Networks';
import Activities from './components/Notifications/Activities';
import { Search } from './components/Search/Search';
import { SearchPost } from './components/Search/SearchPost';
import { SearchUser } from './components/Search/SearchUser';
import Profile from './components/User/Profile/Profile';
import { toastError, toastPromiseErrorOnly } from './Elements/Toast/Toast';
import { querySearch } from './lib/graphql/queries';
import { useThemeContext } from './Provider/ThemeProvider';
import { TypeSearch } from './types/TypeSearch';
import { TypeUser } from './types/TypeUser';

type props={

};

export const App:React.FC<props> = () => {
  
  const {currTheme} = useThemeContext()

  const [search, setSearch] = useState<TypeSearch>()
  const [searchString, setSearchString] = useState("")
  const [searchOffset, setSearchOffset] = useState(0)
  const searchLimit = 4

  
  const [boxUser, setBoxUser] = useState<TypeUser>()
  const [showBox, setShowBox] = useState(false)
  const showBoxChat = (user : TypeUser)=>{
    console.info(user)
    setBoxUser(user)
    setShowBox(true)
  }
  
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
        <>
          <div id="appLeft">

          </div>
          {
            useMemo(()=>{
              return <div id="appMain">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/profile/:userProfileLink" element={<Profile showBoxChat={showBoxChat} />} />
                  <Route path="/notifications/" element={<Activities />} />
                  <Route path="/networks/" element={<Networks />} />
                  <Route path="/jobs/" element={<Jobs />} />
                  <Route path="/Search/"  element={<Search searchString={searchString}  search={search!} />} />
                  <Route path="/SearchUser/"  element={<SearchUser 
                      searchString={searchString}
                    />} />
                  <Route path="/SearchPost/"  element={<SearchPost
                      searchString={searchString}
                    />} />
                  {/* <Route path="/SearchPost/"  element={<SearchPost
                      searchLimit={searchLimit}
                      searchOffset={searchOffset}
                      searchString={searchString}
                      setSearchOffset={setSearchOffset}
                    />} /> */}
                </Routes>
              </div>
            }, [search, searchString])
          }
          <div id="appRight">
            <Footer />
          </div>
        </>
      </div>
      <Chat
        boxUser={boxUser}
        setBoxUser={setBoxUser}
        showBox={showBox}
        setShowBox={setShowBox}
      />
    </div>

  )
}

export default App
