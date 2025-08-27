import React from "react";
import { Link } from "react-router-dom";

const LinkTextButton: React.FC<LinkTextButton> = ({
  btnText,
  btnTextClass,
  btnClass,
  img,
  showImg,
  imgClass,
  onClick,
  linkTo,
  imgPosition = "left",
  isLoading = false,
  type = "button",
}) => {
  const imageElement = showImg && <img src={img} className={imgClass} alt="btn-icon" />;
  const textElement = <span className={btnTextClass}>{btnText}</span>;



  const content = (
    <div className="flex items-center gap-x-1 justify-center">
      {imgPosition === "left" ? (
        <>
          {imageElement}
          {textElement}
        </>
      ) : (
        <>
          {textElement}
          {imageElement}
        </>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className={`rounded-lg flex items-center justify-center cursor-pointer  ${btnClass}`}>
        {isLoading ? <Spinner /> : content}
      </Link>
    );
  }

  return (
    <button
      className={`rounded-lg flex items-center justify-center cursor-pointer ${btnClass}`}
      onClick={onClick}
      type={type}
    >
      {isLoading ? <Spinner /> : content}
    </button>
  );
};

export default LinkTextButton