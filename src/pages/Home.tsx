//import { useContext } from "react";
//import { AuthContext } from "../provider/AuthProvider";

import NavBar from "../components/navigation/NavBar";

function Home() {
  //const { token } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div>Home Page</div>
    </>
  );
}

export default Home;
