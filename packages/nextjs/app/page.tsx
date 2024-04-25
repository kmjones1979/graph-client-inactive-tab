"use client";

// Updated import statements and proper use of the imports
import { useEffect, useState } from "react";
import { MyQueryDocument, MyQueryQuery, subscribe } from "../.graphclient";
import { ExecutionResult } from "graphql";
import type { NextPage } from "next";

const Home: NextPage = () => {
  // Initialize `useState` to handle the GraphQL query result with proper typing and default value
  const [result, setResult] = useState<ExecutionResult<MyQueryQuery> | null>(null);

  useEffect(() => {
    // Define an async function to handle the subscription and fetching logic
    const fetchData = async () => {
      try {
        const fetchedResult = await subscribe(MyQueryDocument, {});
        if ("data" in fetchedResult) {
          setResult(fetchedResult);
        } else {
          for await (const result of fetchedResult) {
            setResult(fetchedResult);
            console.log(result);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData(); // Call the async function to fetch the data when the component mounts
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  return (
    <>
      <div></div>
    </>
  );
};

export default Home;
