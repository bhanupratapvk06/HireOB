import { AuthProvider } from "../context/AuthContext";
import { JobProvider } from "../context/JobContext";
import { ApplicationProvider } from "../context/ApplicationContext";

export const AppProviders = ({children}) => {
    return (
        <AuthProvider>
            <JobProvider>
                <ApplicationProvider>
                    {children}
                </ApplicationProvider>
            </JobProvider>
        </AuthProvider>
    );
};