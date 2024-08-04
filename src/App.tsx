import {RouterProvider} from "react-router-dom";
import Routes from "@/Routes.tsx";
import {ThemeProvider} from "@/components/theme-provider/ThemeProvider.tsx";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";

const App = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={Routes()}/>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
