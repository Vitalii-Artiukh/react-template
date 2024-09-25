import PropTypes from 'prop-types';
import styles from './Product.module.css';
import './Product.module.css';
import clsx from 'clsx';

const Product = ({
  name,
  imgUrl = 'https://dummyimage.com/640x480/2a2a2a/ffffff&text=Product+image+placeholder',
  price,
}) => {
  return (
    <div>
      {/* <Product {...props} /> */}
      <h2 className={styles.h2Title}>{name}</h2>
      <img src={imgUrl} alt={name} width={480} />
      <p>Price: {price} credits</p>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default Product;
