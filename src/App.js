import { Route, Switch } from 'react-router-dom';
import { CardGenerator, CardPrinter } from './components';

function App() {
    return (
        <Switch>
            <Route exact path='/'>
                <CardGenerator />
            </Route>
            <Route path='/print'>
                <CardPrinter />
            </Route>
        </Switch>
    );
}

export default App;
