import React from 'react';
import './App.css';
import {SnackbarProvider} from "notistack";
import {Provider} from "react-redux";
import {persist, store} from "./redux";
import {PersistGate} from "redux-persist/integration/react";
import {notyStackRef} from "./utils";
import {BrowserRouter} from "react-router-dom";
import RoutesGenerator from "./routes/RoutesGenerator";
import ThemeProviderGeneral from "./themes/ThemeProviderGeneral";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persist}>
                <SnackbarProvider maxSnack={3} ref={notyStackRef}>
                    <ThemeProviderGeneral>
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                            <RoutesGenerator/>
                        </BrowserRouter>
                    </ThemeProviderGeneral>
                </SnackbarProvider>
            </PersistGate>
        </Provider>

    );
}

export default App;
