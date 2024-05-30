import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateEvent, Event, Events, Home } from "./pages/index.js";
import { createNetworkConfig, SuiClientProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SnackbarProvider} from "notistack"


const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/events",
    children: [
      {
        index: true,
        element: <Events />,
      },
      {
        path: ":eventId",
        element: <Event />,
      },
    ],
  },
  {
    path: "/create",
    element: <CreateEvent />,
  },
]);
const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl("devnet") },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

    <SuiClientProvider networks={networkConfig} network="devnet">
      <SnackbarProvider>

      <RouterProvider router={router} />
      </SnackbarProvider>
    </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
