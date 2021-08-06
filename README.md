## Documentacion

### Uso

```shell
npm i
node .
Go to http://localhost:3000 
```
### Syntaxis

La sintaxis de este lenguaje de programacion es basicamente la misma sintaxis que Typescript. Ej:

```ts
const x: Number = 10;
const y: Number = 20;

const result: Number = x + y;
```

#### Declaracion de variable

```js
var x: Number = 10;
let y: Boolean = false;
const z: String = "Hello World";
```

#### Asignacion de variables

```js
x = 10;
```

#### Operaciones

```js
var result: String = x + y;
var result: Number = x - y;
var result: Number = x * y;
```

#### Condiciones

```js
if (x > 20) {
    console.log(20);
}
```

#### Ciclos
```js
for (let i = 0; i < 10; i++) {
    console.log(i)
}
```

### Analisis Semantico

El analisis semantico puede detectar los siguientes errores:
- Variables no declaradas
```js
const x: Number = 20;
const result = x + y; // y no esta declarada
```

- Re-declaracion de variables
```js
const x: Number = 20;
const x: Number = 10; // La variable x ya esta declarada
```

- Re-asignacion de constantes

```js
const x: Number = 20;
x = 20; // La variable x es una constante no se pude reasignar.
```