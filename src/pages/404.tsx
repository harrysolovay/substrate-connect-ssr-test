import { useRouter } from "next/router";
import * as React from "react";

const FourOFour: React.FC = () => {
  const { asPath } = useRouter();

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>
        The route <code>{asPath}</code> does not exist.
      </p>
    </div>
  );
};
export default FourOFour;
