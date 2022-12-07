
import { Menu, MenuOpen } from '@mui/icons-material'
import React, { useState } from 'react'
import './sidebar.css'

import { SidebarData } from '../data/SidebarData';
import SubMenu from './SubMenu'

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(true)
    
    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
        <div className='sidebar' style={{width: `${(sidebar ? '220px' : '70px')}`}}>
            <span className="sidebar__toggle" onClick={showSidebar} >
                {sidebar ? <MenuOpen className="sidebarToogle__icon" />
                : <Menu  className="sidebarToogle__icon" />}
            </span>

            <div className="sidebar__nav">
                <ul>
                    {SidebarData.map((item, index) => {
                        return (<SubMenu item={item} key={index} sidebar={sidebar}/>)
                    })}
                    
                </ul>
            </div>
        </div>
        </>
    )
}

export default Sidebar

