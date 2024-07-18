import Rater from "react-rater";
import { API_URL } from "../../helpers/constants.js";
import "react-rater/lib/react-rater.css";
import { useLocation } from 'react-router-dom';

import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";

const ProductDetail = () => {

  const location = useLocation();
  const  item = location.state.item || [];

  const plusMinuceButton = "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

  return (
    <section className="container flex-grow mx-auto max-w-screen border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="container mx-auto px-4">
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={item.images.map(image => ({
              original: `${API_URL}${image}`,
              thumbnail: `${API_URL}${image}`
          }))}
        />
        {/* /image gallery  */}
      </div>
      {/* description  */}

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {item.title}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={3.5}
            />

            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews})
            </p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {item.availability ? (
            <span className="text-green-600">In Stock </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p>
        <p className="font-bold">
          Brand: <span className="font-normal">{item.brand}</span>
        </p>
        <p className="font-bold">
          Cathegory:{" "}
          <span className="font-normal">{item.category}</span>
        </p>

        <p className="mt-4 text-4xl font-bold text-violet-900">
          R{item.price}{" "}
          {item?.previousPrice && item.previousPrice !== 0 && (
            <span className="text-xs text-gray-400 line-through">
              R{item.previousPrice}
            </span>
          )}
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {item.description}
        </p>
      </div>
    </section>
  );
};

export default ProductDetail;
