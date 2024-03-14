import React, { useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useSigner } from "@thirdweb-dev/react";

const EASContractAddress = "0x4200000000000000000000000000000000000021"; //Optimism Goreli 

export default function AddDetails() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [storageURL, setStorageURL] = useState('');
  const [submitUID, setSubmitUID] = useState("");
  const [loading, setLoading] = useState(false);

  const signer = useSigner();

  const submitAttestation = async () => {
    setSubmitUID("");
    // const signer = await wallet.getSigner();

    const eas = new EAS(EASContractAddress);
    eas.connect(signer);

    const schemaEncoder = new SchemaEncoder("string Name, uint8 Age, address Address, string StorageURL");
    const encodedData = schemaEncoder.encodeData([
      { name: "Name", value: name, type: "string" },
      { name: "Age", value: age, type: "uint8" },
      { name: "Address", value: address, type:"address" },
      { name: "StorageURL", value: storageURL, type: "string" },
    ]);

    const schemaUID =
      "0x42dc39e1596a1b93a0bfcfbc8ff4d21d4450fc5894ef28c62cccba037487e144";

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: address,
        expirationTime: 0,
        revocable: false,
        data: encodedData,
      },
    });

    setLoading(true);

    const newAttestationUID = await tx.wait();

    setLoading(false);

    setSubmitUID(newAttestationUID);

    setName("");
    setAge(0);
    setAddress("");
    setStorageURL("");
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-black mb-4">Enter Your Details</h2>
      <input
        className="border border-gray-300 p-2 rounded-lg text-black"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
    />
    <input
        className="border border-gray-300 p-2 rounded-lg text-black"
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
    />
    <input
        className="border border-gray-300 p-2 rounded-lg text-black"
        type="text"
        placeholder="Enter Address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
    />
    <input
        className="border border-gray-300 p-2 rounded-lg text-black"
        type="text"
        placeholder="LUV NFT PROFILE URL"
        value={storageURL}
        onChange={(e) => setStorageURL(e.target.value)}
    />

    <button 
        onClick={submitAttestation}
        className="w-72 p-2 text-white bg-slate-400 rounded-md self-center hover:bg-slate-500"
      >
    Submit Attestation
    </button>
    {loading && <p className="mt-4 text-black">Loading...</p>}
    {submitUID && (
        <div className="mt-4 text-black">
            New Attestation Submitted with UID: {submitUID}
        </div>
    )}
</div>
  );
}
