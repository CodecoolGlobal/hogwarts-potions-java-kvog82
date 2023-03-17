import Potions from "./potionContainer/Potions"

const PotionContainer = ({potions, setPotions, students, setBrewPotion, setBrewPotionId}) => {

  return (
    <div className="box content-left">
      <span className="section-headline">Welcome to our Potions Kitchen!</span><br></br><br></br>
      <Potions potions={potions} setPotions={setPotions} students={students}  setBrewPotion={setBrewPotion} setBrewPotionId={setBrewPotionId} />
    </div>
  )
}

export default PotionContainer
