import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import useSocket from '../context/useSocket';


const Chat = () => {
    const socket = useSocket();
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const classes = useStyles();
    const { chatId } = useParams();

    useEffect(() => {
        socket.on('user:joined', ({ name, id }) => {
            setUser({
                name,
                id
            })
        });

        socket.on('chat:join', (users) => {
            console.log(users)
            setUsers(users)
        });
        socket.on('chat:message', ({ message, user }) => {
            setMessages((prevData) => [...prevData, { message, user }]);
        });

    }, []);

    const typeMessage = function (event) {
        setMessage(event.target.value)
    }

    const sendMessage = function () {
        socket.emit('chat:message', { message, chatId: 1 });
        setMessage('')
    }

    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary={user.name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {users.map((user, index) => {
                            return (
                                <ListItem key={index}>
                                    <Grid container>

                                        < Grid item xs={12} >
                                            <ListItemText align="left" primary={user.name}>{user.name}</ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        {messages.map((msg, index) => {
                            return (
                                <ListItem key={index}>
                                    <Grid container>

                                        < Grid item xs={12} >
                                            <ListItemText align="right" primary={msg.message} secondary={msg.user.name}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })}


                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" onChange={typeMessage} value={message} label="Type Something" fullWidth />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={sendMessage} ><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

export default Chat;