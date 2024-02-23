import { PetImage } from "./PetImage";
import { PetParts } from "./PetParts";
import { ShuffleButton } from "./ShuffleButton";

export default function ShufflePetImage({
  petParts,
  setPetParts,
}: {
  petParts: PetParts;
  setPetParts: React.Dispatch<React.SetStateAction<PetParts>>;
}) {
  const handleShuffle = () => {
    const randomPetParts = {
      body: Math.floor(
        Math.random() * Number(import.meta.env.VITE_APP_BODY_OPTIONS)
      ),
      ear: Math.floor(
        Math.random() * Number(import.meta.env.VITE_APP_EAR_OPTIONS)
      ),
      face: Math.floor(
        Math.random() * Number(import.meta.env.VITE_APP_FACE_OPTIONS)
      ),
    };
    setPetParts(randomPetParts);
  };

  return (
    <div className="flex flex-col gap-6 self-center">
      <PetImage petParts={petParts} />
      {/* <ShuffleButton handleShuffle={handleShuffle} /> */}
    </div>
  );
}
