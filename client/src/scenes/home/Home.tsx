import React from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import Banner from '../../components/banner/Banner';

import '../../static/style.ts';
import { HomeUser } from '../home_user/HomeUser';

let isMobile: any;

enquireScreen((b: any) => {
  isMobile = b;
});

class Home extends React.PureComponent {
  state = {
    isMobile,
    isLogged: false,
  };
  componentDidMount() {
    enquireScreen((b: any) => {
      this.setState({
        isMobile: !!b,
      });
    });
    this.setState({ isLogged: localStorage.getItem('accessToken') !== null });
  }
  render() {
    if (this.state.isLogged) return <HomeUser />;
    else
      return (
        <DocumentTitle title='Easy Accommod'>
          <div>
            <div className='home-wrapper container'>
              <Banner isMobile={this.state.isMobile} />
            </div>
          </div>
        </DocumentTitle>
      );
  }
}

export default Home;
