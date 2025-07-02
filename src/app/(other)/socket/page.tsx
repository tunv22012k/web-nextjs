'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import useSocket from "@/hooks/useSocket";
import { cookieHelper } from '@/lib/utils/cookie';
import { jwtDecode } from "jwt-decode";

type Message = { message: string; user_id: string };
type MyJwtPayload = { id: string; [key: string]: unknown };

const Socket = () => {
	const roomName = "room-1";
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [joined, setJoined] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);
    const token = cookieHelper.get('access_token');

	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleNewMessage = useCallback((msg: unknown) => {
		console.log("tunv");
		console.log(msg);
		setMessages((prev) => [...prev, msg as Message]);
	}, []);

    // const socketRef = useSocket(token, (msg: unknown) => {
    //     setMessages((prev) => [...prev, msg as Message]);
    // });
	const socketRef = useSocket(token ?? "", handleNewMessage);

    const joinRoom = (room: unknown) => {
        if (socketRef.current) {
            socketRef.current.emit("join-room", room);
			setJoined(true);
        }
    };

	const sendMessage = async () => {
		if (input.trim() === "") return;
	
		try {
			await fetch("http://127.0.0.1:8000/api/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					message: input,
					room: roomName,
				}),
			});

			// Lấy user_id từ token
			const decoded = token ? jwtDecode<MyJwtPayload>(token) : null;
			const userId = decoded?.id ?? "me";

			// 👉 Push ngay vào list
			setMessages((prev) => [...prev, { message: input, user_id: userId }]);

			setInput("");
		} catch (err) {
			console.error("Failed to send", err);
		}
	};

	// const sendMessage = () => {
	// 	if (input.trim() === "") {
	// 		return;
	// 	}

	// 	if (socketRef.current) {
    //         socketRef.current.emit("send-message", {
	// 			room: roomName,
	// 			message: input,
	// 		});
	// 	}

	// 	setInput("");
    // };

    return (
        <div style={{ padding: 20 }}>
            <h1>Realtime Chat 🚀</h1>

            {!joined ? (
                <button onClick={() => joinRoom(roomName)}>Join Room 1</button>
            ) : (
                <>
                    <div style={{ marginTop: 20 }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>

                    <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
						{messages.map((msg, idx) => (
							<li key={idx} style={{ margin: "5px 0", background: "#f1f1f1", padding: "5px 10px", borderRadius: "6px" }}>
								<strong>User {msg.user_id}:</strong> {msg.message}
							</li>
						))}
						<div ref={bottomRef} />
					</ul>
                </>
            )}
        </div>
    );
};

export default Socket;
