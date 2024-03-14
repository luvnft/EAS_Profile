// Home.js
import React from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import AddDetails from "./components/AddDetails";
import WebStorage from './components/WebStorage';
import UniqueIdentity from './components/UniqueIdentity';

export default function Home() {
  
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <div className="header text-center flex items-center justify-center">
          <h1 className="text-4xl text-white font-semibold mb-4 mr-8">
          🆔 PROFILE.
          </h1>
          <div className="connect ml-8">
            <ConnectWallet
              dropdownPosition={{
                side: "right",
                align: "start",
              }}
            />
          </div>
        </div>
      </div>
      <UniqueIdentity />
      <WebStorage />
      <div className="add-details mt-8">
        <AddDetails />
      </div>
    </div>
  );
}
