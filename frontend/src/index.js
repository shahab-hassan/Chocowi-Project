import ReactDOM from "react-dom/client"
import {BrowserRouter} from "react-router-dom"
import {SnackbarProvider} from "notistack"

import App from "./App"
import "./Styles/utils.css"
import "./Styles/buyer.css"
import "./Styles/seller.css"
import "./Styles/common.css"
import "./Styles/admin.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <SnackbarProvider>
                <App/>
        </SnackbarProvider>
    </BrowserRouter>
)