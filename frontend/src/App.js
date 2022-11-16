import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Missing from './components/Missing';
import PersistLogin from './components/PersistLogin';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';

import Unauthorized from './components/Unauthorized';
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <>

      <Routes>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}


          <Route element={<PersistLogin />}>


            

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Home />} />
            </Route>

            

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="allparcels" element={<AllParcels />} />
            </Route> */}



          </Route>

        </Route>



        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Routes>
    </>


  );
}

export default App;