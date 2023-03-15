import { useEffect, useState } from "react"
import Potions from "./Potions"

const PotionContainer = ({potions, setPotions}) => {


  return (
    <div className="box content-left">
      Welcome to our Potions Kitchen! <br></br><br></br>
      <Potions potions={potions} setPotions={setPotions} />
    </div>
  )
}

export default PotionContainer
