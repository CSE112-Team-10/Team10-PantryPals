/**
 * This functions invokes an aws funciton that sends an api call to 
 * OpenAI to generate an image based the recipe title.
 * @param title The title for the reipe
 * @returns A Base 64 encoding string of the image.
 */
export async function DalleE({title=''}={}) {
    const url = `https://kdtphck5le.execute-api.us-east-1.amazonaws.com/dev/image?title=${title}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        const body = data['body'].substring(1, data['body'].length-1);
        return body;
    } catch (error) {
        console.error('Error: ', error);
    }
}