import { createContext, useContext, useState, useMemo } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const { token } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [pageData, setPageData] = useState({
        current: 1,
        total: 0
    });

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchJobs = async (page = 1, limit = 6, filters = {}) => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page,
                limit,
                ...filters
            });

            const res = await axios.get(
                `http://localhost:5000/api/job/getStudentJobs?${params}`
            );

            if (res.status === 200) {
                setJobs(res.data.jobs);
                setPageData({
                    current: res.data.currentPage,
                    total: res.data.totalPages
                });
            }
        } catch (error) {
            console.log("Fetching Jobs Failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const createJob = async (jobData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/job/createjob",
                jobData,
                authHeader
            );

            await getPostedJobs();

            return res.data;
        } catch (error) {
            console.log("Create Job Failed:", error.response?.data?.message);
            throw error;
        }
    };

    const editJob = async (jobId, updatedData) => {
        try {
            const res = await axios.patch(
                `http://localhost:5000/api/job/editJob/${jobId}`,
                updatedData,
                authHeader
            );

            await getPostedJobs();

            return res.data;
        } catch (error) {
            console.log("Edit Job Failed:", error.response?.data?.message);
            throw error;
        }
    };

    const deleteJob = async (jobId) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/job/deleteJob/${jobId}`,
                authHeader
            );

            await getPostedJobs();

            return res.data;
        } catch (error) {
            console.log("Delete Job Failed:", error.response?.data?.message);
            throw error;
        }
    };

    const getPostedJobs = async (page = 1, limit = 10) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/job/getPostedJobs?page=${page}&limit=${limit}`,
                authHeader
            );

            if (res.status === 200) {
                setPostedJobs(res.data.jobs);
            }
        } catch (error) {
            console.log("Fetching Recruiter Jobs Failed:", error);
        }
    };

    const jobValue = useMemo(() => ({
        jobs,
        postedJobs,
        pageData,
        loading,
        fetchJobs,
        createJob,
        editJob,
        deleteJob,
        getPostedJobs
    }), [jobs, postedJobs, pageData, loading]);

    return (
        <JobContext.Provider value={jobValue}>
            {children}
        </JobContext.Provider>
    );
};

export const useJob = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error("useJob must be used within JobProvider");
    }
    return context;
};
