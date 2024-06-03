import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
import styled from 'styled-components';

// Styled Card component
const Card = styled(Link)`
  width: 100%;
  height: 300px; /* Set a fixed height for the card */
  background: #07182E;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  figure {
    position: relative;
    overflow: hidden;
    border-radius: 0px 20px 0 0;
    height: 80%; /* Adjust as needed */
    width: 80%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio */
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .text-secondary {
    color: #ccc;
  }
`;


const FeaturesGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="grid mt-10 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { id, name, price, image } = product;
        const dollarAmount = formatPrice(price);

        return (
          <Card key={id} to={`/products/${id}`}>
            <figure>
              <img src={image} alt={name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title capitalize">{name}</h2>
              <p className="text-secondary">{dollarAmount}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default FeaturesGrid;
