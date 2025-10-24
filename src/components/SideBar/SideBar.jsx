import "./SideBar.css";
import avatar from "../../assets/avataricon.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";
  return (
    <aside className="SideBar">
      <div className="SideBar__profile">
        <p className="SideBar__username">{username}</p>
        <img src={avatar} alt="Terrence Tegegne" className="SideBar__avatar" />
      </div>
    </aside>
  );
}
