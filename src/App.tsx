import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";


import { Home, ForgotPassword, Login, Register  } from './pages'
import Layout from "./components/layout";


function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
              //dataProvider is responsible for providing data to the entire application
              //dataProvider (Data fetching, Authentication, Routing, Notifications, Real-time Updates)
              //It deals with getting data from the server and doing things like adding, changing or deleting data
              //dataProider Workflow: Refine(Call Hooks)--->>Data Hooks(Calls data provider method)--->>Data Providrs(HTTP request)--->>API
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "9RyKCp-MNDFCN-TF4ULP",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  {/* <Route index element={<WelcomePage />} /> */}
                  <Route index element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route 
                     element={
                     <Authenticated
                       key="authenticated-layout"
                       fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                     }>
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
