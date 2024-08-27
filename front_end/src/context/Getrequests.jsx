import React, { useState, useEffect, createContext } from "react";
import { BASE_URL } from "../utils/backend_services";
import Cookies from "js-cookie";


export const GetRequestsContext = createContext();

export const GetRequestsProvider = ({children}) => {
  const [requests, setRequests] = useState([]);
  const token = Cookies.get("token");


  useEffect(() => {
    const getRequests = async () => {
      const response = await fetch(`${BASE_URL}/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();

      if (response.ok) console.log(data);
      console.log(data.requests);
      setRequests(data.requests);
    };

    getRequests();
  }, [token]);

  

  return (
    <GetRequestsContext.Provider value={{requests, setRequests}}>
       {children}
    </GetRequestsContext.Provider>
  )
}
