import React from "react";
import AuthorMeta from "../../components/AuthorMeta";
const author = {avatar:"assets/img/avatars/avatar.jpg",authorName:'Adam Zapel',nickName:'@aaarthur', code:"XAVUW3sw3ZunitokcLtemEfX3tGuX2plateWdh", text:'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary', followers:3829};
const collections = [
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:false},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:false},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
  {bgimage:'assets/img/bg/bg-small.png',avatar:'assets/img/avatars/avatar3.jpg',name:'Hashmasks',number:'ERC-721',verified:true},
];
function Create() {
  return (
  <main className="main">
		<div className="main__author" data-bg="assets/img/bg/bg.png"></div>
		<div className="container">
			<div className="row row--grid">
				<div className="col-12 col-xl-3">
          <div className="author author--page">
            <AuthorMeta data={author}/>
          </div>
				</div>
        <div className="col-12 col-xl-9">
					{/* title */}
					<div className="main__title main__title--create">
						<h2>Create collectible item</h2>
					</div>
					{/* end title */}

					{/* create form */}
					<form action="#" className="sign__form sign__form--create">
						<div className="row">
							<div className="col-12">
								<h4 className="sign__title">Upload file</h4>
							</div>

							<div className="col-12">
								<div className="sign__file">
									<label id="file1" htmlFor="sign__file-upload">e. g. Image, Audio, Video</label>
									<input data-name="#file1" id="sign__file-upload" name="file" className="sign__file-upload" type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg"/>
								</div>
							</div>

							<div className="col-12">
								<h4 className="sign__title">Item details</h4>
							</div>

							<div className="col-12">
								<div className="sign__group">
									<label className="sign__label" htmlFor="itemname">Item name</label>
									<input id="itemname" type="text" name="itemname" className="sign__input" placeholder="e. g. 'Crypto Heart'"/>
								</div>
							</div>

							<div className="col-12">
								<div className="sign__group">
									<label className="sign__label" htmlFor="description">Description</label>
									<textarea id="description" name="description" className="sign__textarea" placeholder="e. g. 'After purchasing you will able to recived...'"></textarea>
								</div>
							</div>

							<div className="col-12 col-md-4">
								<div className="sign__group">
									<label className="sign__label" htmlFor="royalties">Royalties</label>
									<select id="royalties" name="royalties" className="sign__select">
										<option value="1">5%</option>
										<option value="2">10%</option>
										<option value="3">20%</option>
									</select>
								</div>
							</div>

							<div className="col-12 col-md-4">
								<div className="sign__group">
									<label className="sign__label" htmlFor="size">Size</label>
									<input id="size" type="text" name="size" className="sign__input" placeholder="e. g. Size"/>
								</div>
							</div>

							<div className="col-12 col-md-4">
								<div className="sign__group">
									<label className="sign__label" htmlFor="propertie">Propertie</label>
									<input id="propertie" type="text" name="propertie" className="sign__input" placeholder="Subject"/>
								</div>
							</div>

							<div className="col-12">
								<div className="sign__group sign__group--row">
									<ul className="sign__radio sign__radio--single">
										<li>
											<input id="type1" type="radio" name="type" defaultChecked/>
											<label htmlFor="type1">Put on sale</label>
										</li>
										<li>
											<input id="type2" type="radio" name="type"/>
											<label htmlFor="type2">Instant sale price</label>
										</li>
										<li>
											<input id="type3" type="radio" name="type"/>
											<label htmlFor="type3">Unlock one purchased</label>
										</li>
									</ul>
								</div>
							</div>

							<div className="col-12 col-xl-3">
								<button type="button" className="sign__btn">Create item</button>
							</div>
						</div>
					</form>
					{/* end create form */}
				</div>
				
			</div>		
		</div>
	</main>
  );
}
export default Create;