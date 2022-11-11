import React, { useState } from "react";

import { operationInyectors } from '../operationInyectors/operationInyectors';

function Form() {

  const [result, setResult] = useState([]);

  const [damageA, setDamageA] = useState(0);
  const [damageB, setDamageB] = useState(0);
  const [damageC, setDamageC] = useState(0);
  const [speedPercent, setSpeedPercent] = useState(100);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const injectors = [
      { damage: damageA },
      { damage: damageB },
      { damage: damageC },
    ];
    const data = operationInyectors(injectors, speedPercent);
    setResult(data);
    console.log(data);
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
      {result.length !== 0
        ?
        <div>
          <div>
          { !result.injectorsFlux.hasOwnProperty('error') ?
              result.injectorsFlux.map((flux, index) => (
                <div>Flujo {index}: {Math.trunc(flux)} mg/s</div>
              ))
              : <div>{result.injectorsFlux.error}</div>
          }            

          </div>
          <div> Tiempo maximo {Math.trunc(result.maxTime)} minutos</div>
        </div>
        : <div>Empty</div>
      }


    </>
  );
}

export default Form;
