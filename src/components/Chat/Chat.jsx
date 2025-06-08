import './Chat.css';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isChatActived, setChatActived] = useState(false);
    const ws = useRef(null);
    const divMessagesRef = useRef(null);
    const { userName } = useAuth();

    const safeUserName = userName.toLowerCase().replace(/\s+/g, '_');

    useEffect(() => {
        const protocolo = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const hostname = window.location.hostname === 'localhost'
            ? 'localhost:3000'
            : 'tfm-back-lzqq.onrender.com';

        ws.current = new WebSocket(`${protocolo}://${hostname}`);

        ws.current.onopen = () => console.log('WebSocket conectado');
        ws.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setMessages(prev => [...prev, messageData]);
        };
        ws.current.onerror = (err) => console.error('WebSocket error:', err);
        ws.current.onclose = () => console.log('WebSocket cerrado');

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        if (divMessagesRef.current) {
            divMessagesRef.current.scrollTop = divMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        const trimmedMessage = message.trim();
        if (trimmedMessage) {
            const messageData = {
                username: safeUserName,
                message: trimmedMessage
            };
            setMessages(prev => [...prev, messageData]);
            ws.current.send(JSON.stringify(messageData));
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <button className='activeChat' onClick={() => setChatActived(true)}>
                <img src="chat.png" alt="logo-request" />
            </button>
            <div className={`divChatRequest ${isChatActived ? 'active' : ''}`}>
                <div className="headerChat">
                    <div className="modal-closeChat" onClick={() => setChatActived(false)}>X</div>
                </div>
                <div className="chatDiv" ref={divMessagesRef}>
                    {messages.map((msg, index) => {
                        const isSentByUser = msg.username === safeUserName;
                        const nombreMensaje = msg.username.split(' ')[0];
                        return (
                            <div key={index} className={`message-${isSentByUser ? 'sent' : 'received'}`}>
                                {isSentByUser ? `${nombreMensaje}: ${msg.message}` : `${msg.message} :${nombreMensaje}`}
                            </div>
                        );
                    })}
                </div>
                <div className="buttonChat">
                    <input
                        type="text"
                        name="chatMensaje"
                        id="chatMensaje"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={sendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
