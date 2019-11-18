import { useEffect } from 'react';

function useJoyCon(socket, send) {
  useEffect(() => {
    if (!socket) return;

    socket.on('device-event', msg => {
      const position = msg.hasOwnProperty('buttonPressed')
        ? msg.buttonPressed
        : undefined;

      if (position === 'sr') {
        send({
          type: 'ADD_USER_CHOICE',
          payload: { getFromActiveIconIndex: true }
        });
        return;
      }

      send({ type: 'KEY_CHANGE', payload: { position } });
    });
  }, [socket, send]);
}

export default useJoyCon;
