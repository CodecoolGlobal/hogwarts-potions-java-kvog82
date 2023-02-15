import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import ContentRight from './ContentRight';

function App() {

  return (
    <div className="App">
    <div className='wrapper'>
      <Header />
      <Sidebar />
      <Content />
      <ContentRight />
      <Footer /> 
    
      </div>
    </div>
  );
}

export default App;
