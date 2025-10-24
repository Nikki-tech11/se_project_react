import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({ cardClick, clothingItems }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection cardClick={cardClick} clothingItems={clothingItems} />
    </section>
  );
}
