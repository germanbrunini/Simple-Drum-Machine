
const audioOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


function MyApp(){
  
  const [volume,setVolume] = React.useState(0.5);
  const [currID,setCurrID] = React.useState("");
  return (
    <div
      id        = "drum-machine"
      className = "bg-info min-vh-100 text-white">
        <div
          id        = "display" 
          className = "text-center">
          <h1> Drum Machine </h1>
          {audioOne.map((clip) => (
            <Pad key   = {clip.id}
                clip   = {clip} 
                volume = {volume}
                setCurrID = {setCurrID}/>
              )
            )
          }
          <br />
          <h2>CHANGE VOLUME</h2>
          <input className = "w-50"
                onChange  = {(e)=>setVolume(e.target.value)}
                type  = "range"
                step  = "0.01"
                value = {volume}
                min   = "0"
                max   = "1"/>
          <br />
          <div id        = "currid"
               className = "justify-content-center text-center m-4 bg-warning mx-auto width: 50px">
            <h3>{currID}</h3>
          </div>
          
        </div>
    </div>
    );
}
  
function Pad({clip,volume,setCurrID}){

  const [active,setActive] = React.useState(false);

  /*
  Declara una “variable de estado”. Su estado inicial en este momento es False.
  Devuelve una pareja de valores: el estado actual y una función que lo actualiza.
  Por eso escribimos const [count, setCount] = useState()
  */

  // De forma similar a componentDidMount y componentDidUpdate 
  React.useEffect(()=>{
    document.addEventListener("keydown",handleKeyPress);
    return () => {
      document.removeEventListener("keydown",handleKeyPress);
    };
  },[]);

  const handleKeyPress=(e)=>{
    if (e.keyCode===clip.keyCode){
      playTheSound();
    }
  }
  /*
  ¿Qué hace useEffect? Al usar este Hook, le estamos indicando a
  React que el componente tiene que hacer algo después de renderizarse.
  React recordará la función que le hemos pasado (el argumento o input es una funcion).
  Nos referiremos a ella (esta funcion de entrada) como nuestro “efecto”, y la
  llamará más tarde después de actualizar el DOM. En este efecto, sonamos el sonido
  de los links segun toquemos una tecla, pero también podríamos hacer otras cosas.
  */

  const playTheSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger)
    setActive(true); // cambio el estado de active.
    setTimeout(()=>setActive(false),300); // cambiar el estado a false despues de 200ms
    audioTag.currentTime = 0;
    audioTag.volume = volume;
    audioTag.play();
    setCurrID(()=>clip.id);
  }
  return (
      <div 
        id      = "drum-pad"
        onClick = {playTheSound}
        className = {`drum-pad btn btn-primary rounded-circle p-4 m-5 ${active && "btn-success"}`}>
          <audio 
            className = "clip"
            id        = {clip.keyTrigger}
            src       = {clip.url}/>
          <h2>{clip.keyTrigger}</h2>
      </div>
  );
}
ReactDOM.render(<MyApp />,document.getElementById("root"));
    
    