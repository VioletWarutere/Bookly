import React from 'react'
import RequestForm from './RequestForm'
import RequestCards from './RequestCards'
import { GetRequestsContext } from "../../context/Getrequests";

const PostRequest = () => {
    const { requests } = React.useContext(GetRequestsContext);
  console.log(requests);
    return (
        <div className='requests-main row'>
            <div className="requests-sideBar col-sm-3">
                <h4 className='fw-medium fs-5 py-1'>Current requests</h4>
               {
                requests.map((request) => {
                    return (
                        <div
                          className="card my-2"
                          key={request.title}
                          style={{ maxWidth: '210px' }}
                        >
                          
                          <a
                            href={`/request/${request._id}`}
                            className="link-offset-2 link-underline link-underline-opacity-0"
                          >
                            <img
                            src={request.image}
                            className="img-fluid rounded-start"
                            alt="request"
                          />
                          </a>
                
                          <div className="col-md-12">
                                  <div className="text-group g-0">
                                    <h5 className="books-title">{request.title}</h5>
                      
                                    <p className="books-subtitle">{request.author}</p>
                      
                                    <p className="books-smalltexts">
                                      <small className="badge">
                                        REQUEST
                                      </small>
                                    </p>
                                  </div>
                                </div>
                
                        </div>
                    );
                  })
               }
            </div>
            <div className="requests-form col-sm-9 sticky-content" >
                
                <RequestForm />
            </div>
        </div>
      )
}

export default PostRequest