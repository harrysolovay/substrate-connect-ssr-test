import * as smoldot from "@substrate/smoldot-light";
import { GetServerSideProps } from "next";
import * as React from "react";
import westendChainSpec from "../artifacts/westend.json" assert { type: "json" };

const getWestendMetadata = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const client = smoldot.start();
    const chain = await client.addChain({
      chainSpec: JSON.stringify(westendChainSpec),
      jsonRpcCallback: async (jsonRpcResponse) => {
        chain.remove();
        await client.terminate();
        const parsed = JSON.parse(jsonRpcResponse);
        if (!parsed.result) {
          reject();
        }
        resolve(parsed.result);
      },
    });
    chain.sendJsonRpc(JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "state_getMetadata",
      params: [],
    }));
  });
};

interface Props {
  westendMetadata: string;
  subscription: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // TODO: is there a way to re-instantiate a smoldot instance and resume in the browser?
  return {
    props: {
      westendMetadata: await getWestendMetadata(),
      subscription: "TODO",
    },
  };
};

const Index: React.FC<Props> = (props) => {
  return (
    <div>
      <div>
        <p>{props.westendMetadata}</p>
      </div>
    </div>
  );
};

export default Index;
