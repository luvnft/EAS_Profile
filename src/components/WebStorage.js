import { Web3Storage } from 'web3.storage'
import React, { useState } from "react";

export default function WebStorage () {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      const client = new Web3Storage({ token: "Y6Jlcm9vdHOC2CpYJQABcRIgahoyDZ4kxjskPa9944qrWhxetz4IDMP0YKyBFCa9wFLYKlglAAFxEiA3W7UKZ8YJ1aSp4hnyfXGtpKIAt1uD1B_lXN4Dyxw9bWd2ZXJzaW9uAYEEAXESIGoaMg2eJMY7JD2vfeOKq1ocXrc" });
      const rootCid = await client.put([file], {
        name: fileName,
        maxRetries: 3,
      });

      const res = await client.get(rootCid);
      const files = await res.files();

      // Displaying the file details
      for (const file of files) {
        console.log(`${file.cid} ${file.name} ${file.size}`);
      }

      setUploadStatus(`File uploaded successfully! CID: ${rootCid}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  return (
      <div className="flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-2xl font-semibold mb-4 mt-10">Upload a File to LUV NFT</h2>
      <input
        type="file"
        className="p-2 mb-4 border border-gray-300 rounded-lg text-white"
        onChange={handleFileChange}
      />
      <input
        type="text"
        className="p-2 mb-4 border border-gray-300 rounded-lg text-black"
        placeholder="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={uploadFile}
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  )
}