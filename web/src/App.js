import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { Fragment } from "react";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            
            const Page = route.component;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route path={route.path} key={index} element={

                <Layout>
                  <Page />
                </Layout>
              
              }></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
