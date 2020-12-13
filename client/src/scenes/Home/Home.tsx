import React from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import Banner from '../../components/Banner/Banner';

import '../../static/style.ts';

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
          <div className="home-wrapper container">
            <Banner isMobile={this.state.isMobile} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
