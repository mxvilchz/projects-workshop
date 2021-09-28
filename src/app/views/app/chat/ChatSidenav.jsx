import React, { useState } from "react";
// import ChatAvatar from "./ChatAvatar";
import Scrollbar from "react-perfect-scrollbar";
// import { Divider } from "@material-ui/core";
import { format } from "date-fns";

const ChatSidenav = ({
  open,
  currentUser,
  user,
  consultores = [],
  contactList = [],
  recentContactList = [],
  handleContactClick,
  handleContactClick2,
  toggleSidenav,
  usersList = []
}) => {
  const [query, setQuery] = useState("");


 
  return (
    <div
      className="chat-sidebar-wrap sidebar"
      style={{ left: !open ? "-260px" : 0 }}
    >
      <div className="border-right">
        <div className="pt-2 pb-2 pl-3 pr-3 d-flex align-items-center o-hidden box-shadow-1 chat-topbar">
          <span className="link-icon d-md-none" onClick={toggleSidenav}>
            <i className="icon-regular ml-0 mr-3 i-Left"></i>
          </span>
          <div className="form-group m-0 flex-grow-1">
            <input
              type="text"
              className="form-control form-control-rounded"
              id="search"
              placeholder="Search contacts"
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
            />
          </div>
        </div>

        <Scrollbar className="contacts-scrollable">
          {/*  <div className="mt-4 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom">
            Recent
          </div>

          {recentContactList
            .filter(user =>
              user.name.toLocaleLowerCase().match(query.toLocaleLowerCase())
            )
            .map(user => (
              <div
                key={user.id}
                onClick={() => handleContactClick(user.id)}
                className={`p-3 d-flex align-items-center border-bottom contact ${user.status}`}
              >
                <img
                  src={user.avatar}
                  className="avatar-sm rounded-circle mr-3"
                  alt=""
                />
                <div>
                  <h6 className="m-0">{user.name}</h6>
                  <span className="text-muted text-small">
                    {format(
                      new Date(user.lastChatTime).getTime(),
                      "dd MMM, yyyy"
                    )}
                  </span>
                </div>
              </div>
            ))} */}

          {user.role === "client" ?
            (<div className="mt-3 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom">
              Consultores en línea
            </div>) : null
          }


  {/* 
  const especialidades =  specialties.flatMap(s=>s.title);
  console.log("<----------ESPECIALIDADES---------->");
  console.log(especialidades);
  console.log("<----------CONSULTORES---------->");
  console.log(usersList.filter(usuario => usuario.role === 'consultant'));

  const consultores = usersList.filter(usuario => usuario.role === 'consultant').filter(consultor => especialidades.includes(consultor.category));
  
  console.log("<----------RESULTADO FINAL---------->");
  console.log(consultores); */}

          {user.role === "client" ? (consultores
            .map(user => (
              <div
                key={user.id}
                onClick={() => handleContactClick2(user.id)}
                className="p-3 d-flex border-bottom align-items-center contact online"
                userid={user.userId}
              >
                <img
                  src={"/assets/images/faces/1.jpg"}
                  className="avatar-sm rounded-circle mr-3"
                  alt=""
                />
                <h6 className="">{user.email}</h6>
              </div>
            ))
          ) : null
          }

           <div className="mt-3 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom">
            Clientes en línea
          </div> 
            {/* {user.role === "consultant"?(<div className="mt-3 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom">
            Clientes en línea
          </div>): null} */}


          {usersList
            .filter(user =>
              user.role === "client")
            .map(user => (
              <div
                key={user.id}
                onClick={() => handleContactClick2(user.id)}
                className="p-3 d-flex border-bottom align-items-center contact online"
                userid={user.userId}
              >
                <img
                  src={"/assets/images/faces/1.jpg"}
                  className="avatar-sm rounded-circle mr-3"
                  alt=""
                />
                <h6 className="">{user.email}</h6>
              </div>
            ))
          }

          {/*  {user.role === "consultant"? (usersList
            .filter(user => 
            user.role === "client")
            .map(user => (
              <div
                key={user.id}
                onClick={() => handleContactClick2(user.id)}
                className="p-3 d-flex border-bottom align-items-center contact online"
                userid={user.userId}
              >
                <img
                  src={"/assets/images/faces/1.jpg"}
                  className="avatar-sm rounded-circle mr-3"
                  alt=""
                />
                <h6 className="">{user.email}</h6>
              </div>
          ))): null
        } */}

          {/*  <div className="mt-3 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom">
            Contacts
          </div>
          {contactList
            .filter(user =>
              user.name.toLocaleLowerCase().match(query.toLocaleLowerCase())
            )
            .map(user => (
              <div
                key={user.id}
                onClick={() => handleContactClick(user.id)}
                className="p-3 d-flex border-bottom align-items-center contact online"
              >
                <img
                  src={user.avatar}
                  className="avatar-sm rounded-circle mr-3"
                  alt=""
                />
                <h6 className="">{user.name}</h6>
              </div>
            ))} */}

        </Scrollbar>
      </div>
    </div>
  );
};

export default ChatSidenav;
