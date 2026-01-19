const HelloC = (props) => {
    //Primera forma
    //const nombre = props.nombre;
    //const edad = props.edad;

    //Segunda forma
    const{nombre, edad} = props;
  const anioNacimiento = () =>  new Date().getFullYear() - edad;
  
  return (
    <div>
      <p>
        Hola {nombre}, tienes {edad} años
      </p>
      <p>Tu naciste en el año  {anioNacimiento()}</p>
    </div>
  )
}
const Contador = (props) => {
  return(
    <div>{props.counter}</div>
  )
}
const Boton = (props) =>{
  return(
    <button onClick ={props.onClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
export{HelloC, Contador, Boton, Display};