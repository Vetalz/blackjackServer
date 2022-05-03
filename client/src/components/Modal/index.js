import {connect} from "react-redux";
import Modal from "./Modal";
import {loading, result, token} from "../../store/reducer/selectors";
import {restart} from "../../store/reducer/actions";
import {createStructuredSelector} from "reselect";

const mapStateToProps = createStructuredSelector({
  loading,
  result,
  token,
})

const mapDispatchToProps = {
  restart
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);