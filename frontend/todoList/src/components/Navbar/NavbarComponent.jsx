import React, { useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";

const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navList = (
    <ul className="flex flex-col gap-9 lg:flex-row lg:items-center lg:gap-32">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-xl"
      >
        <a href="/dashboard" className="flex items-center">
          Dashboard
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center text-xl">
          Wishlist
        </a>
      </Typography>
    </ul>
  );

  const handleSignOut = () => {
    sessionStorage.removeItem("token")
    window.location.reload();
  }

  return (
    <div className="-m-6 max-h-[768px] w-full bg-white">
      <Navbar className="absolute top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left Section */}
          <div className="hidden lg:block w-1/3"></div>

          {/* Center Section */}
          <div className="lg:block flex pl-36 justify-center items-center text-center w-1/3">
            {navList}
          </div>

        
          <div className="flex items-center gap-x-3 justify-end w-1/3">
    
            <Button variant="gradient" size="sm" className="hidden lg:inline-block"
            onClick={handleSignOut}
            >
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

      </Navbar>
    </div>
  );
};

export default NavbarComponent;
