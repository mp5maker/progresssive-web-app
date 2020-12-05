import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { register } from '../pwa/serviceWorker'


ReactDOM.render(<div>Hello vte.cx!</div>, document.getElementById('container'))
register()