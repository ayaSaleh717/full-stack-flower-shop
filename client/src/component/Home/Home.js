import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/feature/cartSlice";
import { toast } from "react-toastify";
import Categorys from "../Categorys/Catygoreys";
import { getProducts } from "../../api/api";

function Home() {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // This useEffect hook runs when the component mounts and when selectedCategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Pass the selectedCategory to getProducts
        const data = await getProducts(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products.");
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Re-run the effect when selectedCategory changes

  const send = (e) => {
    if (user) {
      dispatch(addToCart(e));
      toast.success("Item added to your cart");
    } else {
      toast.error("You need to login first!");
    }
  };

  return (
    <>
      <section className="iteam_section mt-4 container p-5">
        <h2 className="p-3  ">Say It with Flowers 💐</h2>
        <h6 className="flower-cap">Every Flower Tells a Story..</h6>

        <div className="row mt-5 d-flex justify-content-around align-items-center">
          <Categorys
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* We now map over the 'products' from the database, which are already filtered */}
          {Array.isArray(products) && products.map((element, index) => {
            return (
              <Card key={element.proId || index} className="hove mb-4">
                <Card.Img
                  variant="top"
                  className="cd"
                  src={element.img} // Using the 'img' property from your DB
                />

                <div className="card_body">
                  <div className="upper_data d-flex justify-content-between align-items-center">
                    <h4 className="mt-2">{element.proName}</h4> {/* Using 'proName' */}
                    <span>{element.rating || 5}&nbsp;★</span>
                  </div>

                  <div className="lower_data d-flex justify-content-between ">
                    <h5>{element.farm || 'Local Farm'}</h5>
                    <span>${element.price}</span> {/* Using 'price' */}
                  </div>
                  <div className="extra"></div>

                  <div className="last_data d-flex justify-content-between align-items-center">
                    <Button
                      variant="outline-light"
                      className="mt-2 mb-2  btn custom-btn"
                      onClick={() => send(element)}
                    >
                      Add TO Cart
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Home;