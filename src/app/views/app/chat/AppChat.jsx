import React, { Component } from "react";
import { Card } from "react-bootstrap";
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
import { times } from "lodash";

let ws = null;
let showConnectedMessage = false;

const WS_USER_MESSAGE = 1;
const WS_USER_INFO = 2;
const ROLE_CONSULTANT = "consultant";
const URL_SERVER_CHAT = 'ws://localhost:6969';
const AVATARS = [
  "assets/images/faces/13.jpg",
  "assets/images/faces/12.jpg",
  "assets/images/faces/1.jpg",
  "assets/images/faces/3.jpg",
  "assets/images/faces/16.jpg",
  "assets/images/faces/10.jpg",
  "assets/images/faces/9.jpg",
  "assets/images/faces/5.jpg",
  "assets/images/faces/15.jpg",
  "assets/images/faces/4.jpg",
  "assets/images/faces/2.jpg"
];

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
    this.disconnectToChat();
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

  handleContactClick2 = contactId => {
    if (isMobile()) this.toggleSidenav();

    console.log("contactId: ", contactId);

    const opponentUser = this.state.usersList.find(user => user.id === contactId);
    
    this.setState({
      opponentUser: { 
        avatar: opponentUser.avatar,
        id: opponentUser.id,
        name: opponentUser.email,
        status: "online",
        userId: opponentUser.userId,
        role: opponentUser.role,
        category: opponentUser.category
      },
      otherUser: { ...opponentUser}
    });

    const opponentUserId = opponentUser.userId;
    const currentUserId = this.state.loggedUser.userId;
    const chatId = currentUserId + "_" + opponentUserId;
    console.log("chatId: ", chatId);

    let chatRoom;
    let chatRooms = this.state.chatRooms;
    if (chatRooms) {
      chatRoom = chatRooms.find(chatRoom => chatRoom.currentChatRoom === chatId);
    } else {
      chatRooms = [];
    }

    let messageList = [];
    if (chatRoom) {
      messageList = chatRoom.messageList;
    } else {
      chatRoom = {
        currentChatRoom: chatId,
        messageList: []
      };

      chatRooms.push(chatRoom);
    }
    
    this.setState(
      {
        currentChatRoom: chatId,
        messageList: messageList,
        chatRooms: chatRooms
      },
      () => {
        this.bottomRef.scrollTop = 9999999999999;
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
        // NotificationManager.success("Bienvenido al chat", "Bienvenido", 2000);
    }
  }

  onChatClose = (evt) => {
    console.log('Connection closed!');
    ws = null;
    // NotificationManager.error("Has sido desconectado del chat", "Error", 2000);
    setTimeout(() => {
      if (this.state.loggedUser.role === ROLE_CONSULTANT) {
        history.push({
          pathname: "/consultant/home"
        });
      } else {
        history.push({
          pathname: "/user/home",
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
            this.setSocketUserId(message);
            break;

        case "chatMessage":
            this.showChatMessage(message);
            break;

        case "users":
            this.receiveUsersInfo(message);
            break;
      }
  }

  onChatError = (evt) => {

  }

  setSocketUserId = (message) => {
    console.log("function setSocketUserId: ", message);
    this.setState({
      loggedUser: {
        ...this.state.loggedUser,
        socketId: message.socketId,
        avatar: AVATARS[Math.floor(Math.random() * (10 - 0 + 1) + 0)],
      }
    });

    this.sendUserInfo();
  }

  sendUserInfo = () => {
    console.log("function sendUserInfo: ");
    if (!ws) {
        console.error("No WebSocket connection :(");
        return;
    }
    ws.send(JSON.stringify({
      idMessage: WS_USER_INFO,
      message: this.state.loggedUser
    }));
  }

  showChatMessage = (objMessage) => {
    console.log("function showChatMessage");
    console.log(objMessage);

    const { transmitter, receiver } = objMessage;

    console.log("this.state.loggedUser.socketId: ", this.state.loggedUser.socketId);
    console.log("transmitter: ", transmitter);
    console.log("receiver: ", receiver);

    const myId = this.state.loggedUser.socketId;
    const opponent = transmitter;
    const { avatar:opAvatar, id: opId, name: opName, status: opStatus, userId: opUserId } = opponent;
    const message = opponent.message;

    let currentUserId
    let opponentUserId
    let chatId;
    if (myId == transmitter.id) {
      console.log("Im transmitter");
      currentUserId = this.state.loggedUser.userId;
      opponentUserId = receiver.userId;
      chatId = currentUserId + "_" + opponentUserId;

    } else if (myId == receiver.id) {
      console.log("Im receiver");
      currentUserId = this.state.loggedUser.userId;
      opponentUserId = opponent.userId;
      chatId = currentUserId + "_" + opponentUserId;
    }
    console.log("chatId: ", chatId);

    const messageItem = {
      avatar: opAvatar,
      contactId: opId,
      id: opId,
      mood: "",
      name: opName,
      status: "online",
      opUserId: opUserId,
      text: message,
      time: new Date()
    };

    let chatRooms = this.state.chatRooms;
    let chatRoom;

    let index = -1;
    if (chatRooms) {
      index = chatRooms.findIndex(chatRoom => chatRoom.currentChatRoom === chatId);
    } else {
      chatRooms = [];
    }

    let messageList = [];
    if (index >= 0) {
      messageList = chatRooms[index].messageList;
      chatRooms[index].messageList.push(messageItem);

    } else {
      messageList.push(messageItem);

      chatRoom = {
        currentChatRoom: chatId,
        messageList: messageList
      };

      chatRooms.push(chatRoom);
    }

    if (this.state.currentChatRoom == chatId) {
      this.setState(
        {            
          currentChatRoom: this.state.currentChatRoom,
          messageList: messageList,
          chatRooms: chatRooms
        },
        () => {
          this.bottomRef.scrollTop = 9999999999999;
        }
      );
    } else {
      this.setState(
        {
          //currentChatRoom: chatId,
          currentChatRoom: this.state.currentChatRoom,
          // messageList: messageList,
          chatRooms: chatRooms
        },
      );
    }
}

  receiveUsersInfo = (message) => {
    console.log("function receiveUsersInfo: ", message);
    console.log(message);
    let usersList = this.state.usersList;

    if (usersList) {
      for (let i = 0; i < usersList.length; ++i) {
        let exists = false;
        for (let j = 0; j < message.users; ++j) {
          if (message.users[j].id === usersList[i].id) {
            exists = true;
            break;
          }
        }
  
        if (!exists && this.state.opponentUser && this.state.opponentUser.userId && this.state.opponentUser.userId === usersList[i].userId) {
          console.log("Se desconectó: ", usersList[i]);
          this.setState(
            {
              currentChatRoom: null,
              messageList: [],
              opponentUser: null
              //chatRooms: chatRooms
            },
          );
        }
      }
    }

    this.setState({
      usersList: message.users
    });
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

  handleMessageSend2 = message => {
    let { userId, socketId } = this.state.loggedUser;
    let { currentChatRoom, opponentUser } = this.state;

    if (currentChatRoom === "") return;
    if (!ws) {
        console.log("No WebSocket connection :(");
        return;
    }

    ws.send(JSON.stringify({
      idMessage: WS_USER_MESSAGE,
      transmitter: {
        id: socketId,
        userId: this.state.loggedUser.userId,
        avatar: this.state.loggedUser.avatar,
        name: this.state.loggedUser.email,
        status: "online",
        message: message, 
      },
      receiver: opponentUser
    }));
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
      currentChatRoom,
      usersList
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
          handleContactClick2={this.handleContactClick2}
          usersList={usersList}
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
          handleMessageSend2={this.handleMessageSend2}
        ></ChatContainer>
        <NotificationContainer />
      </Card>
    );
  }
}

export default AppChat;
