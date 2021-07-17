import React, {useState} from "react";
import "./Home.css";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  function renderLander() {
 
    return (
      <div className="lander">
        <h1>Post It</h1>
        <p className="text-muted">Reserve seu Post It</p>
        <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Menos informações": "Mais informações" }</button>
        {/* {
          showInfo
          && ( */}
            <div className="conteudo" style={{height: showInfo ? 400 : 0, marginTop: showInfo ? 8 : 0}}>
              <p>Aqui você poderá personalizar seus blocos de Post-It do seu jeito!</p>
              <ul>
                <li>Escolha o tamanho:
                  <ul  className="a">
                    <li>Pequeno (47,6mm x 47,6mm)</li>
                    <li>Médio (76mm x 76mm)</li>
                    <li>Grande (76mm x 102mm)</li>
                  </ul>
                </li>
                <li>Escolha a cor que desejar!</li>
                <li>Indique a quantidade de blocos com 100 folhas que deseja reservar!</li>
              </ul>
              <p>Depois de reservar seu pedido, ele será separado e disponibilizado para retirada em nossa loja!</p>
            </div>
          {/* )
        } */}
      </div>  
    );
  }

  return (
    <div className="Home">
      {renderLander()}
    </div>
  );
}