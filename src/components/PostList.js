import React from "react";

export function PostList(props) {
  const { posts } = props;
  const renderPosts = () => {
    return posts.map((post, index) => (
      <div key={index} className="card rounded mt-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
             {/* add image */}
            <div>
              <h4 class="mb-0">{post.userName}</h4>
              <p class="text-muted mb-0">{post.date} &bull; {post.hikeName}</p>
            </div>
          </div>
          <div className="mt-3">
            <p>{post.review}</p>
            <div class="row no-gutters">
              <div class="col-6">
                {/* <img src="img/forest.jpg" style="width:100%" alt="Northern Lights" class="w3-margin-bottom"> */}
              </div>
              <div class="col-6">
                {/* <img src="img/mountain.jpg" style="width:100%" alt="Nature" class="w3-margin-bottom"> */}
              </div>
            </div>
            <div className="mt-3">
              <span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
          </div>
          <div className="mt-3">
            <button type="button" className="btn btn-outline-primary"><i class="fa fa-thumbs-up"></i> Like</button>
            <button type="button" className="btn btn-outline-secondary"><i class="fa fa-comment"></i> Comment</button>
          </div>
        </div>
      </div>
    ));
  };

  return <div className="col-md-7 mx-auto">{renderPosts()}</div>;
}

export default PostList;