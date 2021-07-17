import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import "./NewRequest.css";
import { API } from "aws-amplify";

export default function NewRequest() {
  const history = useHistory();
  const [content, setContent] = useState("");
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#563d7c");

  function validateForm() {
    return content.length > 0 && size.length > 0 && /^\d+$/.test(content);
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
     try {   
       await createRequest({ content, size, color });
       window.alert("Sua reserva foi criada com sucesso");
       history.push("/reservas");
     } catch (e) {
       onError(e);
       setIsLoading(false);
     }
  }
  
  
  function createRequest(request) {
    return API.post("requests", "/requests", {
      body: request
    });
  }

  return (
    <div className="NewRequest">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form> Tamanho:
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Pequeno"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                  value="Pequeno"
                  onChange={(e) => setSize(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Médio"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                  value="Médio"
                  onChange={(e) => setSize(e.target.value)}
                />
                <Form.Check
                  inline
                  name="group1"
                  label="Grande"
                  type={type}
                  id={`inline-${type}-3`}
                  value="Grande"
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
            ))}
          </Form>
          <>
          <Form.Label>Cor:</Form.Label>
            <Form.Control
              type="color"
              defaultValue="#563d7c"
              title="Escolha a cor desejada"
              onChange={(e) => setColor(e.target.value)}
            />
          </>
          <Form.Label>Quantidade:</Form.Label>
          <Form.Control
            value={content}
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="dark"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Reservar
        </LoaderButton>
      </Form>
    </div>
  );
}