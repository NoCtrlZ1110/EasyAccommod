import React, { useEffect, useState } from "react";
import history from "../../services/history";
import "./notfound.css";

export const NotFound: React.FC = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let time = count;
      setCount(time - 1);
      if (!count) history.push("/");
    }, 1000);

    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <span className="notfound">
      <div className="error">404</div>
      <br />
      <br />
      <span className="info">
        Bạn sẽ được chuyển về trang chủ sau {count} giây!
      </span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        className="static"
        alt=""
      />
    </span>
  );
};
