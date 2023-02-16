import './App.css';
import Header from './grid-components/Header';
import Sidebar from './grid-components/Sidebar';
import ContentLeft from './grid-components/ContentLeft';
import ContentRight from './grid-components/ContentRight';
import Footer from './grid-components/Footer';

function App() {

  return (
    <div className="App">
    <div className='wrapper'>
      <Header />
      <Sidebar />
      <ContentLeft />
      <ContentRight />
      <Footer /> 
    
      </div>
    </div>
  );
}

export default App;
