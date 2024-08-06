import { useNavigate } from "react-router-dom";
import Register from "./register";

function withNavigation(Register) {
  return props => <Register {...props} navigate={useNavigate()} />;
}

export default withNavigation;
