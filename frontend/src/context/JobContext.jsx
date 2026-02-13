import { createContext, useContext } from "react";

const JobContext = createContext();

export const JobProvider = ({children}) => {
    const jobValue = {}

    return (
        <JobContext.Provider value={jobValue}>
            {children}
        </JobContext.Provider>
    );
}

export const useJob = () => {
    const context = useContext(JobContext);
    if(!context){
        throw new Error("useJob must be used within JobProvider");
    }
    return context;
}