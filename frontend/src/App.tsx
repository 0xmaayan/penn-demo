import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import "nes.css/css/nes.min.css";
import NotConnected from "./components/NotConnected";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Connected } from "./components/Connected";

export default function App() {
  const { connected } = useWallet();

  return (
    <>
      <div className="navbar">
        <div className="navbar-text">Aptogotchi</div>
        <div>
          <WalletSelector />
        </div>
      </div>
      <div className="center-container">
        {connected ? <Connected /> : <NotConnected />}
      </div>
    </>
  );
}
