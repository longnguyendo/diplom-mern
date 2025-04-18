import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiArrowSmRight,
  HiBookmark,
  HiBookOpen,
  HiSparkles,
  HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess())
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              className={tab === "profile" ? "bg-teal-400 text-gray" : ""}
              as='div'
            >
              Profile
            </SidebarItem>
          </Link>

          <Link to="/dashboard?tab=posts">
            <SidebarItem
              active={tab === "posts"}
              icon={HiBookOpen}
              labelColor="dark"
              className={tab === "posts" ? "bg-teal-400 text-gray" : ""}
              as='div'
            >
              Posts
            </SidebarItem>
          </Link>
          <Link to="/dashboard?tab=comments">
            <SidebarItem
              active={tab === "comments"}
              icon={HiSparkles}
              labelColor="dark"
              className={tab === "comments" ? "bg-teal-400 text-gray" : ""}
              as='div'
            >
              Comments
            </SidebarItem>
          </Link>

          <SidebarItem onClick={handleSignout}icon={HiArrowSmRight} className="cursor-pointer">
            Signout
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
