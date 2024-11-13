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
    const [countM, setCountM] = useState<number>(0);
    // Cargar los datos del localStorage si existen
    useEffect(() => {
        const savedMarcados = localStorage.getItem('marcados');
        if (savedMarcados) {
            const marcadosSa: boolean[] = JSON.parse(savedMarcados);
            setMarcados(marcadosSa);
            const countMarcadosNew: number[] = marcadosSa.map((marcado: boolean) => marcado === true ? 1 : 0);
            const suma = countMarcadosNew.reduce((acumulador, numero) => acumulador + numero, 0);
            setCountM(suma);
        } else {
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
        //
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
    const countMarcadosNew:number[] = newM.map((marcado) => marcado===true?  1 : 0)
    const suma = countMarcadosNew.reduce((acumulador, numero) => acumulador + numero, 0);
    setCountM(suma);
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
                        <Typography variant='subtitle2' sx={{textAlign:'center'}}>Marca los que tienes.</Typography>
                        <div className='titulo_counts'>
                            <div>
                            <Typography variant='subtitle1' style={{color:'black', fontWeight:'bold'}}>Tienes: {countM}</Typography>
                            <Typography variant='subtitle1' style={{color:'red', fontWeight:'bold'}}>Faltan: {151-countM}</Typography>
                            </div>
                        </div>
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
    .titulo_counts{
        background-color: white;
        display: flex;
        justify-content: center;
        top: 100px;
        border-radius: 0.3rem;
    }
`;