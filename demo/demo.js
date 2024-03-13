/*!
 * decisionTreeAggregator - demo
 * Copyright(c) 2024 Michael Good
 * MIT Licensed
 */

const demo = {
    init : function() {
        decisionTreeEditor.opt.list = {
            html : function(id) {
                let listWrite = decisionTreeEditor.data.nodes[id].list;
                return `<div class="flex-row">list : ${`<div contenteditable="plaintext-only" onfocusout="demo.updateList(this)"><ul>${
                    (listWrite || [""]).map((item) => { return `<span>${item}</span>\n` }).join("")
                }</ul></div>`}</div>`;
            }
        }
    },

    updateList : function(element) {
        let list = element.textContent;
        list = list.split("\n");
        console.log(list);

        let nodeId = decisionTreeEditor.nodes.idFromElement(element);
        decisionTreeEditor.data.nodes[nodeId].list = list;
    },

    addNode : function() {
        let nodeType = document.getElementsByClassName('node-type-selected')[0].value;
        let dte = document.getElementsByClassName('decision-tree-editor')[0];
        if (nodeType?.trim() == "") {
            nodeType = null;
        }

        decisionTreeEditor.nodes.create(dte, nodeType);
    },
    saveTree : function () {
        alert("See console log for string saved to server")
        const json = JSON.stringify(decisionTreeEditor.data.nodes);
        console.log(json);
        // Here you can save the JSON structure to a file or send it to a server
    },

    loadTree : async function() {
        decisionTreeEditor.init(document.getElementsByClassName('decision-tree-editor')[0], demoModelData.nodes);
    },

    evaluateTree : function() {
        exampleEvaluator(decisionTreeEditor.data.nodes);
    }
}
