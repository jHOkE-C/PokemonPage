import styled from '@emotion/styled';
import { Typography } from '@mui/material';

interface CardGeneralProps {
  url: string;
  id: number;
  type: 
    | 'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy';
    marcado: boolean,
    name:string
}

const CardGeneral: React.FC<CardGeneralProps> = ({ url, id, type, marcado, name }) => {
  return (
    <CardContainer type={type} marcado={marcado}>
      <div className='transparente'>
        <SnowContainer type={type}>
          {Array.from({ length: 50 }).map((_, index) => (
            <div key={index} className="snow"></div>
          ))}
        </SnowContainer>
        <Typography>N°{id}</Typography>
        <Typography>{name}</Typography>
        <Img>
          <div className="img">
            <img src={url} alt={`Imagen ${id}`} />
          </div>
        </Img>
      </div>
    </CardContainer>
  );
};

export default CardGeneral;

const CardContainer = styled.div<{ type: string, marcado:boolean }>`
  border-radius: 0.42rem;
  height: calc(1vw + 5rem);
  width: calc(1vw + 16rem);
  .transparente{
    position: relative;
    overflow: visible; /* Permitir que los elementos se desborden */
    border-radius: 0.42rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: calc(1vw + 5rem);
    width: calc(1vw + 16rem);
    background-color: ${(props) => (props.marcado ? 'rgba(0, 0, 0, 0.2)' : 'transparent')};
    :hover{
      background-color: #d1d1d1;
      z-index: 100;
      opacity: 0.3;
      cursor: pointer;
    }
    :active{
      background-color: white;
    }
    /* Cambiar fondo cuando marcado sea true */
    
  }
  background: ${(props) => {
    switch (props.type) {
      case 'normal':
        return '#c5c5c5';
      case 'fire':
        return '#EE8130';
      case 'water':
        return '#6390F0';
      case 'electric':
        return '#F7D02C';
      case 'grass':
        return '#7AC74C';
      case 'ice':
        return '#96D9D6';
      case 'fighting':
        return '#C22E28';
      case 'poison':
        return '#A33EA1';
      case 'ground':
        return '#E2BF65';
      case 'flying':
        return '#A98FF3';
      case 'psychic':
        return '#F95587';
      case 'bug':
        return '#A6B91A';
      case 'rock':
        return '#B6A136';
      case 'ghost':
        return '#735797';
      case 'dragon':
        return '#6F35FC';
      case 'dark':
        return '#705746';
      case 'steel':
        return '#B7B7CE';
      case 'fairy':
        return '#D685AD';
      default:
        return 'white'; // Default fallback color
    }
  }};
`;

const SnowContainer = styled.div<{ type: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* El tamaño del contenedor padre */
  pointer-events: none;
  overflow: hidden;

  .snow {
    z-index: 1000;
    position: absolute;
    width: 8px; /* Tamaño ajustable */
    height: 8px;
    background: ${(props) => {
      switch (props.type) {
        case 'normal':
          return '#A8A77A';
        case 'fire':
          return '#EE8130';
        case 'water':
          return '#6390F0';
        case 'electric':
          return '#F7D02C';
        case 'grass':
          return '#7AC74C';
        case 'ice':
          return '#96D9D6';
        case 'fighting':
          return '#C22E28';
        case 'poison':
          return '#A33EA1';
        case 'ground':
          return '#E2BF65';
        case 'flying':
          return '#A98FF3';
        case 'psychic':
          return '#F95587';
        case 'bug':
          return '#A6B91A';
        case 'rock':
          return '#B6A136';
        case 'ghost':
          return '#735797';
        case 'dragon':
          return '#6F35FC';
        case 'dark':
          return '#705746';
        case 'steel':
          return '#B7B7CE';
        case 'fairy':
          return '#D685AD';
        default:
          return 'white'; // Default fallback color
      }
    }};
    border-radius: 50%;
    animation: fall linear infinite;
    opacity: ${Math.random() * 0.6 + 0.4}; /* Opacidad aleatoria entre 0.4 y 1 */
  }

  ${Array.from({ length: 50 }) // Genera estilos únicos para cada partícula
    .map(
      (_, i) => `
      .snow:nth-of-type(${i + 1}) { /* Cambié :nth-child por :nth-of-type */
        left: ${Math.random() * 100}%; /* Posición horizontal aleatoria */
        top: ${Math.random() * -100}%; /* Inicia fuera del contenedor */
        animation-duration: ${Math.random() * 10 + 10}s; /* Duración aleatoria entre 10 y 20s */
        animation-delay: ${Math.random() * 5}s; /* Retraso aleatorio */
        transform: translateY(0); /* Comienza en la parte superior */
      }
    `
    )
    .join('')}

  @keyframes fall {
    0% {
      transform: translateY(0); /* Comienza en su posición inicial */
    }
    100% {
      transform: translateY(100vh); /* Cae hasta el fondo del contenedor */
    }
  }
`;
const Img = styled.div`
  position: relative;
  transform: translateX(110%) translateY(-30%); /* Aumenta el valor de Y en un 30% */
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

