import { BrowserRouter } from 'react-router-dom';

import PageRoutes from './components/layout/PageRoutes';

function App() {
    return (
        <BrowserRouter>
            <PageRoutes />
        </BrowserRouter>
        // <div className="App">
            
        // </div>
    );
}

export default App;