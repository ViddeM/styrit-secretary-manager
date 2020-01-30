import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DebugHeader from "./DebugHeader";

const mapStateToProps = state => ({
    debug: state.root.init.debug
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps)(withRouter(DebugHeader));
