"use client";

import { useRouter } from "next/navigation";

const Face = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <h1> Face </h1> <button onClick={handleClick}> Back </button>{" "}
    </>
  );
};

export default Face;
