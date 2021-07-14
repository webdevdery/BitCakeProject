import React from "react";
function Tabs(props) {
  const {historyData, bidsData, detail} = props;
  return (
    <>
      <ul className="nav nav-tabs asset__tabs" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-toggle="tab"
            href="#tab-1"
            role="tab"
            aria-controls="tab-1"
            aria-selected="true"
          >
            History
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="tab"
            href="#tab-2"
            role="tab"
            aria-controls="tab-2"
            aria-selected="false"
          >
            Bids
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="tab"
            href="#tab-3"
            role="tab"
            aria-controls="tab-3"
            aria-selected="false"
          >
            Details
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
          <div
            className="asset__actions asset__actions--scroll"
            id="asset__actions--scroll"
          >
            {historyData.map((data, index) => (
              <div
                className={`asset__action ${
                  data.verified === true ? "asset__action--verified" : ""
                }`}
                key={`history-${index}`}
              >
                <img src={data.avatar} alt="" />
                <p>
                  Bid placed for <b>{data.bnbPrice} BNB</b> 4 hours ago <br />
                  by <a href="/creator">{data.nickName}</a>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="tab-pane fade" id="tab-2" role="tabpanel">
          <div className="asset__actions">
            {bidsData.map((data, index) => (
              <div
                className={`asset__action ${
                  data.verified === true ? "asset__action--verified" : ""
                }`}
                key={`history-${index}`}
              >
                <img src={data.avatar} alt="" />
                <p>
                  Bid placed for <b>{data.bnbPrice} BNB</b> 4 hours ago <br />
                  by <a href="author">{data.nickName}</a>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="tab-pane fade" id="tab-3" role="tabpanel">
          <ul className="asset__authors asset__authors--tab">
            {detail.map((data, index) => (
              <li>
                <li key={`detail-${index}`}>
                  <span>Owner</span>
                  <div className="asset__author asset__author--verified">
                    <img src={data.avatar} alt="" />
                    <a href="/creator">{data.authorName}</a>
                  </div>
                </li>
                <li>
                  <span>Year created</span>
                  <p>{data.createdYear}</p>
                </li>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Tabs;