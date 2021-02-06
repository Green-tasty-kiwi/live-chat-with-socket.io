import { React, useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import ReactLink from "react-router-dom/Link";
import useSocket from '../context/useSocket';
import requestSender from '../core/requestSender';

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'black',
        textDecoration: 'none',
    },
    grid: {
        marginTop: '10px'
    }
}));

const ChatsList = function () {
    const classes = useStyles();
    const socket = useSocket();
    const [chat, setChat] = useState();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        (async () => {
            const chats = await requestSender('/chats');
            setChats(chats)
        })()
    }, [])


    const createChat = async function () {
        let chatName = prompt('Название чата');
        const chat = await requestSender('/chats', { body: { name: chatName }, method: 'POST' });
        setChat(chat)
        setChats([...chats, chat])
    }

    return (
        <Grid className={classes.grid}>
            <Button variant="outlined" onClick={createChat}>Add chat</Button>
            <List>
                {chats.map((chat, index) => {
                    return (
                        <Link key={index} className={classes.link} to={`/${chat.id}`} component={ReactLink}>
                            <ListItem button>
                                <ListItemText primary={chat.name} />
                            </ListItem>
                        </Link>
                    )
                })}

            </List>
        </Grid>
    )
};

export default ChatsList