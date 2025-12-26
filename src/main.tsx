import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./context/AuthContext.tsx";
createRoot(document.getElementById("root")!).render(

      <Provider store={store}>
         <AuthProvider>
    <ThemeProvider>
      <AppWrapper>
        <App />
        <ToastContainer/>
      </AppWrapper>
    </ThemeProvider>
    </AuthProvider>
    
    </Provider>
);
