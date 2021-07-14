import React from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import "../style.css";
const breadCrumb = [
  { title: "Home", page: "/" },
  { title: "SignUp", page: "/" },
];

function SignUp(props) {
  return (
    <main className="main">
      <div className="container">
        <div className="row row--grid">
          {/* breadcrumb */}
          <BreadCrumb data={breadCrumb} />
          {/* end breadcrumb */}

          {/* sign in */}
          <div className="col-12">
            <div className="sign">
              <div className="sign__content">
                <form action="#" className="sign__form">
                  <a href="/" className="sign__logo">
                    <img src="assets/img/logo.svg" alt="" />
                  </a>

                  <div className="sign__group">
                    <input
                      type="text"
                      className="sign__input"
                      placeholder="Name"
                    />
                  </div>

                  <div className="sign__group">
                    <input
                      type="text"
                      className="sign__input"
                      placeholder="Email"
                    />
                  </div>

                  <div className="sign__group">
                    <input
                      type="password"
                      className="sign__input"
                      placeholder="Password"
                    />
                  </div>

                  <div className="sign__group sign__group--checkbox">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      defaultChecked
                    />
                    <label htmlFor="remember">
                      I agree to the{" "}
                      <a
                        href="assets/terms/BitCakeTermsOfService.pdf"
                        target="_blank"
                      >
                        Terms of Service
                      </a>
                    </label>
                  </div>

                  <button className="sign__btn" type="button">
                    Sign up
                  </button>

                  <span className="sign__text">
                    Already have an account? <a href="/signin">Sign in!</a>
                  </span>
                </form>
              </div>
            </div>
          </div>
          {/* end sign in */}
        </div>
      </div>
    </main>
  );
}
export default SignUp;
