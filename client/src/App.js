import './App.css';
import Header from './fixed-components/Header';
import Footer from './fixed-components/Footer';
import PotionContainer from './content-components/PotionContainer';
import BrewingForm from './content-components/BrewingForm';
import Sidebar from "./fixed-components/Sidebar";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {POTIONS_URL, STUDENTS_URL} from "./constants/urls";
import HousesLeft from "./content-components/HousesLeft";
import HousesRight from "./content-components/HousesRight";

function App() {
  const [potions, setPotions] = useState([])
  const [students, setStudents] = useState([])
  const [brewPotion, setBrewPotion] = useState(null)
  const [brewPotionId, setBrewPotionId] = useState(0);
  const [rooms, setRooms] = useState([]);

  useEffect (() => {
    const getPotions = async () => {
      const potionsFetched = await fetchData(POTIONS_URL)
      setPotions(potionsFetched)
    }
    const getStudents = async () => {
      const studentsFetched = await fetchData(STUDENTS_URL)
      setStudents(studentsFetched)
    }

    getPotions()
    getStudents()
  }, [])

  const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  return (
    <div className="App">
    <div className='wrapper'>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<>
          <PotionContainer potions={potions} setPotions={setPotions} students={students} brewPotion={brewPotion} setBrewPotion={setBrewPotion} brewPotionId={brewPotionId} setBrewPotionId={setBrewPotionId} />
          <BrewingForm potions={potions} setPotions={setPotions} students={students} brewPotion={brewPotion} setBrewPotion={setBrewPotion} brewPotionId={brewPotionId} setBrewPotionId={setBrewPotionId} /></>}
        />
        <Route path="/houses" element={<>
          <HousesLeft fetchData={fetchData} rooms={rooms} setRooms={setRooms} />
          <HousesRight rooms={rooms} setRooms={setRooms} /></>}
        />

      </Routes>
      <Footer />
      </div>
    </div>
  );
}

export default App;
