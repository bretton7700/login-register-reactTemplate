import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Missing from './components/Missing';
import PersistLogin from './components/PersistLogin';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Forgotpassword from './components/Forgotpassword';
import Unauthorized from './components/Unauthorized';
import Publishing from './components/Publishing';
import Linkedinauthenticate from './components/linkedin/Linkedinauthenticate';
import Linkedinpost from './components/linkedin/Linkedinpost';
import LinkedinCalendar from './components/linkedin/LinkedinCalendar';
import Freeservices from './components/FreeServices/Freeservices';
import Blogwritter from './components/FreeServices/Blogwritter';
import ImageGenerator from './components/FreeServices/ImageGenerator';
import NdovuTuskeechat from './components/Tuskeechat/NdovuTuskeechat';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {


  return (
    
      <Routes>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<Forgotpassword />} />


        <Route path="/" element={<Layout />}>
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}


          <Route element={<PersistLogin />}>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/linkedinauthenticate" element={<Linkedinauthenticate />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/publishing" element={<Publishing />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/linkedinpost" element={<Linkedinpost />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/linkedincalendar" element={<LinkedinCalendar />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/free-services" element={<Freeservices />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/ai-blog-writter" element={<Blogwritter />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/ai-images" element={<ImageGenerator />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/omnichannel" element={<NdovuTuskeechat />} />
            </Route>




          </Route>

        </Route>



        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Routes>
    
  );
}

export default App;