import React, { useState, useEffect } from 'react';
import './Chat.css';
import {Avatar, IconButton} from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../redux/StateProvider';


function Chat() {
    //For sending Messages 
    const [input, setInput] = useState('')

    //For Avatar
    const [seed, setSeed] = useState('');
    const {groupId} = useParams();
    const [groupName, setGroupName] = useState('');
    const [messages, setMessages] =  useState([]);
    const [{user}] =  useStateValue();
    
    useEffect(() => {
        if (groupId){
            db.collection('groups')
              .doc(groupId)
              .onSnapshot((snapshot)=>(setGroupName(snapshot.data().name)))

              db.collection('groups')
                .doc(groupId)
                .collection('messages')
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot)=>(
                    setMessages(snapshot.docs.map(
                        doc => doc.data()
                    ))
                ))
        }
    }, [groupId])

    //The seed (avatar) should change whenever the groupId Changes
    useEffect(()=> {
        setSeed(Math.floor(Math.random()*5000));
    },[groupId]);

    
    const sendMessage = async(e)=>{
        e.preventDefault();

        db.collection('groups').doc(groupId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    };

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{groupName}</h3>
                    <p>Last seen at {' '} 
                    {new Date(
                        messages[messages.length-1]?.timestamp?.toDate()
                    ).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>    

                    <IconButton>
                        <AttachFile/>
                    </IconButton>  

                    <IconButton>
                        <MoreVert/>
                    </IconButton>  
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) =>(
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span> 
                        {message.message}
                    <span className="chat__timestamp">
                         {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span> 
                    </p>
                ))}
                
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>  
                <form >
                    <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>  
            </div>
        </div>
    )
}

export default Chat;
