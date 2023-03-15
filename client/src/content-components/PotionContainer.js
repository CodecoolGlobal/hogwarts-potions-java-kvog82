import { useEffect, useState } from "react"
import Potions from "./Potions"

const PotionContainer = ({potions, setPotions, students, brewPotion, setBrewPotion, brewPotionId, setBrewPotionId}) => {


  return (
    <div className="box content-left">
      Welcome to our Potions Kitchen! <br></br><br></br>
      <Potions potions={potions} setPotions={setPotions} students={students} brewPotion={brewPotion} setBrewPotion={setBrewPotion} brewPotionId={brewPotionId} setBrewPotionId={setBrewPotionId} />
    </div>
  )
}

export default PotionContainer
