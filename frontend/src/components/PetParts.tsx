import { Dispatch, SetStateAction } from "react";
import { PetImage } from "./PetImage";
import { PetDetails } from "./PetDetails";

export interface Pet {
  name: string;
  parts: PetParts;
}

export interface PetParts {
  body: number;
  ear: number;
  face: number;
}

export const DEFAULT_PET = {
  name: "Unknown",
  parts: {
    body: 0,
    ear: 0,
    face: 0,
  },
};

interface PetProps {
  pet: Pet;
  setPet: Dispatch<SetStateAction<Pet | undefined>>;
}

export function Pet({ pet }: PetProps) {
  return (
    <div className="flex flex-col self-center m-10">
      <div className="flex flex-row self-center gap-12">
        <div className="flex flex-col gap-4 w-[600px]">
          <PetImage petParts={pet.parts} avatarStyle />
          <PetDetails pet={pet} />
        </div>
      </div>
    </div>
  );
}
