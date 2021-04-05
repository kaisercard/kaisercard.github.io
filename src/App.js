import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CardGenerator, CardPrinter } from './components';

function App() {
    // const [printMode, setPrintMode] = useState(false);
    // const [currHash, setCurrHash] = useState('');

    // useEffect(() => {
    //     console.log('current hash', window.location.hash);
    //     setCurrHash(window.location.hash);
    // },[window.location.hash]);

    // useEffect(() => {
    //     window.addEventListener('hashchange', window.location.reload(), false);
    //     // return () =>
    //     //     window.removeEventListener(
    //     //         'hashchange',
    //     //         window.location.reload(),
    //     //         false
    //     //     );
    // }, []);

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

    if (window.location.hash === '#print') {
        return (
            <div>
                <CardPrinter />
            </div>
        );
    }

    return (
        <div>
            <CardGenerator />
        </div>
    );
}

export default App;
