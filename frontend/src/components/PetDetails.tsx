import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Pet } from "./PetParts";

export interface PetDetailsProps {
  pet: Pet;
}

export function PetDetails({ pet }: PetDetailsProps) {
  const { account } = useWallet();
  const owner = account?.ansName
    ? `${account?.ansName}.apt`
    : account?.address || "";

  const nameFieldComponent = (
    <div className="nes-field">
      <label htmlFor="name_field">Name</label>
      <div className="relative">
        <input
          type="text"
          id="name_field"
          className="nes-input"
          value={pet.name}
        />
      </div>
    </div>
  );

  const ownerFieldComponent = (
    <div className="nes-field">
      <label htmlFor="owner_field">Owner</label>
      <div className="relative">
        <input
          type="text"
          id="owner_field"
          className="nes-input pr-12"
          disabled
          value={owner}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {nameFieldComponent}
        {ownerFieldComponent}
        <br />
      </div>
    </div>
  );
}
