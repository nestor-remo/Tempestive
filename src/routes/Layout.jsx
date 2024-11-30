import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li className='home-link' key="home-button" style={list-style: "none"}>
                        <Link style={{color: "white"}} to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
};

export default Layout;