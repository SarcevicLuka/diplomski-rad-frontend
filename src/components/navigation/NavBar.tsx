import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Link } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import AuthNavButtons from "./AuthNavButtons";
import clock from "../../assets/clock.png";

function NavBar() {
  const start = (
    <div className="flex align-items-center justify-content-center sm:ml-0 md:ml-4">
      <Link to={AvailableRoutes.Home}>
        <img alt="logo" src={clock} height="40" className="mr-2" />
      </Link>
      <Link to={AvailableRoutes.Search}>
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
