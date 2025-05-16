import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
function MainNavigation({ onLogout }) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>BuzzDaily</div>
      <nav>
        <ul className={classes.mylist}>
          <li>
            <Link to="/news-feed">News Feed</Link>
          </li>
          <li>
            <Link to="/user-profile">Profile</Link>
          </li>

          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
