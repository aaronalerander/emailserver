import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Emails from './pages/Emails';
import EmailDetails from './pages/EmailDetails';

function App() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      backgroundColor="whiteAlpha.400"
    >
      <Header></Header>
      <Routes>
        <Route path="/" element={<Emails />} />
        <Route path="/email/:id" element={<EmailDetails />} />
      </Routes>
    </Flex>
  );
}

export default App;
