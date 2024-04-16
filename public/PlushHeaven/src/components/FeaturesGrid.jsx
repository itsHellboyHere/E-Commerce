import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const FeaturesGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="grid mt-10 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { id, name, price, image } = product;
        const dollarAmount = formatPrice(price);

        return (
          <Link key={id} to={`/products/${id}`} className="card w-full glass">
            <figure>
              <img className="rounded-xl h-64 md:h-48 w-full object-cover" src={image} alt={name} />
            </figure>
            <div className="card-body ">
              <h2 className="card-title capitalize tracking-wider">{name}</h2>
             
              <p className="text-secondary">{dollarAmount}</p>
            </div>
            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Buy Now</button> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FeaturesGrid;
