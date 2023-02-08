import { useState, useEffect} from 'react'
import {Card} from '../../components/Card'

import './style.css'

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setEstudends] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  async function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time:new Date().toLocaleDateString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit' 
      })
    };

    setEstudends(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
   async function fecthData(){
    const response = await fetch('https://api.github.com/users/Juansantoss07')
    const data = await  response.json()
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
   }

   fecthData();
  }, []);

  return (
    <div className='container'>
    <header>
    <h1>Insira seu nome:</h1>
    <div>
      <strong>{user.name}</strong>
      <img src={user.avatar} alt="Foto de perfil" />
    </div>
    </header>
    <input 
    type="text"
    placeholder='Insira seu nome...'
    onChange={e => setStudentName(e.target.value)}/>
    <button onClick={handleAddStudent}>Adicionar</button>

    {
      students.map(student => 
        <Card 
        key={student.time}
        name={student.name} 
        time={student.time} />)
    }
    </div>
  )
}

