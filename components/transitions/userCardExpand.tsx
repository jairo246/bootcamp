import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import format from 'date-fns/format';
import {User} from '../users/interfaceUsers';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 const UserCardExpand = ({
    id,
    name,
    username,
    birthday,
    email,
    phone,
    roles,
    img}:User) => {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    /**  <img src={foodList[0].img} width="100" height="100"></img>
      <Image src={foodList[0].img} width="100" height="100"></Image>*/

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={img}>
            A
          </Avatar>
        }
        title={name}
        subheader={username}
        action={
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Stack spacing={2}>
            <Item>
                <Typography>Nacimiento</Typography>
                <Typography>{format(birthday,'MM/dd/yyyy')}</Typography>
            </Item>
            <Item>
                <Typography>Rol</Typography>
                <Typography>{roles}</Typography>
            </Item>
            <Item>
                <Typography>Cecular</Typography>
                <Typography>{phone}</Typography>
            </Item>
            <Item>
                <Typography>Email</Typography>
                <Typography>{email}</Typography>
            </Item>
        </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default UserCardExpand;