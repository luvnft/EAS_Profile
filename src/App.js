import React from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import AddDetails from "./components/AddDetails";
import WebStorage from './components/WebStorage';

export default function Home() {
  
  return (
    <main className="bg-black h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto">
  <div className="header text-center flex items-center justify-center">
    <h1 className="text-4xl text-white font-semibold mb-4 mr-20">
      Welcome to Profile Create.
    </h1>
    <div className="connect ml-20">
      <ConnectWallet
        dropdownPosition={{
          side: "right",
          align: "start",
        }}
      />
    </div>
  </div>
</div>
      <WebStorage />
      <div className="add-details mt-8">
      <AddDetails />
      </div>
    </main>
  );
}
