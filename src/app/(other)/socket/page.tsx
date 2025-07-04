'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import useSocket from "@/hooks/useSocket";
import { cookieHelper } from '@/lib/utils/cookie';
import { jwtDecode } from "jwt-decode";
import { api } from '@/lib/api/axios';
import { v4 as uuidv4 } from 'uuid';

type Message = {
	message: string;
	user_id: string,
	status?: "sending" | "sent" | "failed",
	temp_id?: string
};
type MyJwtPayload = {
	id: string;
	[key: string]: unknown
};

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
		if (input.trim() === "") {
			return;
		}

		const tempId = uuidv4();

		try {
			// Lấy user_id từ token
			const decoded = token ? jwtDecode<MyJwtPayload>(token) : null;
			const userId = decoded?.id ?? "me";

			// 👉 Push ngay vào list
			setMessages((prev) => [...prev, { message: input, user_id: userId, status: "sending", temp_id: tempId }]);

			// với axios này thì token được lấy từ bên axios helper
			await api.post("/messages", {
				message: input,
				room: roomName,
			});

			// Khi thành công: update message cuối cùng thành "sent"
			setMessages((prev) =>
				prev.map((msg) =>
					msg.temp_id === tempId ? { ...msg, status: "sent" } : msg
				)
			);

			setInput("");
		} catch (err) {
			console.error("Failed to send", err);
			setMessages((prev) =>
				prev.map((msg) =>
					msg.temp_id === tempId ? { ...msg, status: "failed" } : msg
				)
			);
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
								{msg.status === "sending" && <span style={{ color: "orange", marginLeft: 8 }}>(Đang gởi...)</span>}
								{msg.status === "sent" && <span style={{ color: "green", marginLeft: 8 }}>(Đã gởi)</span>}
								{msg.status === "failed" && <span style={{ color: "red", marginLeft: 8 }}>(Failed)</span>}
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
