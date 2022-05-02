import {connect} from 'react-redux';
import Login from "./Login";
import {token} from "../../store/reducer/selectors";
import {createStructuredSelector} from "reselect";
import {login} from "../../store/reducer/actions";

const mapStateToProp = createStructuredSelector({
  token,
})

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProp, mapDispatchToProps)(Login);