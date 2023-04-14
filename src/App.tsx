import RouteContent from './routes/routeContent';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteContent />
      </BrowserRouter>
    </div>
  )
}

export default App
