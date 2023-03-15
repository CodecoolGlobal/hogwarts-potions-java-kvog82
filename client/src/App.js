import './App.css';
import Header from './fixed-components/Header';
import Footer from './fixed-components/Footer';
import PotionContainer from './content-components/PotionContainer';
import BrewingForm from './content-components/BrewingForm';
import Sidebar from "./fixed-components/Sidebar";
import {useEffect, useState} from "react";
import {POTIONS_URL, STUDENTS_URL} from "./constants/urls";

function App() {
  const [potions, setPotions] = useState([])
  const [students, setStudents] = useState([])
  const [brewPotion, setBrewPotion] = useState([])

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
      <PotionContainer potions={potions} setPotions={setPotions} brewPotion={brewPotion} setBrewPotion={setBrewPotion} />
      <BrewingForm potions={potions} setPotions={setPotions} students={students} brewPotion={brewPotion} setBrewPotion={setBrewPotion} />
      <Footer />
      </div>
    </div>
  );
}

export default App;
