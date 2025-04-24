import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiBookmark,
  HiBookOpen,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiSparkles,
  HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
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
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">

          <Link to="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              className={tab === "profile" ? "bg-teal-400 text-gray" : ""}
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>

          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <SidebarItem
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                className={tab === "dash" ? "bg-teal-400 text-gray" : ""}
                as="div"
              >
                Dashboard
              </SidebarItem>
            </Link>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <SidebarItem
                active={tab === "posts"}
                icon={HiDocumentText}
                className={tab === "posts" ? "bg-teal-400 text-gray" : ""}
                as="div"
              >
                Posts
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <SidebarItem
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  className={tab === "users" ? "bg-teal-400 text-gray" : ""}
                  as="div"
                >
                  Users
                </SidebarItem>
              </Link>
              <Link to="/dashboard?tab=comments">
                <SidebarItem
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  className={tab === "comments" ? "bg-teal-400 text-gray" : ""}
                  as="div"
                >
                  Comments
                </SidebarItem>
              </Link>
            </>
          )}

          <SidebarItem
            onClick={handleSignout}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Signout
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSidebar;
