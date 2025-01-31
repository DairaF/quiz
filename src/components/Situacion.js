import React, { useEffect, useState } from 'react';
import Herramienta from './Herramienta';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
function Situacion(props) {
    const step = props.step;
    const situation = props.situation;
    const block1=props.block1;
    const block2=props.block2;
    const block3=props.block3;
    const block4=props.block4;
    const opciones1=props.opciones1;
    const opciones2=props.opciones2;
    const opciones3=props.opciones3;
    const handleRealize = props.handleRealize;
    const handleAnswers = props.handleAnswers;
    const handleAnswer1 = props.handleAnswer1;
    const handleAnswer2 = props.handleAnswer2;
    const handleAnswer3 = props.handleAnswer3;
    const [oportunidad1, setOportunidad1] = useState(opciones1[0].texto);
    const [oportunidad2, setOportunidad2] = useState(opciones2[0].texto);
    const [oportunidad3, setOportunidad3] = useState(opciones3[0].texto);
    const [oportunidadValor1, setOportunidadValor1] = useState(opciones1[0].valor);
    const [oportunidadValor2, setOportunidadValor2] = useState(opciones2[0].valor);
    const [oportunidadValor3, setOportunidadValor3] = useState(opciones3[0].valor);
    const [isActive1, setActive1] = useState(false);
    const [isActive2, setActive2] = useState(false);
    const [isActive3, setActive3] = useState(false);
    const [activeOptions1, setActiveOptions1] = useState(false);
    const [activeOptions2, setActiveOptions2] = useState(false);
    const [activeOptions3, setActiveOptions3] = useState(false);

    const [info, setInfo] = useState(true);
    const toggleInfo = () => {
      setInfo(!info);
    }
    const [segure, setSegure] = useState(true);
    const toggleSegure = () => {
      setSegure(!segure);
    }

    //forzar estado xq no capta 3er mount +
    useEffect( () => {
      setOportunidad1(opciones1[0].texto);
      setOportunidad2(opciones2[0].texto);
      setOportunidad3(opciones3[0].texto);
      setOportunidadValor1(opciones1[0].valor);
      setOportunidadValor2(opciones2[0].valor);
      setOportunidadValor3(opciones3[0].valor);
      setActive1(false);
      setActive2(false);
      setActive3(false);
   }, [props.opciones1]);

    const elegirTexto = (valor, texto, cual) => {
      if(cual === 1) { 
        setOportunidad1(texto);
        setOportunidadValor1(valor);
        handleAnswer1(valor);
      }
      else if( cual === 2) {
        setOportunidad2(texto);
        setOportunidadValor2(valor);
        handleAnswer2(valor);
      }
      else{
        setOportunidad3(texto);
        setOportunidadValor3(valor);
        handleAnswer3(valor);
      }
    };
    const toggleOnce = (cual) => {
      if(cual === 1) {
        if(!isActive1){
          setActive1(!isActive1);
          handleRealize();
        }
      }else if(cual === 2) {
        if(!isActive2){
          setActive2(!isActive2);
          handleRealize();
        }
      }else{
        if(!isActive3){
          setActive3(!isActive3);
          handleRealize();
        }
      }
    };
    const toggleOptions = (options) => {
      if(options === 1 ){
      setActiveOptions1(!activeOptions1);
      setActiveOptions2(false);
      setActiveOptions3(false);
      }else if(options === 2){
      setActiveOptions2(!activeOptions2);
      setActiveOptions1(false);
      setActiveOptions3(false);
      }else{
      setActiveOptions3(!activeOptions3);
      setActiveOptions1(false);
      setActiveOptions2(false);
      }
    };    
  useEffect(() => {
    handleAnswer1(oportunidadValor1);
    handleAnswer2(oportunidadValor2);
    handleAnswer3(oportunidadValor3);
},);

  return (
    <div className=''>
      <div className={segure == false ? 'blackScreen': info == false ? 'blackScreen':'hidden'}></div>
      <div id="segure" className={segure? "hidden": "block"}>
        <a onClick={toggleSegure} className='f2 mx-3 floatR'>x</a>
        <p className='col-10 col-md-8 my-5 mx-auto'><b>¿Estás segure que querés finalizar y volver?</b></p>
        <div className='row justify-content-center mb-5'>
          <a href='/#quiz' className='col-2 text-center f1-5'>Sí</a>
          <a onClick={toggleSegure} className='col-2 text-center f1-5'><b>No</b></a>
        </div>
      </div>
      <div id="modalInfo" className={info? "hidden": "block"}>
        <a onClick={toggleInfo} className='f2 mx-3 floatR'>x</a>
        <div className='row justify-content-center'>
          <p className='col-12 col-md-10 my-5'><b>Encontrá las 3 expresiones excluyentes en cada situación, clickealas y reemplazalas con una opción más inclusiva.</b></p>
          <div className='col-10 col-md-5 mb-5'>
            <img src={require("../assets/img/ejMobile.gif")} />
          </div>
        </div>
      </div>
      <div id='situacionFull' className=' '>
        <div className='container'>
          <img onClick={toggleInfo} className="pulse" id="ayuda" src={require("../assets/img/ayuda.png")} />
          <a onClick={toggleSegure} id="volver"><img src={require("../assets/img/volver.png")} /><span><b> Volver</b></span></a>
          <span id="stepGuia" className='col-5 lila'><b><span className='hide-sm'>Situación</span> {step}/4</b></span> 
          <div className='row justify-content-center m-0'> 
          {/* <h3 className='lila mt-5 col-10 pt-2 hide-sm'>Encontrá las expresiones exclusivas en este texto!</h3>  */}
            <div className='mt-25 mt-md-1 bg-white border-negro-redondeado col-10 col-md-6 mx-auto m-md-1 situacion'>
              <div className={situation=="tweets"?"twitter": situation=="papers"?"playfair":situation=="hablados"?"comilla":""}>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                  {situation == "tweets" ?  <img id="twtacc" className='mx-3' src={require('../assets/img/twtacc.jpg')}/>:""}
                <p className='ml-3 p-3 ml-md-5'>
                  <span>{block1}</span>
                  <span className={isActive1 ? 'activo1': 'noactivo1'} onClick={()=>{if(activeOptions1==false && activeOptions2==false && activeOptions3==false){toggleOnce(1);toggleOptions(1)}}}>{oportunidad1}</span>
                  <span>{block2}</span>
                  <span className={isActive2 ? 'activo2': 'noactivo2'} onClick={()=>{if(activeOptions1==false && activeOptions2==false && activeOptions3==false){toggleOnce(2);toggleOptions(2)}}}>{oportunidad2}</span>
                  {block3}
                  <span className={isActive3 ? 'activo3': 'noactivo3'} onClick={()=>{if(activeOptions1==false && activeOptions2==false && activeOptions3==false){toggleOnce(3);toggleOptions(3)}}}>{oportunidad3}</span>
                  <span>{block4}</span>
                </p>
                {situation == "tweets" ?  <img id="twtdate" className='ml-3 ' src={require('../assets/img/twtbrdr.png')}/>:""}
                </AnimationOnScroll>
              </div>
            </div>
            <div className='col-7 col-md-3 m-2 m-md-5 quizImg'>
              <img className='wiggle' src={  situation=="tweets" ? require('../assets/img/illus/tweet.png'):  
                          situation=="papers" ? require('../assets/img/illus/paper.png'): 
                          situation=="hablados" ? require('../assets/img/illus/hablado.png'): 
                          situation=="notas" ? require('../assets/img/illus/nota.png'): "" } />
            </div>
          </div>
          <div>
            <div className={activeOptions1 ? 'activa options': 'noactivas options'}  >
              { opciones1.map(n => { return <p onClick={()=>{elegirTexto(n.valor, n.texto, 1);toggleOptions(1)}} className='option' value={n.valor}> <span className='blanco'>{n.texto}</span></p> } ) }
            </div>
            <div className={activeOptions2 ? 'activa options': 'noactivas options'} >
              { opciones2.map(n => { return <p onClick={()=>{elegirTexto(n.valor, n.texto, 2);toggleOptions(2)}} className='option' value={n.valor}> <span className='blanco'>{n.texto}</span></p> } ) }
            </div>
            <div className={activeOptions3 ? 'activa options': 'noactivas options'} >
              { opciones3.map(n => { return <p onClick={()=>{elegirTexto(n.valor, n.texto, 3);toggleOptions(3)}} className='option' value={n.valor}> <span className='blanco'>{n.texto}</span></p> } ) }
            </div>
          </div>
        </div> 
        <div className='btnQuiz'>
              <a id="siguenteBtn" onClick={()=>{handleAnswers(); setActiveOptions1(false); setActiveOptions2(false); setActiveOptions3(false);}}><b>Siguiente</b></a>
              <a id="flechaBtn" onClick={()=>{handleAnswers(); setActiveOptions1(false); setActiveOptions2(false); setActiveOptions3(false);}}><img alt="." src={require("../assets/img/flecha.png")}/></a>
        </div>
      </div>  
    </div>
  );
}

export default Situacion;
