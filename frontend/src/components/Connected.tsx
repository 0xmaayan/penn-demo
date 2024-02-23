import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getAptosClient } from "../utils/aptosClient";
import { Pet } from "./PetParts";
import { Mint } from "./Mint";

const aptosClient = getAptosClient();

export function Connected() {
  const [pet, setPet] = useState<Pet>();
  const { account, network } = useWallet();

  const fetchPet = useCallback(async () => {
    if (!account?.address) return;

    const [hasPet] = await aptosClient.view({
      payload: {
        function: `${import.meta.env.VITE_APP_CONTRACT_ADDRESS}::main::has_nft`,
        functionArguments: [account.address],
      },
    });
    if (hasPet as boolean) {
      const response = await aptosClient.view({
        payload: {
          function: `${
            import.meta.env.VITE_APP_CONTRACT_ADDRESS
          }::main::get_nft`,
          functionArguments: [account.address],
        },
      });
      const [name, parts] = response;
      const typedParts = parts as { body: number; ear: number; face: number };
      setPet({
        name: name as string,
        parts: typedParts,
      });
    }
  }, [account?.address]);

  useEffect(() => {
    if (!account?.address || !network) return;

    fetchPet();
  }, [account?.address, fetchPet, network]);

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* {network?.chainId !== TESTNET_ID && <Modal />} */}
      {pet ? <Pet pet={pet} setPet={setPet} /> : <Mint fetchPet={fetchPet} />}
    </div>
  );
}
