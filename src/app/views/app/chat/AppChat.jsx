import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  getAllContact,
  getRecentContact,
  sendNewMessage,
  getContactById,
  getChatRoomByContactId
} from "./chatService";
import ChatSidenav from "./ChatSidenav";
import ChatContainer from "./ChatContainer";
import { isMobile } from "@utils";
import localStorageService from "../../../services/localStorageService";
import history from "@history.js";

let ws = null;
let showConnectedMessage = false;

const WS_USER_INFO = 2;
const ROLE_CONSULTANT = "consultant";
const URL_SERVER_CHAT = 'ws://localhost:6969';
class AppChat extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    currentUser: {
      id: "7863a6802ez0e277a0f98534"
    },
    contactList: [],
    recentContactList: [],
    messageList: [],
    currentChatRoom: "",
    opponentUser: null,
    open: true,
    isMobile: false
  };

  bottomRef = React.createRef();
  windowResizeListener;

  componentDidMount() {
    this.loadUserData();
    this.connectToChat();

    let { id } = this.state.currentUser;
    getContactById(id).then(data => {
      this.setState({
        currentUser: {
          ...data.data
        }
      });
    });
    getAllContact(this.state.currentUser.id).then(data =>
      this.setState({ contactList: [...data.data] })
    );
    this.updateRecentContactList();

    if (isMobile())
      this.setState({
        open: false,
        isMobile: true
      });
    if (window)
      this.windowResizeListener = window.addEventListener("resize", e => {
        if (isMobile())
          this.setState({
            open: false,
            isMobile: true
          });
        else
          this.setState({
            open: true,
            isMobile: false
          });
      });
  }

  componentWillUnmount() {
    if (window) window.removeEventListener("resize", this.windowResizeListener);
  }

  updateRecentContactList = () => {
    let { id } = this.state.currentUser;
    getRecentContact(id).then(data => {
      this.setState({
        recentContactList: [...data.data]
      });
    });
  };

  scrollToBottom = () => {
    this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  handleContactClick = contactId => {
    if (isMobile()) this.toggleSidenav();

    getContactById(contactId).then(({ data }) => {
      this.setState({
        opponentUser: { ...data }
      });
    });

    getChatRoomByContactId(this.state.currentUser.id, contactId).then(
      ({ data }) => {
        let { chatId, messageList, recentListUpdated } = data;
        console.log(chatId);

        this.setState(
          {
            currentChatRoom: chatId,
            messageList
          },
          () => {
            this.bottomRef.scrollTop = 9999999999999;
          }
        );
        if (recentListUpdated) {
          this.updateRecentContactList();
        }
      }
    );
  };

  loadUserData = () => {
    const loggedUser = localStorageService.getItem("auth_user");
    if (loggedUser) {
      this.setState({
        loggedUser
      });
    }
  };

  connectToChat = () => {
    this.disconnectToChat();

    ws = new WebSocket(URL_SERVER_CHAT);
    ws.onopen = (evt) => { this.onChatOpen(evt); };
    ws.onclose = (evt) => { this.onChatClose(evt); };
    ws.onmessage = (evt) => { this.onChatMessage(evt); };
    ws.onerror = (evt) => { this.onChatError(evt); };
  }

  disconnectToChat = () => {
      if (ws && ws.close && ws.readyState == 1) {
          ws.close();
          showConnectedMessage = true;
      }    
  }

  onChatOpen = (evt) => {
    console.log('Connection opened!');
    if (ws && ws.readyState == 1) {
        console.log("ws: ", ws);
        NotificationManager.success("Bienvenido al chat", "Bienvenido", 2000);
    }
  }

  onChatClose = (evt) => {
    // Clean
    console.log('Connection closed!');
    ws = null;
    NotificationManager.error("Has sido desconectado del chat", "Error", 2000);
    setTimeout(() => {
      if (this.state.loggedUser.role === ROLE_CONSULTANT) {
        history.push({
          pathname: "/consultant/home"
        });
      } else {
        history.push({
          pathname: "/client/home",
        });
      }
    }, 2000);

  }

  onChatMessage = (objMessage) => {
      objMessage = JSON.parse(objMessage.data);
      console.log(objMessage);
      const messageType = objMessage.type;
      const message = objMessage.message;

      switch (messageType) {
        case "id":
            this.setSocketClientId(message);
            break;

        case "chatMessage":
            this.showOtherMessage(objMessage);
            break;

        case "clients":
            this.showClientsList(objMessage.message);
            break;
      }
  }

  onChatError = (evt) => {

  }

  setSocketClientId = (message) => {
    console.log("1 function setClientId: ", message);
    this.setState({
      loggedUser: {
        ...this.state.loggedUser,
        socketId: message.socketId
      }
    });

    this.sendUserInfo();
  }

  sendUserInfo = () => {
    console.log("2 function sendUserInfo: ");
    if (!ws) {
        console.error("No WebSocket connection :(");
        return;
    }
    ws.send(JSON.stringify({
      idMessage: WS_USER_INFO,
      message: this.state.loggedUser
    }));
  }

  showOtherMessage = (objMessage) => {
    console.log("function showOtherMessage");
    console.log(objMessage);
    const message = objMessage.message;
    const name = objMessage.name;
    const date = this.getDate();
    
    
}

  showClientsList = (objClients) => {
    console.log("function showClientsList");
    let clientsList = objClients.clients;
    let advice = objClients.advice;
    console.log(clientsList);

    /*$("#divClientsList").empty();
    if (clientsList != null && clientsList.length > 0) {
        clientsList.forEach(client => {
            let id = client.id;
            let name = client.name;
            
            let isMe = id === userId;

            if (!isMe) {
                let username = name;
                if (!name) {
                    username = "New User";
                }
    
                const clientItemContainer = `<div id="user-${id}" class="chat_list active_chat">
                    <div class="chat_people">
                            <div class="chat_img"> <img src="./img/user-profile.png" alt="sunil"> </div>
                            <div class="chat_ib">
                                <h5>${username} <span style="display:none;" class="chat_date">Dec 25</span></h5>
                                <p style="display:none;">Test, which is a new approach to have all solutions
                                    astrology under one roof.</p>
                            </div>
                        </div>
                    </div>`;

                $("#divClientsList").append(clientItemContainer);
            }
        });
    }*/
  }

  getDate = () => {
    const today = new Date();
    return today.toLocaleString();
  }


  handleMessageSend = message => {
    let { id } = this.state.currentUser;
    let { currentChatRoom, opponentUser } = this.state;
    if (currentChatRoom === "") return;
    sendNewMessage({
      chatId: currentChatRoom,
      text: message,
      contactId: id,
      time: new Date()
    }).then(data => {
      this.setState(
        {
          messageList: [...data.data]
        },
        () => {
          this.bottomRef.scrollTop = 9999999999999;
        }
      );

      // bot message
      setTimeout(() => {
        sendNewMessage({
          chatId: currentChatRoom,
          text: `Hi, I'm ${opponentUser.name}. Your imaginary friend.`,
          contactId: opponentUser.id,
          time: new Date()
        }).then(data => {
          this.setState(
            {
              messageList: [...data.data]
            },
            () => {
              this.bottomRef.scrollTop = 9999999999999;
            }
          );
        });
      }, 750);
      // bot message ends here
    });
  };

  setBottomRef = ref => {
    this.bottomRef = ref;
  };

  toggleSidenav = () => this.setState({ open: !this.state.open });

  render() {
    let {
      open,
      isMobile,
      currentUser,
      contactList,
      recentContactList,
      messageList,
      opponentUser,
      currentChatRoom
    } = this.state;
    return (
      <Card className="chat-sidebar-container sidebar-container">
        <ChatSidenav
          open={open}
          isMobile={isMobile}
          toggleSidenav={this.toggleSidenav}
          contactList={contactList}
          recentContactList={recentContactList}
          handleContactClick={this.handleContactClick}
        ></ChatSidenav>
        <ChatContainer
          open={open}
          isMobile={isMobile}
          toggleSidenav={this.toggleSidenav}
          messageList={messageList}
          currentUser={currentUser}
          opponentUser={opponentUser}
          currentChatRoom={currentChatRoom}
          setBottomRef={this.setBottomRef}
          handleMessageSend={this.handleMessageSend}
        ></ChatContainer>
        <NotificationContainer />
      </Card>
    );
  }
}

export default AppChat;
