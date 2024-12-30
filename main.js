const fs = require('fs');

// Get the JSON file path from the command-line arguments
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.error('Error: Please provide the path to the JSON file as a command-line argument.');
  process.exit(1);
}

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }

  try {
    // Parse the JSON data
    const users = JSON.parse(data);

    if (!Array.isArray(users)) {
      console.error('Error: The JSON file must contain an array of user objects.');
      process.exit(1);
    }

    // Perform operations on the users data

    // 1. Print the total number of users
    console.log(`Total number of users: ${users.length}`);

    // 2. Find the user with the highest score and print their details
    const highestScoreUser = users.reduce((prev, current) => (prev.score > current.score ? prev : current), {});
    console.log('User with the highest score:', highestScoreUser);

    // 3. Sort the users based on their scores in descending order
    users.sort((a, b) => b.score - a.score);

    // Write the sorted data back to the JSON file
    fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(`Error writing file: ${writeErr.message}`);
        process.exit(1);
      }
      console.log('Data sorted and written back to the JSON file.');
    });
  } catch (parseErr) {
    console.error(`Error parsing JSON: ${parseErr.message}`);
    process.exit(1);
  }
});
