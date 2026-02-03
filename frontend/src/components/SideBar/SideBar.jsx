import "./SideBar.css";
import assets from "../../assets/assets";

const SideBar = () => {

    const filterSections = [
        { title: "Category", data: assets.categories },
        { title: "Job Type", data: assets.jobTypes },
        { title: "Experience Level", data: assets.experienceLevels },
        { title: "Date Posted", data: assets.datePosted },
    ];

    return (
        <div className="sidemain">
            <div className="sidebar">

                <div className="search-title">
                    <h2>Search By Job Title</h2>
                    <input type="text" placeholder="Job title or company" />
                </div>

                <div className="search-location">
                    <h2>Location</h2>
                    <input type="text" placeholder="Choose City" />
                </div>

                {filterSections.map((section) => (
                    <div className="filter-section" key={section.title}>
                        <h2>{section.title}</h2>

                        {section.data.map((item) => (
                            <label key={item.id} className="filter-item">
                                <div className="left">
                                    <input
                                        type="checkbox"
                                        checked={item.selected}
                                        readOnly
                                    />
                                    <span>{item.name}</span>
                                </div>

                                <span className="count">{item.count}</span>
                            </label>
                        ))}
                    </div>
                ))}

                <div className="tags">
                    {assets.tags.map((tag) => (
                        <div className="tag" key={tag.id}>
                            <p>{tag.name}</p>
                        </div>
                    ))}
                </div>

            </div>
            <div className="hiring">
                <h2>WE ARE HIRING</h2>
                <p>Apply Today!</p>
            </div>
        </div>
    );
};

export default SideBar;
