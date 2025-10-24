import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  cardClick,
  clothingItems = [],
  onAddButtonClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button className="clothes-section__button" onClick={onAddButtonClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return <ItemCard key={item._id} item={item} cardClick={cardClick} />;
        })}
      </ul>
    </div>
  );
}
