   // components/SelectedDateContext.js
   import React, { createContext, useState, useContext } from 'react';

   const SelectedDateContext = createContext();

   export const useSelectedDate = () => {
     return useContext(SelectedDateContext);
   };

   export const SelectedDateProvider = ({ children }) => {
     const [selectedDate, setSelectedDate] = useState(new Date());

     return (
       <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
         {children}
       </SelectedDateContext.Provider>
     );
   };