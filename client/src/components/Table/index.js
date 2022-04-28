import {connect} from "react-redux";
import Table from "./Table";
import {players, currentPlayer} from "../../store/reducer/selectors";
import {createStructuredSelector} from "reselect";

const mapStateToProps = createStructuredSelector({
  players,
  currentPlayer
})

export default connect(mapStateToProps)(Table)