import React, {useEffect, useState} from 'react';
import "./SidebarChat.css";
import { Avatar } from '@material-ui/core';
import db from '../../../firebase';
import {Link} from 'react-router-dom'

function SidebarChat({id, name, addNewChat}) {
    //For Avatar
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('')

    useEffect(() => {
        if(id){
            db.collection('groups').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((onSnapshot)=>(
                setMessages(onSnapshot.docs.map((doc)=> doc.data())))
            )
        }
    }, [id]);
        
    useEffect(()=> {
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    //Create Chat
    const createChat = ()=>{
        const groupName = prompt ("Please enter name for chat")

        if (groupName){
            //do some clever database stuff
            db.collection('groups').add({
                name: groupName,
            })
        }
    };

    //If its not addNew chat, Render out the nextone below
    return !addNewChat ?(
        <Link to={`/groups/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ):(
        <div onClick={createChat} className='sidebarChat'> 
            <h2>Add new Chat</h2>
        </div>
    );

}

export default SidebarChat;
