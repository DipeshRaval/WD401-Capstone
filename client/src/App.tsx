import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { ElectionsProvider } from "./context/elections/context";
import { OptionsDetailProvider } from "./context/option/context";
import { ElectionsDetailProvider } from "./context/electionData/context";
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
        <ElectionsDetailProvider>
          <OptionsDetailProvider>
            <RouterProvider router={router} />
          </OptionsDetailProvider>
        </ElectionsDetailProvider>
      </ElectionsProvider>
    </div>
  );
};
export default App;
