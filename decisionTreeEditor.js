/*!
 * decisionTreeAggregator
 * Copyright(c) 2024 Michael Good
 * MIT Licensed
 */

const decisionTreeEditor = {
    data : {
        nodes : {},
        types : []
    },
    opt : {
    },
    nodes : {
        create : function(element, type, id) {
            // test if this is a new item, and if it is, create a new node
            if (id == null) {
                id = Math.max.apply(null, Object.keys(decisionTreeEditor.data.nodes).map((k) => { return parseInt(k) })) + 1;
                id = (id < 0 ? 0 : id);
    
                decisionTreeEditor.data.nodes[id] = ({ 
                    "id" : id,
                    "title" : `Node ${id}`,
                    "parent" : "root",
                    "type" : type,
                    "new" : true
                });
            }

            // get the node to work with from the provided / newly created id
            let nodeData = decisionTreeEditor.data.nodes[id];
            type ??= nodeData.type;

            // rendered node html
            const node = document.createElement('div');
            node.className = 'dte-node';
            node.innerHTML = `<div class="dte-node-content" show="title" type="${type}">
                <button class="expand-hide-content" onclick="decisionTreeEditor.nodes.options.showHide(this)">⯈</button> 
                <div class="dte-content-main">
                    <label class="title" contenteditable="plaintext-only" 
                        onfocusout="decisionTreeEditor.nodes.options.updateTitle(this)">${nodeData.title}</label>
                    <div class="dte-options">${decisionTreeEditor.opt[type]?.html ? decisionTreeEditor.opt[type].html(id)
                        : `${type} : <span contenteditable="plaintext-only"
                        onfocusout="decisionTreeEditor.nodes.options.updateOptions(this)">${nodeData[type] || ""}</span>`}
                    </div>
                </div>
                <div class="dte-content-main"></div>
                <button class="remove-node" onclick="decisionTreeEditor.nodes.options.remove(this)">🗑</button> 
            </div>`;
            node.draggable = true;
            node.id = `dte-node-${id}`;
        
            // add drag & drop listeners to this node
            node.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', node.id);
                event.stopPropagation();
            });
        
            node.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
        
            node.addEventListener('drop', (event) => {
                event.preventDefault();
                const id = event.dataTransfer.getData('text/plain');

                let draggedToNode = event.toElement;
                let draggedNode = document.getElementById(id);

                if (!draggedToNode.classList.contains(".dte-node")) {
                    draggedToNode = draggedToNode.closest(".dte-node");
                }

                let nodeId = id.substring(id.lastIndexOf("-") + 1);
                let nodeParentId = draggedToNode.id;
                nodeParentId = nodeParentId.substring(nodeParentId.lastIndexOf("-") + 1);
                decisionTreeEditor.data.nodes[nodeId].parent = nodeParentId;

                draggedToNode.appendChild(draggedNode);
            });
        
            // add this node to the provided DOM element
            element.appendChild(node);
            return node;
        },
        idFromElement : function(element) {
            let nodeId = (element.className.split(" ").includes("dte-node") ? element.id : element.closest(".dte-node").id);
            nodeId = nodeId.substring(nodeId.lastIndexOf("-") + 1);
            return nodeId;
        },
        options : {
            updateTitle : function(element) {
                let title = element.textContent;
                let nodeId = decisionTreeEditor.nodes.idFromElement(element);
                decisionTreeEditor.data.nodes[nodeId].title = title;
            },
            updateOptions : function(element) {
                let options = element.textContent;
                let nodeId = decisionTreeEditor.nodes.idFromElement(element);      
                let nodeType = element.closest(".dte-node-content").getAttribute("type");
                decisionTreeEditor.data.nodes[nodeId][nodeType] = options;
            },
            showHide : function(element) {
                let currentShowing = element.closest(".dte-node-content").getAttribute("show");
                if (currentShowing == "title") {
                    element.closest(".dte-node-content").setAttribute("show", "content");
                    element.innerHTML = "⯆";
                }
                else if (currentShowing == "content") {
                    element.closest(".dte-node-content").setAttribute("show", "title");
                    element.innerHTML = "⯈";
                }
            },
            remove : function(element) {
                if (!element.className.split(" ").includes("dte-node")) {
                    element = element.closest(".dte-node");
                }

                // remove all children elements first
                Array.from(element.children).forEach((child) => {
                    if (child.className.split(" ").includes("dte-node")) {
                        decisionTreeEditor.nodes.options.remove(child);
                    }
                });

                let nodeId = decisionTreeEditor.nodes.idFromElement(element);                
                delete decisionTreeEditor.data.nodes[nodeId];
                element.remove();
            }
        }
    },
    init : function(element, data) {  
        // set data if provided
        if (data) {
            decisionTreeEditor.data.nodes = data;
        }

        // reset html in case we're loading a new decision tree
        element.innerHTML = "";

        // create the nodes of the decision tree
        for (let id in decisionTreeEditor.data.nodes) {
            decisionTreeEditor.nodes.create(element, null, id);
        }
        // attach the nodes of the decision tree to their proper parents
        for (let id in decisionTreeEditor.data.nodes) {
            let { parent } = decisionTreeEditor.data.nodes[id];
            if (parent != "root") {
                let node = document.getElementById(`dte-node-${id}`);
                let attatchToNode = document.getElementById(`dte-node-${parent}`);
                attatchToNode.appendChild(node);
            }
        }
    }
}
