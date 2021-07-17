import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Reservas.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Reservas() {
  const [requests, setRequests] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const requests = await loadRequests();
        setRequests(requests);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadRequests() {
    return API.get("requests", "/requests");
  }

  function renderRequestsList(requests) {
    return (
      <>
        <LinkContainer to="/requests/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Criar uma nova reserva</span>
          </ListGroup.Item>
        </LinkContainer>
        {requests.map(({ requestId, content, color, size, createdAt }, index) => (
          <LinkContainer key={requestId} to={`/requests/${requestId}`}>
            <ListGroup.Item action>
              <div className="request__info__container">
                <span className="font-weight-bold">
                  {`${content} - ${size} - `}
                </span>
                <div className="request__info__color" style={{backgroundColor: color}}></div>
              </div>
              <br />
              <span>
                {`Número do pedido: ${requestId}`}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderRequests() {
    return (
      <div className="requests">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Suas reservas</h2>
        <ListGroup>{!isLoading && renderRequestsList(requests)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Reservas">
      {renderRequests()}
    </div>
  );
}
