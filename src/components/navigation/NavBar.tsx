import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Link } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import AuthNavButtons from "./AuthNavButtons";

function NavBar() {
  const start = (
    <div className="flex align-items-center justify-content-center sm:ml-0 md:ml-4">
      <Link to={AvailableRoutes.Home}>
        <img
          alt="logo"
          src="https://primefaces.org/cdn/primereact/images/logo.png"
          height="40"
          className="mr-2"
        />
      </Link>
      <Link to={AvailableRoutes.Home}>
        <Button
          label="Search"
          className="search-button ml-2"
          icon="pi pi-search"
          size="small"
          rounded
          text
          aria-label="Filter"
        />
      </Link>
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} end={<AuthNavButtons />} />
    </div>
  );
}

export default NavBar;
