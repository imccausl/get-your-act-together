# get-your-act-together

Dealing with asynchronousity in tests is hard. This is a playground with some example tests that throw act errors (and some that don't), to play around with techniques for debugging and fixing them.

To use the repo, make sure you have node 18+ installed and then:

1. `corepack enable`
2. `yarn`
3. `yarn test:watch`

With the test runner running in Watch mode, you can use `p` to isolate different tests such as "Debounce" to isolate the debounce examples, "RequestAnimationFrame" to isolate RAF examples, etc.
