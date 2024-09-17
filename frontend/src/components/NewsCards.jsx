import React from "react";

function NewsCards(props) {
  return (
    <div className="everything-card mt-20  mr-2">
      <div className="everything-card flex flex-wrap p-10 pb-4 gap-1 mb-5">
        <b className="title">{props.title}</b>
        <div className="everything-card-img mx-auto">
          <img className="everything-card-img" src={props.image} alt="img" />
        </div>
        <div className="description">
          <p className="description-text leading-7">
            {props.description?.substring(0, 100)}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source: </span>
            <a
              href={props.url}
              target="_blank"
              className="link underline break-words"
            >
              {props.source.substring(0, 50)}
            </a>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author: </span>
              {props.author}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At: </span>
              ({props.publishedAt})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCards;