import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [allData, setAllData] = useState([])
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    fetch('http://localhost:4500/table').then((res) => {
      return res.json()
    }).then((data) => {
      setAllData(data)
      console.log(allData)
    })
  }, [flag])

  const [hour, setHour] = useState('')
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')

  const addNewData = async (hour, day, date) => {
    const obj = {
      hours: hour,
      day: day,
      date: date
    }
    await fetch('http://localhost:4500/table', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    })
    setFlag(!flag)
  }

  const showTable = () => {
    return allData.map((val) => {
      return <tr>
        <td>{val.hours}</td>
        <td>{val.day}</td>
        <td>{val.date}</td>
      </tr>
    })
  }

  return (
    <div className="App">
      <input onChange={(e) => { setHour(e.target.value) }} type="text" /> <br />
      <input onChange={(e) => { setDay(e.target.value) }} type="text" /> <br />
      <input onChange={(e) => { setDate(e.target.value) }} type="text" /> <br />
      <button onClick={() => { addNewData(hour, day, date) }}>add</button>

      <br />
      <br />
      <br />
      <table>
        <tr>
          <td>Hour</td>
          <td>Day</td>
          <td>Date</td>
        </tr>
        {showTable()}
      </table>
    </div>
  );
}

export default App;
