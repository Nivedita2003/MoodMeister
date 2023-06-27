import React from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

import { Button, Image, Stack , WrapItem, Center} from "@chakra-ui/react";
const Home = (props) => {
  const navigate = useNavigate();

  return (
    <>
            
          
          
          <div style={{ 
      backgroundImage: `url("https://cutewallpaper.org/21/1920-x-1080-gif/1920x1080-Wallpapercartoon-Wallpapers-Driverlayer-Search-.gif")` , height:"1000px"
    }}>
      <br/>
      <h1 style={{ color: "DodgerBlue", fontSize: "50px", textAlign: "center", fontFamily: "serif" }}>MOOD-MEISTER</h1>
          <Card style={{ padding: '1rem',width: '70rem' ,marginLeft:"auto",marginRight:"auto", borderRadius: '5px',}}>
      <Card.Body>
         <Card.Text style={{textAlign:"center",fontSize:"30px",color:"white"}}>
         Our application is used to collect the reviews of the movies from people and categorizes them upon their sentiment.People who are reviewing our systems are suggested to give the detailed feedback about all the technicians associated with the film like actor, director,etc..,
        </Card.Text>
         </Card.Body>
          </Card>
          <Center style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
    <Button style={{ padding: '1rem', fontSize: '1.5rem', borderRadius: '5px', backgroundColor: 'DodgerBlue', color: 'white' }}  onClick={() => navigate("/contact")} >
    GIVE REVIEWS!!
  </Button>
    </Center>
     
      <Stack direction='row' spacing={10} align='center'>
      
       </Stack>
        </div>
      

      {/* Button */}
      
      
    
    </>
  );
};
export default Home;