import { Outlet } from "react-router-dom";
import Footer from './Footer';
import TuskeechatWidget from "./Tuskeechat/TuskeechatWidget";
import Sidebar from './Sidebar';
// import Navbar from "./Navbar";
import { Header } from "./Header";
const Layout = () => {
    return (
        <div className="App">
            
            
            {/* <Navbar /> */}
            <div className='app' style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
            <Header />
            <div className="app__body">
            <Sidebar />
            <main>

            <Outlet />
            </main>
            <TuskeechatWidget />
            <Footer />
            </div>
            </div>
        </div>
    )
}

export default Layout
