Decision Tree Aggregator  
Copyright(c) 2024 Michael Good  
MIT Licensed

This is a web-based tool for building Decision Trees that iterate through multiple sources of information, and
returns an array of all the items that match the given criteria. It is not designed to be a practical tool on its
own, but rather a starting point to building your own decision tree aggregator. The only file you should need to
get started adding this to your own application are decisionTreeEditor.js, though decisionTreeStyle.css is very
helpful to creating a base style. Decision Trees that are created are saved and loaded from JSON objects for easy
transporation and storage. The 'demo' folder contains a test implementation of the Decision Tree Aggregator, as 
well as a test parser with an example of how to rebuild the flattened JSON structure and traverse the decision
tree.

This project was initially created to be used in an application for quickly building & testing automated investment model strategies. However, I'm
sure its potential use cases could extend beyond algo trading.

The demo implementation may be viewed live at https://htmlpreview.github.io/?https://github.com/mjgood/DecisionTreeAggregator/blob/master/demo/demo.html.
It looks like this:

![demo implementation screenshot](https://raw.githubusercontent.com/mjgood/DecisionTreeAggregator/master/demo/demoScreenshot.png)

The editor in the demo works in the following way:
<ul>
  <li>A node type is to be chosen for a node before a new node is created.</li>
  <li>Nodes may become sources for other nodes by clicking & dragging a node over the element to become a source node of.</li>
  <li>Added nodes are always children of the "root" node, and must be clicked & dragged over top of another node to become child criteria.</li>
</ul>

In the live demo, clicking on "Load Demo Tree" will show how such an editor may work.

For your own project, you would simply setup the decisionTreeEditor files comparably to how the demo sets up the decisionTreeEditor files, adding
your own types and backend logic as needed.
