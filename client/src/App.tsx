import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { ElectionsProvider } from "./context/elections/context";
import { OptionsDetailProvider } from "./context/option/context";
// import "./i18n"

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`h-screen w-full mx-auto py-2 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <ElectionsProvider>
        <OptionsDetailProvider>
          <RouterProvider router={router} />
        </OptionsDetailProvider>
      </ElectionsProvider>
    </div>
  );
};
export default App;
