import {connect} from "react-redux";
import Dealer from "./Dealer";
import {loading} from "../../store/reducer/selectors";
import {hit, stand} from "../../store/reducer/actions";
import {createStructuredSelector} from "reselect";

const mapStateToProps = createStructuredSelector({
  loading,
})

const mapDispatchToProps = {
  hit,
  stand
}

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);