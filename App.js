import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputs, setInputs] = useState({
    age: 0,
    anaemia: 0, // Assuming anaemia is a boolean (0 or 1)
    creatinine_phosphokinase: 0,
    diabetes: 0, // Assuming diabetes is a boolean (0 or 1)
    ejection_fraction: 0,
    high_blood_pressure: 0, // Assuming high_blood_pressure is a boolean (0 or 1)
    serum_creatinine: 0,
    serum_sodium: 0,
    sex: 0, // Assuming sex is a boolean (0 or 1)
    smoking: 0, // Assuming smoking is a boolean (0 or 1)
    time: 0
  });
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check for missing fields before submitting
      const requiredFields = ['age', 'anaemia', 'creatinine_phosphokinase', 'diabetes', 'ejection_fraction', 'high_blood_pressure', 'serum_creatinine', 'serum_sodium', 'sex', 'smoking', 'time'];
      for (const field of requiredFields) {
        if (!(field in inputs)) {
          throw new Error(`${field} is missing.`);
        }
      }

      const response = await axios.post('http://127.0.0.1:8000/', inputs);
      setOutput(response.data.output);
      setError('');
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', color: '#007bff', fontSize: '2rem' }}>
      <h1 style={{ color: '#6610f2', fontSize: '3rem' }}>Enter Patient Information</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Object.keys(inputs).map((key) => (
          <div key={key} style={{ marginBottom: '20px' }}>
            <label style={{ color: '#343a40', fontSize: '2rem' }}>{key}:</label>
            <input
              type={key === 'age' || key === 'ejection_fraction' || key === 'serum_creatinine' || key === 'serum_sodium' || key === 'time' ? 'number' : 'text'}
              name={key}
              value={inputs[key]}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', fontSize: '2rem', padding: '10px', borderRadius: '5px' }}
            />
          </div>
        ))}
        <button type="submit" style={{ marginTop: '30px', fontSize: '2rem', padding: '15px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>Submit</button>
      </form>
      {output && <div style={{ marginTop: '30px', fontSize: '2rem', color: '#007bff' }}>{output}</div>}
      {error && <div style={{ marginTop: '30px', color: 'red', fontSize: '2rem' }}>{error}</div>}
    </div>
  );
}

export default App;