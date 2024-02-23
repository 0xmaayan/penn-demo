import { PetParts } from "./PetParts";

export type PetAction = "feed" | "play";

export interface PetImageProps {
  petParts: PetParts;
  avatarStyle?: boolean;
}

export function PetImage(props: PetImageProps) {
  const { avatarStyle } = props;
  const head = BASE_PATH + "head.png";
  const body = BASE_PATH + bodies[0];
  const ear = BASE_PATH + ears[0];
  const face = BASE_PATH + faces[0];

  const imgClass = "absolute top-0 left-0 w-full h-full object-contain";

  return (
    <div
      className={`bg-[hsl(104,40%,75%)] border-double border-8 border-black p-2 relative ${
        avatarStyle ? "h-44 w-44" : "h-80 w-80"
      }`}
      style={{ paddingTop: "1rem" }}
    >
      <div className={`relative h-full w-full animate-wiggle`}>
        <img src={head} className={imgClass} alt="pet head" />
        <img src={body} className={imgClass} alt="pet body" />
        <img src={ear} className={imgClass} alt="pet ears" />
        <img src={face} className={imgClass} alt="pet face" />
      </div>
    </div>
  );
}

export const BASE_PATH = "src/assets/pet-parts/";

export const bodies = [
  "body1.png",
  "body2.png",
  "body3.png",
  "body4.png",
  "body5.png",
];

export const ears = [
  "ear1.png",
  "ear2.png",
  "ear3.png",
  "ear4.png",
  "ear5.png",
  "ear6.png",
];

export const faces = ["face1.png", "face2.png", "face3.png", "face4.png"];
