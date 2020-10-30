import React, { Component } from 'react';

import JSONEditorReact from './JSONEditorReact';
import './App.css';

const schema = {
  title: 'Example Schema',
  type: 'object',
  properties: {
    array: {
      type: 'array',
      items: {
        type: 'number'
      }
    },
    boolean: {
      type: 'boolean'
    },
    number: {
      type: 'number'
    }
  },
  required: ['array', 'string', 'boolean']
};

const json = {};
const F1 = 120
const modes = ['tree', 'form', 'view', 'code', 'text'];

class App extends Component {
  state = {
    schema,
    text: JSON.stringify(json, null, 2),
    mode: 'tree'
  };

  render() {
    return (
      <div className="app">
        <div className="contents">
          <JSONEditorReact
              schema={this.state.schema}
              text={this.state.text}
              mode={this.state.mode}
              modes={modes}
              indentation={4}
              onChangeText={this.onChangeText}
              onModeChange={this.onModeChange}
          />
          <div className="code">
            <pre>
              <code>
                {this.state.text}
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  onChangeText = (text) => {
    this.setState({ text });
  };

  onModeChangeSelect = (event) => {
    this.setState({ mode: event.target.value });
  };

  onModeChange = (mode) => {
    this.setState({ mode });
  };

  _handleKeyDown = (event) => {
    console.log(event.keyCode);
    if (event.keyCode == 120) {
      console.log(this.state.mode);
      if (this.state.mode === 'tree') {
        this.setState({ mode: 'code' });
        document.getElementsByClassName('ace_text-input')[0].focus();
      } else {
        this.setState({ mode: 'tree' });
      }
    }
  }

  // componentWillMount deprecated in React 16.3
  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this._handleKeyDown);
  }
  
}

export default App;
