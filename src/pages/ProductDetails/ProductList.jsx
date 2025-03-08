import { useNavigate } from 'react-router-dom';

function ProductItem({ product }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}đ</p>
    </div>
  );
}
