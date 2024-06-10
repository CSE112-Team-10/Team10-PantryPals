export async function AccountManager({ method, username, password, id }={}) {
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
  