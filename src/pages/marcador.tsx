import BaseUI from '../components/baseUI/baseUI';
import { useEffect, useState } from 'react';
import { PokemonForm } from '../types/interface';
import styled from '@emotion/styled';
import CardGeneral from '../components/cardsPokemonType/cardGeneral';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const numPokes = 151;
const Marcador: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonForm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [marcados, setMarcados] = useState<boolean[]>([])
    // Cargar los datos del localStorage si existen
    useEffect(() => {
        const savedMarcados = localStorage.getItem('marcados');
        if (savedMarcados) {
        setMarcados(JSON.parse(savedMarcados));
        } else {
        // Si no hay nada guardado, inicializar con todos los valores en `false`
        setMarcados(new Array(numPokes).fill(false));
        }
    }, []);
    useEffect(() => {
      const getPokemons = async () => {
        setLoading(true);
        const newPokemons: PokemonForm[] = [];
  
        for (let i = 1; i <= numPokes; i++) {
          try {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon-form/${i}/`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
  
            if (!response.ok) {
              throw new Error("Error al obtener los datos del Pokémon");
            }
  
            const data: PokemonForm = await response.json();
            if (!newPokemons.some((pokemon) => pokemon.id === data.id)) {
              newPokemons.push(data);
            }
  
            console.log("Nuevo Pokémon agregado:", data);
  
          } catch (error) {
            console.error("Error en la solicitud:", error);
            setError(true);
          }
        }
        setPokemons(newPokemons);
        setLoading(false);
      };
  
      getPokemons();
    }, []);
  
    useEffect(() => {
      console.log(pokemons);
    }, [pokemons]);
  const marcar = (event: React.MouseEvent<HTMLElement>, index:number) =>{
    event.preventDefault();
    const newM = marcados.map((marcado, i)=>{
        if(i===index){
            if(marcado){
                return false
            }else{
                return true
            }
        }else{
            if(marcado){
                return true
            }else{
                return false
            }
        }
    })
    setMarcados(newM)
    localStorage.setItem('marcados', JSON.stringify(newM));
  } 
  return (
    <BaseUI>
        <Container>
        {loading? 
            <Box className='centerText'>
                <div className='centerText-loading'>
                    <div className='loading'>
                    <CircularProgress size="5rem" />
                    </div>
                    <Typography variant='h6'>Esto puede tardar un min</Typography>
                </div>
            </Box>
            :
            (error?
                <div className='centerText'>
                    <Typography variant='h4' sx={{textAlign:'center',color:'red'}}>HUBO UN ERROR A LA HORA DE PEDIR DATOS</Typography>
                </div> 
                :
                <>
                    <div className='titulo'>
                        <Typography variant='h4' sx={{textAlign:'center'}}>LISTA DE POKEMON'S KANTO</Typography>
                    </div>
                    {pokemons.map((pokemon, index) => (
                        <div 
                            key={index } 
                            className={`card${marcados[index]?'-mar':''}`} 
                            onClick={(e)=>marcar(e, index)}
                        >
                            <CardGeneral url={pokemon.sprites.front_default} id={pokemon.id}></CardGeneral>
                        </div>
                    ))}
                </>
            )
            
        }
        </Container>    
    </BaseUI>
  );
};

export default Marcador;

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .titulo{
        width: 100%;
    }
    .card{
        border-radius: 0.5rem;
        border: grey 0.1rem solid;
        margin: 0.2rem;
        flex-grow: 1;
    }
    .card-mar{
        border-radius: 0.5rem;
        border: grey 0.1rem solid;
        background-color: #646464;
        margin: 0.2rem;
        flex-grow: 1;
    }
    .centerText{
       display: flex;
       justify-content: center;
       justify-items: center;
       align-items: center;
       align-content: center;
       width: 100%;
       height: 80vh;
    }
    .centerText-loading{
        display: block;
    }
    .loading{
        display: flex;
        justify-content: center;
    }
`;