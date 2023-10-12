import React from 'react';
import InvitationItem from '../components/InvitationItem.js';
import '../pages/Invitations.css'; 
import SideNav from '../SideNav.js';


export default function Invitations() {
const invitations = [ 
    {id: 1, sentfrom: 'John Ng', sentto:'Thomas Smith', invite_accepted:true, chat_started:false},
    {id: 2, sentfrom: 'John Ng', sentto:'Goh Li Yin', invite_accepted:true, chat_started:false},
    {id: 3, sentfrom: 'John Ng', sentto:'Teo Jia Min', invite_accepted:false, chat_started:false},
    {id: 4, sentfrom: 'Mary Lim', sentto:'John Ng', invite_accepted:false, chat_started:false},
    {id: 5, sentfrom: 'Tommy Koh', sentto:'John Ng', invite_accepted:false, chat_started:false},
    {id: 6, sentfrom: 'Jimmy Tan', sentto:'John Ng', invite_accepted:false, chat_started:false},
];

const users = [ 
    {id: 1, name: 'Thomas Smith', location:'Hougang',picture:'/images/avatar.png'},
    {id: 2, name: 'Goh Li Yin', location:'Hougang',picture:'/images/avatar.png'},
    {id: 3, name: 'Teo Jia Min', location:'Hougang',picture:'/images/avatar.png'},
    {id: 4, name: 'Mary Lim', location:'Hougang',picture:'/images/avatar.png'},
    {id: 5, name: 'Tommy Koh', location:'Hougang',picture:'/images/avatar.png'},
    {id: 6, name: 'Jimmy Tan', location:'Hougang',picture:'/images/avatar.png'},
];

const sentInvitations = invitations.filter(invitation => invitation.sentfrom === 'John Ng');
const receivedInvitations = invitations.filter(invitation => invitation.sentto === 'John Ng');

      return (

        <div className="invitations-wrapper">
        <SideNav/>

        <h1>Invitations Sent</h1>
          <div>
            <p>Invitations that has been accepted, and a chat has already started, will not appear on this page.</p>
          </div>

          <div className="invitations-grid">
            {
              sentInvitations.map(
                invitation => {
                const receiveuser = users.find(user => user.name === invitation.sentto);
                return (
                    <InvitationItem invitation={invitation} user={receiveuser} type="sentinvitations"/>
                );
              })
            }
          </div>



          <h1>Invitations Received</h1>
          <div>
            <p>Only invitations that have not been accepted will be shown here. Only the sender can initiate a chat with you.</p>
          </div>

          <div className="invitations-grid">
            {
              receivedInvitations.map(
                invitation => {
                const sentfrom = users.find(user => user.name === invitation.sentfrom);    
                return (
                    <InvitationItem invitation={invitation} user={sentfrom} type="receivedinvitations"/>
                 );
              })
            }
          </div>

        </div>
      );
        
  }