import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get('tab');
    if (tabFromURL) {
      setTab(tabFromURL) // tab = tabform url ;  
    }
  }, [location.search])
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>
    
      {/* profile ... */}
      {tab ==='profile'&& <DashProfile />}

      {tab ==='posts' && <DashPosts />}

      {tab ==='users' && <DashUsers />}

      {tab ==='comments' && <DashComments/>}

      {tab ==='dash' && <DashboardComp />}
    </div>
  )
}

export default Dashboard