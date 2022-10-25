import React,{useState, useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import ProgressBar from './components/ProgressBar'

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const [hour, setHour] = useState (0);
  const [minute, setMinute] = useState (0);
  const [second, setSecond] = useState (0);
  const [totalTime, setTotalTime] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [progress, setProgress] = useState(0)
  const [pauseCounter, setPauseCounter] = useState(false)
  const [resetCounter, setResetCounter] = useState(false)
  const [startCounter, setStartCounter] = useState(false)
  function handleOpen() {
    setMinute(0)
    setHour(0)
    setSecond(0)
    setOpen(true)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  useEffect(() => {
    const time = new Date();
        time.setSeconds(time.getSeconds() + totalTime);
        restart(time);
        pause(time);
  },[totalTime]);

  
  
  function handleSubmit(){
    setOpen(false);
    setTotalTime(parseInt(second) + parseInt(minute) * 60 + parseInt(hour) * 3600)
    const time = new Date();
    time.setSeconds(time.getSeconds());
  }
  const formatTime = (time) => {
    return String(time).padStart(2, '0')
  }

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
      <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
      </div>
      <ProgressBar 
            progress={progress}
            setProgress={setProgress} 
            totalTime={totalTime} 
            pauseCounter={pauseCounter} 
            resetCounter={resetCounter}
            startCounter ={startCounter}
        ></ProgressBar>
      
      <button className="reset" onClick={() => 
      {
       
        const time = new Date();
        time.setSeconds(time.getSeconds());
        restart(time)
        setResetCounter(true)
      }}>Reset</button>
      <button className="pause" onClick={() => { pause();  setPauseCounter(true)}}>Pause</button>
      
      <button className="resume" onClick={() => { resume();  setPauseCounter(false)}} >Resume</button>
      <button className="start" onClick={() => 
      {
        setProgress(1)
        const time = new Date();
        time.setSeconds(time.getSeconds() + totalTime);
        restart(time)
        setResetCounter(false)
        setStartCounter(true)
      }}>start</button>
      <button onClick={handleOpen} className='setTime'>Set time</button> 
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
   <Box sx={style}>
         <button onClick={handleClose} className='close'>X</button> 
        <div className='fields' >

      <TextField className='textField'
       id="hour"
       label="Hour"
       defaultValue="00"
       onChange={(event) => { setHour(event.target.value)} }
     />

      <TextField className='textField'
       id="minute"
       label="Minute"
       defaultValue="00"
       onChange={(event) => { setMinute(event.target.value)} }
      />
      <TextField className='textField'
       id="second"
       label="Second"
       defaultValue="00"
       onChange={(event) => { setSecond(event.target.value)} }
     />
     
      <Button type='submit' onClick={handleSubmit} >OK</Button>
     </div>
     </Box>
      </Modal>

    </div>
  );
}

export default function App() {
  const time = new Date();
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
