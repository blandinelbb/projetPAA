import React from "react";
import { useParams } from "react-router-dom";

const withRouter = (WrappedCompenent) => (props) => {
  const params = useParams();
  return <WrappedCompenent {...props} params={params} />;
};

export default withRouter;
