import io from 'socket.io-client';
import { useEffect, useState } from 'react';

function useSocket(send) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:4000');
    socketInstance.on('connect', () => {
      send('JOY_CON_CONNECTED');
      setSocket(socketInstance);
    });
    socketInstance.on('connect_error', () => send('JOY_CON_NOT_FOUND'));
  }, [send]);

  return socket;
}

export default useSocket;
