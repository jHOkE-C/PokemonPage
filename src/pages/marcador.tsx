import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import BaseUI from '../components/baseUI/baseUI';
import { useEffect, useState } from 'react';
import { PokemonForm } from '../types/interface';
import CardGeneral from '../components/cardsPokemonType/cardGeneral';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

const numPokes = 151;
const batchSize = 20;

const Marcador: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonForm[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<PokemonForm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [marcados, setMarcados] = useState<boolean[]>([]);
    const [countM, setCountM] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    useEffect(() => {
        const savedMarcados = localStorage.getItem('marcados');
        if (savedMarcados) {
            const marcadosSa: boolean[] = JSON.parse(savedMarcados);
            setMarcados(marcadosSa);
            const countMarcadosNew: number[] = marcadosSa.map((marcado: boolean) => (marcado ? 1 : 0));
            const suma = countMarcadosNew.reduce((acumulador, numero) => acumulador + numero, 0);
            setCountM(suma);
        } else {
            setMarcados(new Array(numPokes).fill(false));
        }
    }, []);

    useEffect(() => {
        const loadPokemons = async () => {
            
            try {
                const newPokemons: PokemonForm[] = [];
                setLoading(true);
                for (let i = 1; i <= numPokes; i += batchSize) {
                    const batch = [];
                    for (let j = i; j < i + batchSize && j <= numPokes; j++) {
                        batch.push(
                            fetch(`https://pokeapi.co/api/v2/pokemon-form/${j}/`)
                                .then((response) => response.json())
                                .catch((error) => {
                                    console.error("Error en la solicitud:", error);
                                    setError(true);
                                })
                        );
                    }
                    const results = await Promise.all(batch);
                    newPokemons.push(...results);
                }
                setLoading(false);    
                setPokemons(newPokemons);
                setFilteredPokemons(newPokemons);
            } catch (error) {
                console.error("Error en la carga de Pokémon", error);
                setError(true);
            }
            
        };

        loadPokemons();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearch(query);
        const filtered = pokemons.filter((pokemon) => {
            return (
                pokemon.name.toLowerCase().includes(query) || 
                pokemon.id.toString().includes(query)
            );
        });
        setFilteredPokemons(filtered);
    };

    const marcar = (event: React.MouseEvent<HTMLElement>, index: number) => {
        event.preventDefault();
        const newM = marcados.map((marcado, i) => {
            if (i === index) {
                return !marcado;
            }
            return marcado;
        });
        setMarcados(newM);
        const countMarcadosNew: number[] = newM.map((marcado) => (marcado ? 1 : 0));
        const suma = countMarcadosNew.reduce((acumulador, numero) => acumulador + numero, 0);
        setCountM(suma);
        localStorage.setItem('marcados', JSON.stringify(newM));
    };

    return (
        <BaseUI>
            <Container>
                {loading ? (
                    <Box className="centerText">
                        <div className="centerText-loading">
                            <div className="loading">
                                <CircularProgress size="5rem" />
                            </div>
                            <Typography variant="h6">Esto puede tardar un min</Typography>
                        </div>
                    </Box>
                ) : error ? (
                    <div className="centerText">
                        <Typography variant="h4" sx={{ textAlign: 'center', color: 'red' }}>
                            HUBO UN ERROR A LA HORA DE PEDIR DATOS
                        </Typography>
                    </div>
                ) : (
                    <>
                        <div className="titulo">
                            <Typography variant="h4" sx={{ textAlign: 'center' }}>
                                Lista de Pokémon's Kanto
                            </Typography>
                            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                                Marca a tus compañeros, a todos los que tengas ya.
                            </Typography>
                            <div className="titulo_counts">
                                <div>
                                    <Typography variant="subtitle1" style={{ color: 'black', fontWeight: 'bold' }}>
                                        Tienes: {countM}
                                    </Typography>
                                    <Typography variant="subtitle1" style={{ color: 'red', fontWeight: 'bold' }}>
                                        Faltan: {151 - countM}
                                    </Typography>
                                </div>
                            </div>
                            <Box sx={{ flexGrow: 0 }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        value={search}
                                        onChange={handleSearch}
                                        placeholder="Buscar por Numero O Nombre del Pokémon "
                                        inputProps={{ 'aria-label': 'Buscar NUMERO O NOMBRE DEL Pokémon' }}
                                    />
                                </Search>
                            </Box>
                        </div>
                        {filteredPokemons.map((pokemon, index) => (
                            <div
                                key={index}
                                className={`card${marcados[index] ? '-mar' : ''}`}
                                onClick={(e) => marcar(e, index)}
                            >
                                <CardGeneral
                                    id={pokemon.id}
                                    url={pokemon.sprites.front_default}
                                    type={`${pokemon.types[0].type.name}`}
                                    name={pokemon.name}
                                    marcado={marcados[index]}
                                ></CardGeneral>
                            </div>
                        ))}
                    </>
                )}
            </Container>
        </BaseUI>
    );
};

export default Marcador;
const Container = styled(Box)`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .titulo {
        width: 100%;
    }

    .card {
        margin: 1rem;
        flex-grow: 1;
        margin-left: 3rem;
    }

    .card-mar {
        margin: 1rem;
        flex-grow: 1;
        margin-left: 3rem;
    }

    .centerText {
        display: flex;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
        width: 100%;
        height: 80vh;
    }

    .centerText-loading {
        display: block;
    }

    .loading {
        display: flex;
        justify-content: center;
    }

    .titulo_counts {
        background-color: white;
        display: flex;
        justify-content: center;
        top: 100px;
        border-radius: 0.3rem;
    }
`;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 'white',
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.30),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
        marginLeft: theme.spacing(1),
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '32ch',
            '&:focus': {
                width: '30ch',
            },
        },
        [theme.breakpoints.down('sm')]: {
            width: '8ch',
        },
    },
}));
