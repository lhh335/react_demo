import dva from 'dva';
import './index.css';
import WS from './services/websocket';
import { browserHistory } from 'dva/router'
// 1. Initialize
const app = dva({
  history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));
app.model(require('./models/main'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
