import React from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import "../style.css";
const breadCrumb = [
	{title:"Home",page:'/'},
	{title:"Signin",page:"/"},
];

function SignIn(props) {
  return (
  <main className="main">
		<div className="container">
			<div className="row row--grid">
				{/* breadcrumb */}
				<BreadCrumb data={breadCrumb}/>				
				{/* end breadcrumb */}

				{/* sign in */}
				<div className="col-12">
					<div className="sign">
						<div className="sign__content">
							{/* authorization form */}
							<form action="#" className="sign__form">
								<a href="/" className="sign__logo">
									<img src="assets/img/logo.svg" alt=""/>
								</a>

								<div className="sign__group">
									<input type="text" className="sign__input" placeholder="Email"/>
								</div>

								<div className="sign__group">
									<input type="password" className="sign__input" placeholder="Password"/>
								</div>

								<div className="sign__group sign__group--checkbox">
									<input id="remember" name="remember" type="checkbox" defaultChecked/>
									<label htmlFor="remember">Remember Me</label>
								</div>
								
								<button className="sign__btn" type="button">Sign in</button>

								<span className="sign__text">Don't have an account? <a href="signup">Sign up!</a></span>

								<span className="sign__text"><a href="/forgot">Forgot password?</a></span>
							</form>
							{/* end authorization form */}
						</div>
					</div>
				</div>
				{/* end sign in */}
			</div>
		</div>
	</main>
  );
  }
  export default SignIn;