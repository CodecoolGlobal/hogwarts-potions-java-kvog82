import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="box sidebar">
            <Link to="/">>> Potions</Link>
            <br></br>
            <br></br>

            <Link to="/houses">>> Houses</Link>
            <br></br>
            <br></br>
            <p> Welcome to Hogwarts!
                <br></br>
                Explore our Potions Section or find out more about our school and who is living here.
            </p>
        </div>
    )
}

export default Sidebar
