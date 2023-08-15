import { AvailableRoutes } from "../routes/AvailableRoutes";

const NotFound = () => {
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <p>404: Page not found</p>
      <p>You are accessing a url that does not exist</p>
      <a href={AvailableRoutes.Home}>Go home</a>
    </div>
  );
};

export default NotFound;
