import {connect} from "react-redux";
import Modal from "./Modal";
import {loading, result} from "../../store/reducer/selectors";
import {restart} from "../../store/reducer/actions";
import {createStructuredSelector} from "reselect";

const mapStateToProps = createStructuredSelector({
  loading,
  result
})

const mapDispatchToProps = {
  restart
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);