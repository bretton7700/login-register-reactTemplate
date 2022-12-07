import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'

function SubMenu({ item, sidebar }) {
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)
    return (
        <>
            <li>
                <NavLink to={item.path} className={`sidebar__link ${({isActive}) => isActive ? 'active' : undefined}`} onClick={item.subNav && showSubnav}>
                    <span className="icon">{item.icon}</span>
                    <span className="title">{item.title}</span>
                    <div style={{width: '100%'}}>
                        <span style={{float: 'right'}}>{item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}</span>
                    </div>
                </NavLink>
            </li>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <NavLink className={`sidebar__subnav ${(isActive) => isActive ? 'active' : undefined}`} style={{paddingLeft: `${(sidebar ? '2rem' : '0')}`}} to={item.path} key={index} >
                        <span className="icon">{item.icon}</span>
                        <span className="title">{item.title}</span>
                    </NavLink>
                )
            })}
        </>
    )
}

export default SubMenu
