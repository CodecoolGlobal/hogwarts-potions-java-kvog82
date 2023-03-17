import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="box sidebar">
            <Link to="/">Potions</Link>

            <br></br>

            <br></br>
            <Link to="/houses">Houses</Link>



        </div>
    )
}

export default Sidebar
