const signUpHTML = `
  <div class="container">
    <div class="row">
      <div class="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2"></div>
      <div class="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8">
        <div class="sign-up-container">
          <div class="sign-up">Sing Up</div>
          <div class="sign-form">
            <form action="#" method="get">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="fas fa-user input-group-text" id="inputGroup-sizing-default"></span>
                </div>
                  <input type="text" class="form-control" placeholder="Username" required id="name">
              </div>
              <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="fas fa-user input-group-text" id="inputGroup-sizing-default"></span>
              </div>
                <input type="text" class="form-control" placeholder="Secondname" required id="secondname">
              </div>
              <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="fas fa-envelope input-group-text" id="inputGroup-sizing-default"></span>
              </div>
                <input type="email" class="form-control" placeholder="Email" required id="email">
              </div>
              <div class="input-group mb-3">
                <select class="custom-select" id="gender">
                  <option selected>Male</option>
                  <option>Female</option>
                </select>
                </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="fas fa-key input-group-text" id="inputGroup-sizing-default"></span>
                </div>
                  <input type="password" class="form-control" placeholder="Password" required id="pass">
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="AgreementCheck">
                <label class="custom-control-label" for="AgreementCheck">Conditions of Agreement</label>
              </div>
              <div class="submit-btn">
                <input class="btn btn-danger" type="button" id="submit-data" disabled value="Send">
              </div>

            </form>
          </div>
          <div id="error-message"></div>
        </div>

      </div>
      <div class="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2"></div>
    </div>
  </div>
`;

const companyHTML = `
  <div class="container">
    <div class="row company-container" id='first-company-blocks'>

      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 company-blocks">
        <div class="card">
          <div class="card-header">
            Total Companies
          </div>
          <div class="loader-container-company">
            <div class="loader-company"></div>
          </div>
          <div class="card-body card-body-circle" id="card-body-circle">

            <div class="circle" id="circle">
            <!--this is for companies counter-->
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 company-blocks">
        <div class="card">
          <div class="card-header">
            List of Companies
          </div>
          <div class="loader-container-company">
            <div class="loader-company"></div>
          </div>
          <div class="card-body list-of-companies" id="list-of-companies">

          </div>
        </div>
      </div>
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 company-blocks hide-this" id="partner">
        <div class="card">
          <div class="card-header">
            <div>
            Company Partners
            </div>
            <div class="partners-filters">
              <b>Sort by:</b> <span id="name-filter">Name <i class="fas fa-long-arrow-alt-up"></i></span>  <span id="percentage-filter">Percentage <i class="fas fa-long-arrow-alt-up"></i></span>
            </div>
          </div>
          <div class="card-body card-body-partners" id="card-body-partners">
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 company-blocks">
        <div class="card">
          <div class="card-header">
            <div>
              Companies by Location
            </div>
            <div>
              <span id="back-to-chart"><i class="fas fa-arrow-left"></i></span>
            </div>
          </div>

          <div class="loader-container-company">
            <div class="loader-company"></div>
          </div>
          <div class="card-body list-of-companies" id="location-info">
          </div>
          <div class="location-flex-container">
            <div class="card-body pie-container" id="companies-location">
              <div class="pieID pie">

              </div>

            </div>
          </div>
      </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 company-blocks">
        <div class="card">
          <div class="card-header">
            <div>
              News
            </div>
            <div id="slider-navigation">
              <span id="slider-prev"><i class="fas fa-chevron-left"></i></span>
              <span id="slider-next"><i class="fas fa-chevron-right"></i></span>
            </div>
          </div>
          <div class="loader-container-news">
            <div class="loader-news"></div>
          </div>
          <div class="card-body list-of-companies news-slider" id="news">

          </div>
        </div>
      </div>
    </div>
  </div>
`;

export {
  companyHTML,
  signUpHTML,
};
