"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

type MyJwtPayload = { id: string; [key: string]: unknown };

export default function useSocket(token: string, onMessage: (data: unknown) => void) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io("http://localhost:3000", {
            auth: { token },
        });

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("new-message", (data) => {
            console.log("Received message:", data);
            const decoded = token ? jwtDecode<MyJwtPayload>(token) : null;
            if (decoded && decoded.id != data.user_id) {
                onMessage(data);
            }
        });

        socketRef.current = socket;

        console.log(socketRef);

        return () => {
            console.log("disconnect socket");
            socket.disconnect();
        };
    }, [token]);

    return socketRef;
}
