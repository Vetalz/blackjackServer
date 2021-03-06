import {connect} from 'react-redux';
import App from "./App";
import {token} from "../../store/reducer/selectors";
import {createStructuredSelector} from "reselect";

const mapStateToProp = createStructuredSelector({
  token,
})

export default connect(mapStateToProp)(App);