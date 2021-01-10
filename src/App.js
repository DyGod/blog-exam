import { useEffect, useState } from 'react'
import {
  Switch,
  Route, 
  useLocation,
  useHistory
} from "react-router-dom";

import Home from './pages/Home';
import Post from './pages/Post';
import SinglePost from './pages/Post/SinglePost';

import Header from './components/Header';
import Footer from './components/Footer';
import PostManagement from "./pages/PostManagement";
import AddEditPost from "./pages/PostManagement/AddEditPost";



function useQuery() {
  return new URLSearchParams(useLocation().search);
} 

function App() {
  
  let query = useQuery();

  let [q, setQ] = useState(query.get('q'));

  const history = useHistory()

   useEffect(() => {
      return history.listen((location) => { 
        let newQ =  new URLSearchParams(location.search);
        setQ(newQ.get('q'))
      }) 
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[history]) 

  return (
      <div className="App">
        <Header />
        <Switch>
            <Route path="/post/:slug">
              <SinglePost />
            </Route>
            <Route path="/post">
              <Post q={q} />
            </Route>
            
            <Route path="/post-management/:id">
              <AddEditPost />
            </Route>
            <Route path="/post-management">
              <PostManagement />
            </Route>
            
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        <Footer />
      </div>
  );
}





export default App;
