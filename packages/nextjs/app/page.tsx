"use client";

// Correct import statements and proper use of the imports
import { useEffect, useState } from "react";
import { MyQueryDocument, MyQueryQuery, execute } from "../.graphclient";
import { ExecutionResult } from "graphql";
import type { NextPage } from "next";

const Home: NextPage = () => {
  // Use `useState` to handle the GraphQL query result, with proper typing
  const [result, setResult] = useState<ExecutionResult<MyQueryQuery>>();

  useEffect(() => {
    // Execute the GraphQL query when the component mounts
    execute(MyQueryDocument, {}).then(fetchedResult => {
      setResult(fetchedResult);
      console.log(fetchedResult);
    });
  }, []);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Query The Graph</span>
          </h1>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <ul>
            {/* Properly map through the transactions and swaps, handling potential undefined values */}
            {result?.data?.transactions.map(transaction =>
              transaction.swaps.map((swap, index) => (
                <li key={index}>
                  <div>Amount0: {swap?.amount0}</div>
                  <div>Amount1: {swap?.amount1}</div>
                  <div>USD Amount: {swap?.amountUSD}</div>
                  <div>Pool Token0: {swap?.pool.token0.name}</div>
                  <div>Pool Token1: {swap?.pool.token1.name}</div>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
