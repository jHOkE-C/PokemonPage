import styled from '@emotion/styled';
import { Typography } from '@mui/material';
interface CardGeneralProps{
    url:string,
    id:number
}
const CardGeneral: React.FC<CardGeneralProps> = ({url, id}) => {
  return (
    <ContainerCard>
        <Typography>N°{id}</Typography>
      <img src={url} alt={url} className='a'/>
    </ContainerCard>
  );
};

export default CardGeneral;
const ContainerCard = styled.div`
    padding: 1rem;
    :hover{
        background-color: grey;
    }
`