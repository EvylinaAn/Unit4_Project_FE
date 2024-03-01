// // import { usePosts } from "../../context/PostContext";
// // import { useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import { Carousel } from "react-bootstrap";

// // export default function FeaturedIndex() {
// //   const { postId ,posts, fetchPosts, fetchCategories, featuredImg } = usePosts();

// //   useEffect(() => {
// //     fetchPosts();
// //     fetchCategories()
// //     //eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const featuredPosts = posts
// //   .filter(post => post.categories && post.categories.includes('Featured')).slice(-3);

// //   return (
// //     <div style={{ maxWidth: "90%", margin: "auto" }}>
// //       {featuredPosts.map((post, index) => (
// //         <div key={index} className="DisplayPostZigZag">
// //           {featuredImg && featuredImg.length > 0 && (
// //             <>
// //               {featuredImg.map(
// //                 (img) =>
// //                   img.post === post.id && (
// //                     <img
// //                       key={img.id}
// //                       src={img.url}
// //                       alt="Featured"
// //                       className=""
// //                     />
// //                   )
// //               )}
// //             </>
// //           )}
// //           <h2
// //             style={{
// //               margin:"auto"
// //             }}
// //           >
// //             <Link to={`/posts/${post.id}`}>
// //               <h2>{post.title}</h2>
// //             </Link>
// //           </h2>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Carousel } from "react-bootstrap";
// import { usePosts } from "../../context/PostContext";

// export default function FeaturedIndex() {
//   const { postId, posts, fetchPosts, fetchCategories, featuredImg } = usePosts();

//   useEffect(() => {
//     fetchPosts();
//     fetchCategories();
//     //eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const featuredPosts = posts.filter((post) => post.categories && post.categories.includes('Featured')).slice(-3);

//   return (
//     <div style={{ maxWidth: "90%", margin: "auto" }}>
//       <Carousel>
//         {featuredPosts.map((post, index) => (
//           <Carousel.Item key={index}>
//             {featuredImg && featuredImg.length > 0 && (
//               <>
//                 {featuredImg.map((img) => (
//                   img.post === post.id && (
//                     <img key={img.id} src={img.url} alt="Featured" className="d-block w-100" />
//                   )
//                 ))}
//               </>
//             )}
//             <Carousel.Caption>
//               <h3>
//                 <Link to={`/posts/${post.id}`}>{post.title}</Link>
//               </h3>
//             </Carousel.Caption>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { usePosts } from "../../context/PostContext";

export default function FeaturedIndex() {
  const { posts, fetchPosts, fetchCategories, featuredImg } = usePosts();
  const [currentPostIndex, setCurrentPostIndex] = useState(0); 

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featuredPosts = posts.filter((post) => post.categories && post.categories.includes('Featured')).slice(-3);

  const handleCarouselSelect = (selectedIndex) => {
    setCurrentPostIndex(selectedIndex); 
  };

  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}>
      <Carousel activeIndex={currentPostIndex} onSelect={handleCarouselSelect}>
        {featuredPosts.map((post, index) => (
          <Carousel.Item key={index}>
            {featuredImg && featuredImg.length > 0 && (
              <>
                {featuredImg.map((img) => (
                  img.post === post.id && (
                    <img key={img.id} src={img.url} alt="Featured" className="d-block w-100" />
                  )
                ))}
              </>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {featuredPosts.length > 0 && (
          <Link to={`/posts/${featuredPosts[currentPostIndex].id}`}>
            <h3>{featuredPosts[currentPostIndex].title}</h3>
          </Link>
        )}
      </div>
    </div>
  );
}
