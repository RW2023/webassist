const main = async () => {
    try {
        console.log("Sending request to http://localhost:3000/api/chat...");
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Who is your developer?" })
        });
        
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response body:", text);
            return;
        }

        const data = await response.json();
        console.log("Response Data:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
};
main();
