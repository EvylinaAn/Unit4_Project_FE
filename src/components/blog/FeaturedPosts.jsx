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
    <div style={{ maxWidth: "90%", margin: "auto", backgroundColor: 'rgb(228, 226, 226, 0.3)', marginTop:'0'}}>
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
      <div style={{padding: "2vmin", textAlign: "center" }}>
        {featuredPosts.length > 0 && (
          <Link to={`/posts/${featuredPosts[currentPostIndex].id}`}>
            <h2>{featuredPosts[currentPostIndex].title}</h2>
          </Link>
        )}
      </div>
    </div>
  );
}
