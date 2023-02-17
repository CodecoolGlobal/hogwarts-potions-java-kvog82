import './App.css';
import Header from './fixed-components/Header';
import Footer from './fixed-components/Footer';
import PotionContainer from './content-components/PotionContainer';
import BrewingForm from './content-components/BrewingForm';

function App() {

  return (
    <div className="App">
    <div className='wrapper'>
      <Header />
      <PotionContainer />
      <BrewingForm />
      <Footer /> 
    
      </div>
    </div>
  );
}

export default App;
