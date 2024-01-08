import { React, useContext} from "react";
import style from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Card = ({
  data,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateProduct = () => {
    navigate(`/product/${data.id}`);
  };

  return (
    <>
      <div className={style.wrapper}>
        <img
          alt="room"
          className={style.roompic}
          src={`${process.env.REACT_APP_SQL_API}/${
            data && data.image
          }`}
          loading="lazy"
        />
        <div
          style={{
            // paddingRight:"5px",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            className={style.reservebtn}
            style={{ marginRight: "10px" }}
          >
            <button
              onClick={data ? navigateProduct : ''}
              className={style.viewMore}
            >
              View more
            </button>
          </span>
          <p
            className={style.address}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                fontFamily: "Helvetica Neue",
              }}
            >
              {data ? data.Title : ''}
            </span>
            <span
              style={{
                color: "black",
                fontFamily: "Helvetica Neue",
              }}
            >
              {data ? data.category : ""}
            </span>
          </p>
        </div>
        <p
          className={style.priceAndRate}
          style={{
            paddingRight: 0,
          }}
        >
            {data && data.price}
        </p>
      </div>
    </>
  );
};

export default Card;
