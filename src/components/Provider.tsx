import React, { useState, createContext } from "react";

type providerProps = {
  children: React.ReactElement[] | React.ReactElement;
};

export type ctxType = {
  route: google.maps.DirectionsResult | undefined;
  setDirection: (direction: google.maps.DirectionsResult) => void;
};

export const ctx = createContext<ctxType>({} as ctxType);

export const Provider = ({ children }: providerProps) => {
  const [route, setRoute] = useState<google.maps.DirectionsResult>();
  const setDirection = (direction: google.maps.DirectionsResult) =>
    setRoute(direction);

  return (
    <ctx.Provider value={{ route, setDirection }}>{children}</ctx.Provider>
  );
};
