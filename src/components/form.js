import React, { useState } from "react";

import { operationInyectors } from '../operationInyectors/operationInyectors';

function Form() {

  const [result, setResult] = useState({});

  const [damageA, setDamageA] = useState(0);
  const [damageB, setDamageB] = useState(0);
  const [damageC, setDamageC] = useState(0);
  const [speedPercent, setSpeedPercent] = useState(100);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const injectors = {
      A: { damage: damageA },
      B: { damage: damageB },
      C: { damage: damageC },
    };
    const data = operationInyectors(injectors, speedPercent);
    setResult(data);
  };

  return (
    <>

      <form onSubmit={formSubmitHandler} >
        <label>
          % Daño Injector A:
          <input
            type="number"
            min="0"
            max="100"
            value={damageA}
            onChange={event => setDamageA(parseInt(event.target.value))}
          />
        </label>
        <br />
        <label>
          % Daño Injector B:
          <input
            type="number"
            min="0"
            max="100"
            value={damageB}
            onChange={event => setDamageB(parseInt(event.target.value))}
          />
        </label>
        <br />
        <label>
          % Daño Injector C:
          <input
            type="number"
            min="0"
            max="100"
            value={damageC}
            onChange={event => setDamageC(parseInt(event.target.value))}
          />
        </label>
        <br />
        <label>
          % de Velocidad:
          <input
            type="number"
            min="0"
            value={speedPercent}
            onChange={event => setSpeedPercent(parseInt(event.target.value))}
          />
        </label>
        <br />
        <input type="submit" value="Calcular" />
      </form>
       {Object.keys(result).length !== 0 
        ?
        <div>
          <div>
            <div>Flujo A: {Math.trunc(result.injectorsFlux.A?.flux)} mg/s</div>
            <div>Flujo B: {Math.trunc(result.injectorsFlux.B?.flux)} mg/s</div>
            <div>Flujo C: {Math.trunc(result.injectorsFlux.C?.flux)} mg/s</div>
          </div>
          <div> Tiempo maximo {Math.trunc(result.maxTime)} minutos</div>
        </div>
        : <div>Empty</div>
        }


    </>
  );
}

export default Form;
