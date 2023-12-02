async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
  
      // Check if the response status is in the 2xx range
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
      }
  
      const result = await response.json();
  
      if (result.errors) {
        const error = result.errors[0];
        // Handle GraphQL errors as needed
        throw new Error(`${error.message}`);
      }
  
      return result.data;
    } catch (error) {
      // Handle other errors (e.g., network issues, JSON parsing errors)
      console.error(`Error in sending data to server: ${error.message}`);
      throw error; // rethrow the error to indicate the failure
    }
  }
  
  export default graphQLFetch;
  