import { useContext, useEffect } from "react";
import { Divider } from "primereact/divider";
import DefaultLayout from "../layouts/Default";
import { AuthContext } from "../provider/AuthProvider";
import { isLoggedIn } from "../provider/authUtils";
import HomeScreenSidePanel from "../components/HomeScreenSidePanel";
import { TabPanel, TabView } from "primereact/tabview";
import HomeScreenPostList from "../components/Lists/HomeScreenPostList";

function Home() {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log("Rendered Home screen");
  }, []);

  return (
    <DefaultLayout>
      <div className="mt-4 md:flex xl:grid mx-2 sm:mt-4 xl:mx-8">
        <div className="sm:col-12 md:col-3">
          <HomeScreenSidePanel isLoggedIn={isLoggedIn(token)} />
        </div>
        <Divider layout="vertical" className="hidden sm:hidden md:block" />
        <div className="sm:col-12 md:col-9">
          <TabView>
            <TabPanel header="Newest" rightIcon="pi pi-stopwatch ml-2">
              <HomeScreenPostList searchTerm={"newest"} />
            </TabPanel>
            <TabPanel header="Best reviewed" rightIcon="pi pi-thumbs-up ml-2">
              <HomeScreenPostList searchTerm={"best-reviewed"} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Home;
