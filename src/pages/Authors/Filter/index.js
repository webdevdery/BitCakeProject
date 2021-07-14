import React from "react";
import Filter from "../../../components/Filter";
function AuthorFilter() {
  return (
  <div class="col-12">
    <div class="main__filter">
      <form action="#" class="main__filter-search">
        <input type="text" placeholder="Search for a creator…"/>
        <button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg></button>
      </form>

      <div class="main__filter-wrap">
        <select class="main__select" name="status">
          <option value="rating">By rating</option>
          <option value="views">By views</option>
          <option value="popularity">By popularity</option>
        </select>

        <select class="main__select" name="authors">
          <option value="0">All Creators</option>
          <option value="1">Verified only</option>
        </select>
      </div>
    </div>
  </div>
  );
}
export default AuthorFilter;