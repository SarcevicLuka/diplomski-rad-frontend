import { Link } from "react-router-dom";
import { AvailableRoutes } from "../routes/AvailableRoutes";

const NotFound = () => {
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <p>404: Page not found</p>
      <p>You are accessing a url that does not exist</p>
      <Link to={AvailableRoutes.Home}>Go home</Link>
    </div>
  );
};

export default NotFound;
