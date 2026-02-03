import './BrowseCategory.css'
import { MdOutlineAgriculture } from "react-icons/md";
import { GiTechnoHeart } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { SiMaterialdesignicons } from "react-icons/si";
import { LiaCoinsSolid } from "react-icons/lia";
import { MdOutlineFactory } from "react-icons/md";

const BrowseCategory = () => {
    const category = [
        { icon: MdOutlineAgriculture, name: "Agriculture", jobsCount: "1287" },
        { icon: MdOutlineFactory, name: "Metal Production", jobsCount: "842" },
        { icon: GiTechnoHeart, name: "Technology", jobsCount: "3560" },
        { icon: MdOutlineHealthAndSafety, name: "Healthcare", jobsCount: "2140" },
        { icon: BsBank2, name: "Finance & Banking", jobsCount: "1675" },
        { icon: ImBooks, name: "Education", jobsCount: "930" },
        { icon: SiMaterialdesignicons, name: "Design & Creative", jobsCount: "1245" },
        { icon: LiaCoinsSolid, name: "Marketing & Sales", jobsCount: "1988" }
    ];

    return (
        <div className="bcat">
            <div className="opening">
                <h1>Browse By Category</h1>
                <p>Find what you're looking for.</p>
            </div>

            <div className="categories">
                {category.map((cat) => (
                    <div className="cat-card">
                        {<cat.icon size={40} color='#309689'/>}
                        <p>{cat.name}</p>
                        <div>{cat.jobsCount} jobs</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrowseCategory;