import React from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";

import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import Page2 from "./Page2";
import Footer from "../../components/Footer/Footer";
import "../../static/style.ts";

let isMobile: any;

enquireScreen((b: any) => {
  isMobile = b;
});

class Home extends React.PureComponent {
  state = {
    isMobile,
  };
  componentDidMount() {
    enquireScreen((b: any) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  render() {
    return (
      <DocumentTitle title="Easy Accommod">
        <div>
          <Header />
          <div className="home-wrapper">
            <Banner isMobile={this.state.isMobile} />
            <Page2 />
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
