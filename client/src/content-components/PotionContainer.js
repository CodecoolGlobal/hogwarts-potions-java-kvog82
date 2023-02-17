import { useEffect, useState } from "react"
import Potions from "./Potions"

const PotionContainer = () => {
  const baseUrl = "http://localhost:8080/potions"
  const [potions, setPotions] = useState([])

  useEffect (() => {
    const getPotions = async () => {
      const potionsFetched = await fetchPotions("")
      setPotions(potionsFetched)
    }

    getPotions()
  }, [])

  const fetchPotions = async (url) => {
    const response = await fetch(baseUrl + url)
    const potions = await response.json()
    return potions
  }

  return (
    <div className="box content-left">
      Welcome to our Potions Kitchen! <br></br><br></br>
      <Potions potions={potions} />
    </div>
  )
}

export default PotionContainer
