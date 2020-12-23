import React, { useEffect } from 'react';
import { firestore } from '../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const TEST = () => {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {}, []);
  return <>{JSON.stringify(messages)}</>;
};
