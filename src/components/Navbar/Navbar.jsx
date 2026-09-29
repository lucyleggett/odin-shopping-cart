import "./Navbar.css";
import miffyGift from "../../assets/miffy_gift.png";
import house from "../../assets/house.png";
import dog from "../../assets/dog.png";

export function Navbar() {
  return (
    <nav>
      <div className="buttons-container">
        <button className="home-btn">
          {" "}
          <img src={house} alt="Miffy's house" />
          <span>Home</span>
        </button>
        <button className="shop-btn">
          {" "}
          <img src={dog} alt="Yellow duck" />
          <span>Shop</span>
        </button>
        <button className="cart-btn">
          {" "}
          <img src={miffyGift} alt="Miffy holding a present" />
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
}
