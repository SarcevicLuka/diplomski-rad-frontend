import { useEffect } from "react";
import NavBar from "../components/navigation/NavBar";

type props = {
  children: JSX.Element;
};

function DefaultLayout({ children }: props) {
  useEffect(() => {
    console.log("Default layout");
  }, []);

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default DefaultLayout;
