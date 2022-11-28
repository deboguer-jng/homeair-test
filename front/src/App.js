import { useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState();
  const [vendor, setVendor] = useState('');
  const [file, setFile] = useState();
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("csv", file);
    formData.append("date", date);
    formData.append("vendor", vendor);

    console.log(file);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        console.log(res)
      });
  }

  return (
    <div className="App">
      <div className="form">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" value={vendor} placeholder="Vendor Name" onChange={(e) => setVendor(e.target.value)} />
        <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
        <button type="button" onClick={onSubmit}>Submit</button>
        {!!message?.length && <span>{message}</span>}
      </div>
    </div>
  );
}

export default App;
