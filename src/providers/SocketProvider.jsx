import useGetUser from '@/hooks/useGetUser';
import { connectSocket } from '@/services/socket';
import { createContext, useContext, useEffect, useState } from 'react';

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const { data: user } = useGetUser()

    const initializeSocket = async () => {
        const socketInstance = connectSocket({ userId: user?.id, role: user?.role })

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        socketInstance.on('connect_error', (error) => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.close();
        };
    };

    useEffect(() => {
        if(user) initializeSocket();
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};