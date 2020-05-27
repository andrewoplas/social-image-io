import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import ImageMapEditor from '../components/imagemap/ImageMapEditor';
import Title from './Title/Title';
import FlowContainer from './FlowContainer';

type EditorType = 'imagemap' | 'workflow' | 'flow';

interface IState {
  activeEditor?: EditorType;
}

class App extends Component<any, IState> {
  state: IState = {
    activeEditor: 'imagemap',
  };

  onChangeMenu = ({ key }) => {
    this.setState({
      activeEditor: key,
    });
  };

  renderEditor = (activeEditor: EditorType) => {
    switch (activeEditor) {
      case 'imagemap':
        return <ImageMapEditor />;
    }
  };

  render() {
    const { activeEditor } = this.state;
    return (
      <div className="rde-main">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="manifest" href="./manifest.json" />
          <link rel="shortcut icon" href="./favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
          <title>Social Image</title>
        </Helmet>
        <div className="rde-title">
          <Title />
        </div>
        <FlowContainer>
          <div className="rde-content">{this.renderEditor(activeEditor)}</div>
        </FlowContainer>
      </div>
    );
  }
}

export default App;
