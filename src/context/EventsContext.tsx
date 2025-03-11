/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from 'react';

interface EventsContextType {
  events: any[];
  addEvent: (event: any) => void;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  addEvent: () => {},
});

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<any[]>([]);

  const addEvent = (newEvent: any) => {
    setEvents(prev => [newEvent, ...prev]); // Add new event to the top
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext); 