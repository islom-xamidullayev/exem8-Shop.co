import Brands from "../../components/Brands";
import Browse from "../../components/Browse";
import ReviewsPage from "../../components/Customers";
import Header from "../../components/Hero";
import ProductsList from "../../components/Products";

function Home() {
  return (
    <div className=" ">
      <Header />
      <Brands />

      <ProductsList />
      <Browse/>
      <ReviewsPage />
    </div>
  );
}

export default Home;
