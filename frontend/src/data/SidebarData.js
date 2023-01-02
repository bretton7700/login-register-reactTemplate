import { Add, CloudQueue, Create, DashboardCustomize, Dns, Home, KeyboardArrowDown, KeyboardArrowUp, OfflineShare, Workspaces } from "@mui/icons-material"

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/",
        icon: <Home />,
        iconClosed: <KeyboardArrowDown/>,
        iconOpened: <KeyboardArrowUp/>,
       
    },
    {
        title: "Analytics",
        path: "/datatrunk",
        icon: <Workspaces />,
        iconClosed: <KeyboardArrowDown/>,
        iconOpened: <KeyboardArrowUp/>,
        subNav: [
            {
                title: "Get Started",
                path: "/addworkspace",
                icon: <Add />,
            },
            {
                title: "Mysql",
                path: "/addmysqldb",
                icon: <OfflineShare />,
            },
            
        ]
    },
    

    {
        title: "E-Commerce",
        path: "/ecommercebuilder",
        icon: <CloudQueue />,
        iconClosed: <KeyboardArrowDown/>,
        iconOpened: <KeyboardArrowUp/>,
      
    },
    
    {
        title: "OmniChannel",
        path: "/omnichannel",
        icon: <DashboardCustomize />,
        iconClosed: <KeyboardArrowDown/>,
        iconOpened: <KeyboardArrowUp/>,
      
    },
    {
        title: "Free",
        path: "/free-services",
        icon: <Dns />,
        iconClosed: <KeyboardArrowDown/>,
        iconOpened: <KeyboardArrowUp/>,
        subNav: [
            {
                title: "AI Writer",
                path: "/ai-blog-writter",
                icon: <Create />,
            },
            
            
            
        ]
    },
    
    {
        title: "Publishing",
        path: "/publishing",
        icon: <Dns />,
        iconClosed: <KeyboardArrowDown/>,
        iconOpened: <KeyboardArrowUp/>,
        subNav: [
            {
                title: "Calendar",
                path: "/linkedincalendar",
                icon: <Create />,
            },
            {
                title: "Booth",
                path: "/booth",
                icon: <Create />,
            },
            
            
        ]
    },
      
    
    
]