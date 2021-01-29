import { React } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import ReactLink from "react-router-dom/Link";
import useSocket from '../context/useSocket';

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'black',
        textDecoration: 'none',
    }
}));

const ChatsList = function () {
    const classes = useStyles();
    const socket = useSocket();

    const createUser = () => {
        let userName = prompt('Введите свое имя');
        socket.emit('user:join', { chatId: 1, name: userName });
    }

    return (
        <List>
            <Link className={classes.link} to="/1" component={ReactLink} onClick={createUser}>
                <ListItem button>
                    <ListItemText primary="JS chat" secondary="JavaScript, Reat.js, Node.js ect." />
                </ListItem>
            </Link>
        </List>
    )
};

export default ChatsList