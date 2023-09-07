import NavBar from "../components/navigation/NavBar";

type props = {
  children: JSX.Element;
};

function DefaultLayout({ children }: props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default DefaultLayout;
