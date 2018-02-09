import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import FieldArraysForm from './FieldArraysForm';

const dest = document.getElementById('content')
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer)
  
function postData(url, payload) {
  return (
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then((resp) => resp.json())
    .catch(error => console.error('Error1:', error))
  )
}

function postDataApply(url, payload, callback) {
  return (
    postData(url, payload)
    .then(function(json) {
      return (
        callback(json)
      )
    })
    .catch(error => console.error('Error1:', error))
  )
}

// function getData(url) {
//   return (
//     fetch(url, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then((resp) => resp.text())
//     .catch(error => console.error('Error1:', error))
//   )
// }

// const showResults = values =>
//   new Promise(resolve => {
//     console.log(JSON.stringify(values));
//     // const url = 'https://skillsafari.io/wp-json/wp/v2/users/1';
//     // const url = 'http://kong-proxy.apps.ocp.iotaccelerator.org/get-python';
//     const url = 'http://kong-proxy.apps.ocp.iotaccelerator.org/apimashup';
//     // const url = 'http://kong-proxy.apps.ocp.iotaccelerator.org/echo';
//     postData(url, values)
//     .then(function(json) {
//       console.log(JSON.stringify(json));
//       window.alert(`Input:\n\n${JSON.stringify(values, null, 2)}\
//                 \n\nOutput:\n\n${JSON.stringify(json, null, 2)}`);
//     })
//     .catch(error => console.error('Error2:', error))

//     console.log(store.getState('fieldArrays'));

//     resolve();
//     // setTimeout(() => {
//     //   // simulate server latency
//     //   window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
//     //   resolve()
//     // }, 500)
//   })

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input: null,
      result: null
    };
    this.test = this.test.bind(this);
    this.apply_result = this.apply_result.bind(this);
  }
  apply_result(values) {
    this.setState(
      {result: values}
    );
  }
  test(values) {
    
    this.setState(
      {input: values}
    );
    const url = 'http://kong-proxy.apps.ocp.iotaccelerator.org/apimashup';
    // const url = 'http://kong-proxy.apps.ocp.iotaccelerator.org/echo';
    postDataApply(url, values, this.apply_result)
    // postData(url, values)
    // .then(function(json) {
    //   this.apply_result(json);
    //   // this.setState(
    //   //   {result: json}
    //   // );
    // })
    .catch(error => console.error('Error2:', error))


    // console.log("test\n", JSON.stringify(this.state.input, null, 2));
  }
  render() {
    return (
      <div align="center">
        <h2>API JSON Generator</h2>
        <FieldArraysForm onSubmit={this.test} />
        {
          this.state.input ?
            <div>
              <h3>Input:</h3>
              <pre className ='language-jsx'>{JSON.stringify(this.state.input, null, 2)}</pre>
            </div> :
            null
        }
        {
          this.state.result ?
          <div>
            <h3>Result:</h3>
            <pre className ='language-jsx'>{JSON.stringify(this.state.result, null, 2)}</pre>
          </div> :
          null
      }
      </div>
    )
  }
}

// let render = () => {
//   // const FieldArraysForm = require('./FieldArraysForm').default
//   ReactDOM.hydrate(
//     <Provider store={store}>
//       <div align="center">
//         <App />
//       </div>
//     </Provider>,
//     dest
//   )
// }

// if (module.hot) {
//   // Support hot reloading of components
//   // and display an overlay for runtime errors
//   const renderApp = render
//   const renderError = error => {
//     const RedBox = require('redbox-react')
//     ReactDOM.hydrate(<RedBox error={error} className="redbox" />, dest)
//   }
//   render = () => {
//     try {
//       renderApp()
//     } catch (error) {
//       renderError(error)
//     }
//   }
//   const rerender = () => {
//     setTimeout(render)
//   }
//   // module.hot.accept('./validate', rerender)
//   module.hot.accept('./FieldArraysForm', rerender)
// }

// render()



//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <div align="center">
      <App />
    </div>
  </Provider>,
  dest
)
registerServiceWorker();
