Decision Tree Aggregator
opyright(c) 2024 Michael Good
MIT Licensed

This is a web-based tool for building Decision Trees that iterate through multiple sources of information, and
returns an array of all the items that match the given criteria. It is not designed to be a practical tool on its
own, but rather a starting point to building your own decision tree aggregator. The only file you should need to
get started adding this to your own application are decisionTreeEditor.js, though decisionTreeStyle.css is very
helpful to creating a base style. Decision Trees that are created are saved and loaded from JSON objects for easy
transporation and storage. The 'demo' folder contains a test implementation of the Decision Tree Aggregator, as 
well as a test parser with an example of how to rebuild the flattened JSON structure and traverse the decision
tree.