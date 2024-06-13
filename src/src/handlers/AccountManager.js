/**
 * This function invokes the aws lambda url and gets a result back.
 * The specific lambda function invoked is a the account managing system.
 * This includes login and account creation.
 * @param method There are four paths, addUser, deleteUser, verify, and getUserId.
 * @param username The username for the account.
 * @param password The password for the account.
 * @param id The unique id associated with each account. Generated in the server.
 * @returns '1' or '-1' to indicated the successfulness.
 */
export async function AccountManager({ method, username, password, id }) {
    const url = `https://az3u50k7ec.execute-api.us-east-2.amazonaws.com/${method}`;
    const options = {
      method: method === 'deleteUser' ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        method === 'deleteUser' ? { id:id } : { username:username, password:password }
      ),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  