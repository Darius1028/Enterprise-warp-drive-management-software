# Enterprise Warp-drive management software

## Estructura del Proyecto

- App.js =>  componente base del proyecto 

- components/form.js => contiene el componente formulario para interactuar con la funcion operationInyectors

- operationInyectors/operationInyectors.js => #contiene funcion operationInyectors(injectors, speedPercent)

- operationInyectors/test/operationInyectors.jest.js => #contiene test para funcion operationInyectors 

## Codigo

El funcion "operationInyectors"  permite calcular el flujo de funcionamiento de cada inyector para un porcentaje de la velocidad de la luz deseado, de modo que maximice el tiempo de funcionamiento en una situación de daño dada. 
El html test.html permite ver la consola de javascript en el navegador, para poder ver los sucesos del codigo, como tal dentro contiene el script para las variables input de los daños y la velocidad de la luz, para que funcione el codigo;

## Casos de uso

A modo de ejemplo, se ofrecen los siguientes inputs con sus respectivos resultados esperados:

  | Caso | Daño inyector A  | Daño inyector B  | Daño inyector C  | Porcentaje de la velocidad de la luz | Resultado                             |
  | ---- | ---------------  | ---------------  | ---------------  | ------------------------------------ | ------------------------------------- |
  |   1  | 0%               | 0%               | 0%               | 100%                                 | A: 100 mg/s, B: 100 mg/s, C: 100 mg/s |
  |   2  | 0%               | 0%               | 0%               | 90%                                  | A: 90 mg/s, B: 90 mg/s, C: 90 mg/s    |
  |   3  | 0%               | 0%               | 0%               | 30%                                  | A: 30 mg/s, B: 30 mg/s, C: 30 mg/s    |
  |   4  | 20%              | 10%              | 0%               | 100%                                 | A: 90 mg/s, B: 100 mg/s, C: 110 mg/s  |
  |   5  | 0%               | 0%               | 100%             | 80%                                  | A: 120 mg/s, B: 120 mg/s, C: 0 mg/s   |
  |   6  | 0%               | 0%               | 0%               | 150%                                 | A: 150 mg/s, B: 150 mg/s, C: 150 mg/s |
  |   7  | 0%               | 0%               | 30%              | 140%                                 | A: 150 mg/s, B: 150 mg/s, C: 120 mg/s |
  |   8  | 20%              | 50%              | 40%              | 170%                                 | “Unable to comply”                    |
 
A continuación, para cada input propuesto más arriba, el código debe ser capaz de calcular el tiempo máximo de funcionamiento. Los resultados esperados son:

  | Caso | Tiempo de funcionamiento  |    
  | ---- | ------------------------  | 
  |   2  | Infinito                  |  
  |   3  | Infinito                  |  
  |   4  | Infinito                  |  
  |   5  | 90 minutos                | 
  |   6  | 80 minutos                | 
  |   7  | 50 minutos                | 
  |   8  | 0 minutos                 |




In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

