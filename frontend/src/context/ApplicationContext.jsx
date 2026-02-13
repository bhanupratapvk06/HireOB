import { createContext, useContext } from "react";

const ApplicationContext = createContext();

export const ApplicationProvider = ({children}) => {
    const applicationValue = {};
    return (
        <ApplicationContext.Provider value={applicationValue}>
            {children}
        </ApplicationContext.Provider>
    );
}

export const useApplication = () => {
    const context = useContext(ApplicationContext);
    if(!context){
        throw new Error('useApplication must be within ApplicationProvider');
    }
    return context;
}