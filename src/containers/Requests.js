import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API} from "aws-amplify";
import { onError } from "../libs/errorLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import "./Requests.css";

export default function Requests() {
  const { id } = useParams();
  const history = useHistory();
  const [request, setRequest] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    function loadRequest() {
      return API.get("requests", `/requests/${id}`);
    }

    async function onLoad() {
      try {
        const request = await loadRequest();
        const { content, size, color } = request;

        setContent(content);
        setColor(color);
        setSize(size);
        setRequest(request);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  function validateForm() {
    return content.length > 0 && /^\d+$/.test(content);
  }
  
  function saveRequest(request) {
    return API.put("requests", `/requests/${id}`, {
      body: request
    });
  }
  
  async function handleSubmit(event) {
  
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await saveRequest({
        content,
        size,
        color
      });
      history.push("/reservas");
      window.alert("Sua reserva foi salva com sucesso");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  function deleteRequest() {
    return API.del("requests", `/requests/${id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Tem certeza que deseja apagar o pedido?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteRequest();
      history.push("/reservas");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Requests">
      {request && (
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
                    checked={size === "Pequeno"}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label="Médio"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    value="Médio"
                    checked={size === "Médio"}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <Form.Check
                    inline
                    name="group1"
                    label="Grande"
                    type={type}
                    id={`inline-${type}-3`}
                    value="Grande"
                    checked={size === "Grande"}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
              ))}
            </Form>
            <>
            <Form.Label>Cor:</Form.Label>
            <Form.Control
              type="color"
              title="Escolha a cor desejada"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            </>
            <Form.Label>Quantidade:</Form.Label>
            <Form.Control 
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            type="submit"
            variant="dark"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Salvar reserva
          </LoaderButton>
          <LoaderButton
            block
            size="lg"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Deletar reserva
          </LoaderButton>
        </Form>
      )}
    </div>
  );
}