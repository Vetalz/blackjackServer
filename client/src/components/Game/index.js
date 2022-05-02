import {connect} from "react-redux";
import Game from "./Game";
import {result, loading, fetched} from "../../store/reducer/selectors"
import {getGame} from "../../store/reducer/actions";
import {createStructuredSelector} from "reselect";

const mapStateToProp = createStructuredSelector({
  result,
  loading,
  fetched
})

const mapDispatchToProps = {
  getGame
}

export default connect(mapStateToProp, mapDispatchToProps)(Game);