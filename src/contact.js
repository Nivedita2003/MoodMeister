import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  ChakraProvider,
  Box,
  VStack,
  Grid,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
import axios from 'axios';   
import Status from './Status';
import Result from './Result';
const assemblyApi = axios.create({
  baseURL: 'https://api.assemblyai.com/v2',
  headers: {
    Authorization: "618f3951584844c986eaeeb4b22c996e",
    'Content-Type': 'application/json',
  },

});
const initialState = {
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h: 0,
    m: 0,
    s: 0,
  },
}
const Contact = (props) => {
  const navigate = useNavigate();
  const [audioDetails, setAudioDetails] =useState(initialState);
  const [transcript, setTranscript] = useState({ id: ''});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const interval = setInterval(async ()=> {
      if(transcript.id && transcript.status !== 'completed' && isLoading){
        try{
          const{ data: transcriptData } = await assemblyApi.get(
            `/transcript/${transcript.id}`
          );
          setTranscript({ ...transcript, ...transcriptData });
        } catch(err) {
          console.error(err);
        }
      } else{
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoading, transcript]);



  const handleAudioStop = (data) => {
    setAudioDetails(data);
  };
  const handleReset = () => {
    setAudioDetails({...initialState});
    setTranscript({id: ''});
  };
  const handleAudioUpload = async (audioFile) => {
    setIsLoading(true);

    const { data: uploadResponse } = await assemblyApi.post('/upload',audioFile);
    const { data } = await assemblyApi.post('/transcript', {
      audio_url: uploadResponse.upload_url,
      sentiment_analysis: true,
      entity_detection: true,
      iab_categories:true,
    });

    setTranscript({ id: data.id });
  };
  return (
    <>
    <div style={{ 
      backgroundImage: `url("https://cutewallpaper.org/21/1920-x-1080-gif/1920x1080-Wallpapercartoon-Wallpapers-Driverlayer-Search-.gif")` , height:"1000px"
    }}>
      <ChakraProvider>
        <br/>
        <br/>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <VStack spacing={8}>
              <Avatar
                size="2xl"
                name="Assembly AI"
                src="https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2234&g=80" />

              <Box>
                {transcript.text && transcript.status === 'completed' ? (
                  <Result transcript={transcript} />
                ) : (
                  <Status isLoading={isLoading} status={transcript.status} />)}
              </Box>
              <Box width={1000}>
                <Recorder
                  record={true}
                  audioURL={audioDetails.url}
                  handleAudioStop={handleAudioStop}
                  handleAudioUpload={handleAudioUpload}
                  handleReset={handleReset} />
              </Box>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
      </div>
      </>
  );
};

export default Contact;