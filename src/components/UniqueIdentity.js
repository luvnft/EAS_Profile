import React, { useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useSigner } from "@thirdweb-dev/react";

const EASContractAddress = "0x4200000000000000000000000000000000000021"; //Optimism Goreli 

export default function UniqueIdentity() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [submitUID, setSubmitUID] = useState("");
  const [loading, setLoading] = useState(false);
  const [enteredAddresses, setEnteredAddresses] = useState([]);

  const signer = useSigner();

  const isDuplicateAddress = (address) => {
    return enteredAddresses.includes(address);
  };

  const submitAttestation = async () => {
    if (isDuplicateAddress(address)) {
      alert("Error: Duplicate address entered.");
      return; // Prevent submission if it's a duplicate
    }

    setSubmitUID("");
    // const signer = await wallet.getSigner();

    const eas = new EAS(EASContractAddress);
    eas.connect(signer);

    const schemaEncoder = new SchemaEncoder("address Address, string DomainName");
    const encodedData = schemaEncoder.encodeData([
      { name: "Address", value: address, type:"address" },
      { name: "DomainName", value: name, type: "string" },
    ]);

    const schemaUID =
      "0x437088a292109f39808900471acb7b0954f9b62dcbfd37bf2d25a460e523b292";

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
    console.log(`https://optimism-goerli-bedrock.easscan.org/attestation/view/${newAttestationUID}`);

    setEnteredAddresses([...enteredAddresses, address]);
    setName("");
    setAddress("");
  };

  return (
    <div >
      <h2 className="text-2xl font-semibold text-white mb-4">Create your domain name!!</h2>
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
        placeholder="Enter your DomainName"
        value={name}
        onChange={(e) => setName(e.target.value)}
    />

    <button 
        onClick={submitAttestation}
        className="w-72 p-2 text-white bg-slate-400 rounded-md self-center hover:bg-slate-500"
    >
    Submit Verification
    </button>
    {loading && <p className="mt-4 text-black">Loading...</p>}
    {submitUID && (
        <div className="mt-4 text-black">
            New Verification Submitted with UID: {submitUID}
        </div>
    )}
</div>
  );
}
