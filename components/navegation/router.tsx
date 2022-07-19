import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link'
import { Page } from './interfaceRouter';

const Router = () => {

    const linkRouter:Array<Page> = [{
            name:'Menu',
            link: '/menu',
            icon: <HomeIcon />
        },{
            name:'Ordenes',
            link: '/orders',
            icon: <TableRowsIcon />
        },{
            name:'Usuarios',
            link: '/users',
            icon: <PersonIcon />
        },{  
            name:'Login',
            link: '/login',
            icon: <LoginIcon />
        }];

    return(
        <div>
      <Toolbar />
      <Divider />
      <List>
        {linkRouter.map((page:Page) => (
            <Link key={page.name} href={page.link}>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        {page.icon}
                    </ListItemIcon>
                    <ListItemText primary={page.name} />       
                    </ListItemButton>
                </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
      <List>
      </List>
    </div>

    );
}
export default Router;