import React from "react";
import "./style.css";
function BreadCrumb(props) {
  const { data } = props;
  return (
    <div>
      <div className="col-12">
        <ul className="breadcrumb">
          {data.map((item,index)=>(
            <li className={`breadcrumb__item ${(index + 1) === data.length ? 'breadcrumb__item--active':''}`} key={`bread-${index}`}>
              {(index+1)===data.length ? <span>{item.title}</span> : <a href={item.page}>{item.title}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumb;
