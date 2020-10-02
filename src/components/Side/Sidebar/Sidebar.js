import React, {useState,useEffect} from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core';
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from '../SidebarChat/SidebarChat';
import db from '../../../firebase'
import { useStateValue } from '../../../redux/StateProvider';

function Sidebar() {
    const [groups,setGroups] = useState([]);
    const [{user}] = useStateValue([]);

    useEffect(()=>{
        const unsubscribe = db.collection('groups').onSnapshot((snapshot)=>(
            setGroups(snapshot.docs.map((doc)=>(
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
        return ()=>{
            unsubscribe();
        };

    },[])
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeIcon/>
                    </IconButton>

                    <IconButton>
                    <ChatIcon/>
                    </IconButton>

                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar__chats">
                    <SidebarChat addNewChat/>
                    {groups.map((group)=>(
                        <SidebarChat key={group.id} id={group.id} name={group.data.name}/>
                    ))}
            </div>
        </div>
    )
}

export default Sidebar
