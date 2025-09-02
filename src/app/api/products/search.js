// export default function handler(req, res) {
//   const { q } = req.query;

//   const allProducts = [
//     { id: 101, name: "Men T-Shirt", description: "Cotton tee", price: 499, imageUrl: "/men1.png", category: "men" },
//     { id: 201, name: "Kids T-Shirt", description: "Kids cotton tee", price: 399, imageUrl: "/kids1.png", category: "kids" },
//     { id: 301, name: "Women Dress", description: "Elegant dress", price: 999, imageUrl: "/women1.png", category: "women" },
//     // ... add more
//   ];

//   let results = allProducts;

//   if (q) {
//     results = allProducts.filter((p) =>
//       p.name.toLowerCase().includes(q.toLowerCase())
//     );
//   }

//   res.status(200).json(results);
// }
