import { styled, alpha } from '@mui/material/styles';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconPrincipal from './iconPrincipal'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';

const pages = ['Inicio', 'Atrapalos a Todos', 'POKEDEX'];
const pagesRutas = ['/','/AtrapalosATodos','']
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleNavigate = (event: React.MouseEvent<HTMLElement>, index:number)=>{
    handleCloseNavMenu();
    event.preventDefault
    const ruta = pagesRutas[index]
    navigate(ruta);
  }

  return (
    <AppBar position="fixed" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            onClick={(e)=>{navigate('/')}}
            variant="h6"
            noWrap
            component="a"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              ":hover":{
                cursor:'pointer'
              }
            }}
          >
            P
          </Typography>
            <IconButton  
              onClick={(e)=>{navigate('/')}}
              sx={{ display: { xs: 'none', md: 'block', margin:'0', padding:'0  '}}}
            >
                <IconPrincipal />
            </IconButton>
          <Typography
            onClick={(e)=>{navigate('/')}}
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
            
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: '0rem',
              ":hover":{
                cursor:'pointer'
              }
            }}
          >
            KEpage
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page,index) => (
                <MenuItem key={page} onClick={(e)=>handleNavigate(e,index)} >
                  <Typography sx={{ textAlign: 'center', color:'black' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            onClick={(e)=>{navigate('/')}}
            variant="h5"
            noWrap
            component="a"
            sx={{
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              ":hover":{
                cursor:'pointer'
              }
            }}
          >
            P
          </Typography>
            <IconButton  
              onClick={(e)=>{navigate('/')}}
              sx={{ display: { xs: 'block', md: 'none', margin:'0', padding:'0' } }}
            >
                <IconPrincipal />
            </IconButton>
          <Typography
            onClick={(e)=>{navigate('/')}}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              ":hover":{
                cursor:'pointer'
              }
            }}
          >
            KEpage
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (
              <Button
                key={page}
                onClick={(e)=>handleNavigate(e,index)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Buscar en la Pokedex"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

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
      width: 'auto', // Ajustar el tamaño para pantallas pequeñas (si es necesario)
      marginLeft: theme.spacing(1), // Dejar un pequeño margen si es necesario
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
        width: '12ch', // En pantallas grandes, el input tiene 12 caracteres de ancho
        '&:focus': {
          width: '20ch', // Expande a 20 caracteres cuando el campo está en foco
        },
      },
      [theme.breakpoints.down('sm')]: {
        width: '8ch', // Reduzca el ancho en dispositivos pequeños (ajusta según lo que necesites)
      },
    },
  }));
    