import React, { useEffect } from 'react';
import BaseUI from '../components/baseUI/baseUI';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
const Home: React.FC = () => {
  useEffect(() => {
    const div = document.getElementsByClassName("pokeball")[0];
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 9; j++) {
        const d = document.createElement("div");
        if (i > 9) {
          d.className = "red";
        } else if (i === 0 || i === 9) {
          d.className = "black";
        } else {
          d.className = "white";
        }
        d.style.transform = `rotateX(${j * 20}deg) rotateY(${i * 20}deg) translateZ(57px) `;
        div.appendChild(d);
      }
    }

    const nappi = document.createElement("div");
    nappi.className = "nappi";
    div.appendChild(nappi);
  }, []);

  return (
    <BaseUI>
      <ContainerHome>
        <div id='particles-js'>
        <Typography variant='h4' className='bienvenida'> BIENVENIDO ENTRENADOR</Typography>
        <Typography variant='subtitle2' className='bienvenida'> Este Sitio esta en construccion, ATRAPALOS A TODOS si funciona pero solo para la primera generacion.</Typography>
        </div>
        <div className="container">
          <link rel="container_pokeball" href="https://codepen.io/Sukk4/pen/VjNowW" />
          <div className="pokeball"></div>
        </div>
      </ContainerHome>
    </BaseUI>
  );
};

export default Home;

const ContainerHome = styled.div`
  height: calc(12vw + 10rem);
  display: flex;
  align-items: center;
  justify-content: center;
  .bienvenida{
    text-align: center;
  }
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -60px;
    display: block;
    width: 120px;
    height: 120px;
  }

  @keyframes rotate {
    0% {
      transform: rotateY(0deg); /* Inicia recto y en horizontal */
    }
    100% {
      transform: rotateY(360deg); /* Gira 360 grados en el eje Y */
    }
  }

  .pokeball {
    transform-style: preserve-3d;
    animation: rotate 2.5s infinite linear;
    width: 114px;
    height: 114px;
    /* Asegura que esté en posición horizontal al inicio */
    transform: rotateX(0deg) rotateY(0deg); 
    position: relative;
  }

  .pokeball .nappi {
    border-radius: 50%;
    transform: translateZ(58px);
    width: 25px;
    height: 25px;
    margin: 32%;
    border: 10px solid black;
    background-color: #fff;
  }

  .pokeball div {
    width: 21px;
    height: 21px;
    display: block;
    position: absolute;
    margin: 47px;
  }

  .pokeball .red {
    background-color: #f00;
  }

  .pokeball .black {
    background-color: #000;
  }

  .pokeball .white {
    background-color: #fff;
  }
`;
