import { useState } from "react";
import { connectWallet } from "../services/wallet";

export default function ConnectWallet() {

  const [address, setAddress] = useState("");

  const handleConnect = async () => {

    const wallet = await connectWallet();

    if (wallet) {
      setAddress(wallet);
    }

  };

  return (

    <div>

      <button onClick={handleConnect}>
        Connect Wallet
      </button>

      {address && (
        <p>
          Connected Wallet: {address}
        </p>
      )}

    </div>

  );

}