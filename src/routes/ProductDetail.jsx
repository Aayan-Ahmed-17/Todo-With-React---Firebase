// import React, { useEffect, useState } from "react";
// import Card from "../components/Card";
// import { useParams } from "react-router-dom";
// // import { data } from 'autoprefixer';

// const ProductDetail = () => {
//   const [product, setProduct] = useState(null);
//   const {id} = useParams();

//   useEffect(() => {
//     async function getProductDetail() {
//       const res = await fetch(`https://dummyjson.com/products/${id}`);
//       const data = await res.json();

//       console.log(`Showing ${id} Product`)
//       setProduct(data);
//     }
//     getProductDetail();
//   }, []);

//   return (
//     <div className="py-[2rem] bg-slate-900">
//       {product && (
//         <div className="w-4/5 max-w-[40rem] mx-auto min-w-[20rem]">
//           <Card
//             title={product.title}
//             desc={product.description}
//             price={product.price}
//             image={product.thumbnail}
//             buttonText={"Add To Cart"}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;
