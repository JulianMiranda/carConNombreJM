import React, {
  createContext,
  useEffect,
  useContext,
  useRef,
  ReactNode,
  useState,
} from 'react';
import {AuthContext} from './auth/AuthContext';
import {io, Socket} from 'socket.io-client';
import {socketURL} from '../api/api';

interface SocketContextProps {
  socket: Socket | null;
  online: boolean;
  pedirCar: () => void;
}

export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined,
);

export const SocketProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {status, user} = useContext(AuthContext);
  const [online, setOnline] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && user?.id) {
      const socket = io(socketURL, {
        extraHeaders: {
          'x-token': user.id,
        },
      });
      socketRef.current = socket;
      socket.on('connect', () => {
        setOnline(true);
      });

      socket.on('disconnect', () => {
        setOnline(false);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [user, status]);

  const pedirCar = () => {
    if (socketRef.current) {
      socketRef.current.emit('pedir-car');
    }
  };

  useEffect(() => {
    console.log('isOnline', online);
  }, [online]);

  return (
    <SocketContext.Provider
      value={{socket: socketRef.current, online, pedirCar}}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
