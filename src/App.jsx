
import './App.css'
import { useEffect, useState } from 'react'
function App() {

  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration,setBreakDuration] = useState(5)
  const [workSecond, setWorkSecond] = useState(1500)
  const [breakSecond, setBreakSecond] = useState(300)
  const [type, setType] = useState("Work")
  const [resetFlag, setResetFlag] = useState(true)
  const [flag,setFlag] =useState(false)
  useEffect(()=>{
    if(flag && type === "Work"){
      if(workSecond > 0){
        setTimeout(()=>setWorkSecond(workSecond - 1),1000)
      }
    }

    if(workSecond === 0 ){
      alert("Break time has ended")
      setType("Break")
      setWorkSecond(1500)
    }
    if(flag && type === "Break"){
      if(breakSecond > 0){
        setTimeout(()=>setBreakSecond(breakSecond - 1), 1000)
      }
    }
    if(breakSecond === 0){
      setType("Break")
    }

  })

  const formatSpecifier = (seconds)=>{
      let min = parseInt(seconds/60).toString();
      let sec = parseInt(seconds%60).toString();
      if(sec.length === 1) sec = "0" + sec;
      if(min.length === 1) min = "0" + min;
      return min + " : "+ sec
  }
  const handleReset =()=>{
      setWorkDuration(25)
      setBreakDuration(5)
      setType("Work")
      setFlag(false)
      setBreakSecond(300)
      setWorkSecond(1500)
      setResetFlag(true)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setWorkSecond(workDuration*60)
    setBreakSecond(breakDuration*60)
  }
  return (
    <>
    <h1>{type === "Work"? formatSpecifier(workSecond):formatSpecifier(breakSecond)}</h1>
    <h1>{type === "Work"? "Work":"Break"} - Time</h1>
    <button onClick={()=> {setFlag(true) 
      setResetFlag(false)}} disabled={flag} className="start_btn">Start</button>
    <button onClick={()=> {setFlag(false) 
      setResetFlag(false)}} disabled={!flag} className="stop_btn">Stop</button>
    <button  onClick={handleReset} disabled={resetFlag} className="reset_btn">Reset</button>
    <form onSubmit={handleSubmit}>
      <input className='work-time-input' type="number" placeholder='Enter work time'value={workDuration} onChange={(e)=> setWorkDuration(e.target.value)}/>
      <input className='break-time-input' type="number" placeholder='Enter break time' value={breakDuration} onChange={(e)=> setBreakDuration(e.target.value)}/>
      <input className='set' type='submit' value="Set"/>
    </form>
    </>
  )
}

export default App
