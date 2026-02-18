import './ResumeMatch.css';

const ResumeMatch = ({ job }) => {

    const score = Math.floor((job.title.length * 7 + job.skills.length * 13) % 100);

    let status = "Low Match";
    let color = "#ef4444";

    if (score >= 75) {
        status = "Strong Match";
        color = "#16a34a";
    } else if (score >= 50) {
        status = "Moderate Match";
        color = "#f59e0b";
    }

    return (
        <div className="resume-card">
            <div className="score-section">
                <div className="circle" style={{ "--scoreColor": color }}>
                    <span>{score}%</span>
                </div>

                <div className="match-text">
                    <p className="status" style={{ color }}>{status}</p>
                    <p className="sub">Based on your resume</p>
                </div>
            </div>

            <div className="resume-actions">
                <button className="improve">Improve Resume</button>
                <button className="apply">Quick Apply</button>
            </div>
        </div>
    );
};

export default ResumeMatch;
