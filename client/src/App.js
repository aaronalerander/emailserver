// import React from 'react';
import React, { useState, useEffect } from 'react';
import { assignRef, Flex, Text } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Emails from './components/Emails';
import Email from './components/Email';
//i think these should be EmailsTable and EmailTable

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
        <Route path="/email/:id" element={<Email />} />
        {/* <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </Flex>
  );
}

export default App;

/**
 * this is for the other page
 *
 * that page will be extreamly simlar to this page in regards to logic
 *
 * it will have to fetch the versions.
 * the display versions component. will have the post function in side
 *
 * the edit template fuction can have the logic in side.
 *
 *
 */
