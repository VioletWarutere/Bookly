import React from "react";
import RequestCards from "./RequestCards";


const RequestPage = () => {



  return (
    <>
      <div>
               <h1 className="fw-bold py-3">Community requests</h1>     
      </div>
      <div className='requests-main row'>
          
                <RequestCards />
           
            
        </div>
    </>
  );
};

export default RequestPage;
