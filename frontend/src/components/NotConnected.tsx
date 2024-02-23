import { useState } from "react";
import { DEFAULT_PET, PetParts } from "../components/PetParts";
import ShufflePetImage from "../components/ShufflePetImage";

export default function NotConnected() {
  const [petParts, setPetParts] = useState<PetParts>(DEFAULT_PET.parts);

  const text = `Welcome to Aptogotchi! Once you connect your wallet, you'll be able to mint your new on-chain pet`;

  return (
    <div className="flex flex-col gap-6 p-6">
      <ShufflePetImage petParts={petParts} setPetParts={setPetParts} />
      <div className="nes-container is-dark with-title">
        <p className="text-3xl">{text}</p>
      </div>
    </div>
  );
}
