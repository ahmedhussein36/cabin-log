'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

interface VillaContextType {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  length: number;
  setLength: (length: number) => void;
  width: number;
  setWidth: (width: number) => void;
  doors: number;
  setDoors: (doors: number) => void;
  windows: number;
  setWindows: (windows: number) => void;
  additionalRoom: 'yes' | 'no';
  setAdditionalRoom: (additionalRoom: 'yes' | 'no') => void;
  additionalRoomCount: number;
  setAdditionalRoomCount: (additionalRoomCount: number) => void;
  doorType: string;
  setDoorType: (doorType: string) => void;
  windowType: string;
  setWindowType: (windowType: string) => void;
  bathroomLocation: 'inside' | 'outside';
  setBathroomLocation: (bathroomLocation: 'inside' | 'outside') => void;
  additionalFeatures: string[];
  setAdditionalFeatures: (additionalFeatures: string[]) => void;
}

const VillaContext = createContext<VillaContextType | undefined>(undefined);

export const VillaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(3);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(1);
  const [additionalRoom, setAdditionalRoom] = useState<'yes' | 'no'>('no');
  const [additionalRoomCount, setAdditionalRoomCount] = useState(1);
  const [doorType, setDoorType] = useState('');
  const [windowType, setWindowType] = useState('');
  const [bathroomLocation, setBathroomLocation] = useState<'inside' | 'outside'>('inside');
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([]);

  useEffect(() => {
    const savedState = localStorage.getItem('villaCustomizerState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setLang(parsedState.lang);
      setLength(parsedState.length);
      setWidth(parsedState.width);
      setDoors(parsedState.doors);
      setWindows(parsedState.windows);
      setAdditionalRoom(parsedState.additionalRoom);
      setAdditionalRoomCount(parsedState.additionalRoomCount);
      setDoorType(parsedState.doorType);
      setWindowType(parsedState.windowType);
      setBathroomLocation(parsedState.bathroomLocation);
      setAdditionalFeatures(parsedState.additionalFeatures);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('villaCustomizerState', JSON.stringify({
      lang, length, width, doors, windows, additionalRoom, additionalRoomCount,
      doorType, windowType, bathroomLocation, additionalFeatures
    }));
  }, [lang, length, width, doors, windows, additionalRoom, additionalRoomCount,
      doorType, windowType, bathroomLocation, additionalFeatures]);

  return (
    <VillaContext.Provider value={{
      lang, setLang, length, setLength, width, setWidth, doors, setDoors,
      windows, setWindows, additionalRoom, setAdditionalRoom,
      additionalRoomCount, setAdditionalRoomCount, doorType, setDoorType,
      windowType, setWindowType, bathroomLocation, setBathroomLocation,
      additionalFeatures, setAdditionalFeatures
    }}>
      {children}
    </VillaContext.Provider>
  );
};

export const useVilla = () => {
  const context = useContext(VillaContext);
  if (context === undefined) {
    throw new Error('useVilla must be used within a VillaProvider');
  }
  return context;
};

