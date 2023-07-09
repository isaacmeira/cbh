# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Overall explanation

The refactored version of the function breaks down the functionality into smaller helper functions, making the overall structure more understandable.

The getPartitionKey function is responsible for fetching the partition key from the event if it exists or creating a hash from the event itself. This encapsulates the logic for getting a potential partition key.

The ensureStringType function makes sure the candidate partition key is a string. If it isn't, it converts it to a JSON string.

The truncateKey function checks if the key's length is greater than the maximum allowed length. If it is, it hashes the key to reduce its length.

The main deterministicPartitionKey function now appears more readable because it describes a higher-level overview of the steps involved. This way of breaking the problem into smaller, more manageable parts is often called the "Single Responsibility Principle" in software engineering.

And, of course, it's way easier to make the unit tests and cover it all.