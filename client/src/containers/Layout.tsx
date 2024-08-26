import { Link, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import AddButtonDropdownMenu from "@/components/AddButtonDropdownMenu";
import ProfileDropDownMenu from "@/components/ProfileDropdownMenu";
import Notifications from "@/components/Notifications";
import Logo from "../assets/images/logo.png";

function Layout() {
  return (
    <>
      <header className="sticky top-0 z-10 py-3 elevate-box rounded-none bg-background">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/">
            <img src={Logo} className="w-12 h-12" />
          </Link>
          <div className="flex items-center space-x-2">
            {/* ADD BUTTON */}
            <AddButtonDropdownMenu />
            {/* NOTIFICATIONS */}
            <Notifications />
            {/* PROFILE MENU */}
            <ProfileDropDownMenu />
          </div>
        </div>
      </header>
      <main className="container pb-10 pt-5">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
