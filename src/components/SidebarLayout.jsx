import { Outlet } from 'react-router-dom';
import Sidebar from '../scenes/global/Sidebar';
import { useState } from 'react';
import Topbar from "../scenes/global/Topbar";
const SidebarLayout = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <>
            <Sidebar isSidebar={setIsSidebar} />
            <main className="content">
                <Topbar />
                <Outlet />
            </main>
        </>
    )
};
export default SidebarLayout