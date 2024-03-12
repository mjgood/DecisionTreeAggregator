/*!
 * decisionTreeAggregator - demo
 * Copyright(c) 2024 Michael Good
 * MIT Licensed
 */

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const decisionTreeFromFlatJson = function(tree) {
    for (let key in tree) {
        tree[key].items = [];
    }
    for (let key in tree) {
        if (tree[key].parent != "root") {
            tree[tree[key].parent].items.push(tree[key]);
        }
    }

    tree = Object.keys(tree).filter((id) => { return tree[id].parent == "root"; }).map((id) => { return tree[id]; });
    return tree;
}

const itemSize = {
    "apple" : 6,
    "banana" : 8,
    "bowl of cereal" : 10,
    "crouton" : 1,
    "hash browns" : 9,
    "orange" : 7,
    "pancake" : 11,
    "potato chip" : 2,
    "toast" : 5
}
const itemTaste = {
    "apple" : 8,
    "banana" : 7,
    "bowl of cereal" : 11,
    "crouton" : 2,
    "hash browns" : 10,
    "orange" : 6,
    "pancake" : 9,
    "potato chip" : 3,
    "toast" : 1
}

const traverseTree = function(branch) {
    console.log(branch);
    let items = branch.items.map((leaf) => { return traverseTree(leaf) }).flat();

    switch (branch.type) {
        case "filter" :
            switch (branch.filter) {
                case "largest" : 
                    items = items.sort((a, b) => { return itemSize[a] < itemSize[b] ? 1 : -1; });
                    break
                case "tastiest" :
                    items = items.sort((a, b) => { return itemTaste[a] < itemTaste[b] ? 1 : -1; });
                    break;
                default :
                    throw new Error(`${branch.title} at id ${branch.id} has unrecognized filter ${branch.filter}`);
            }

            if (items.length > 0) {
                items = items[0];
            }

            break;
        case "condition" :
            let d = new Date();
            let day = weekday[d.getDay()];

            if (eval(branch.condition) != true) {
                items = [];
            }

            break;
        case "item" :
            items.push(branch.item);
            break;
        case "list" :
            items = items.concat(branch.list);
            break;
        default :
            throw new Error(`${branch.title} at id ${branch.id} has unrecognized type ${branch.type}`);
    }

    return items;
}

const exampleEvaluator = function(tree) {
    tree = decisionTreeFromFlatJson(tree);
    console.log(tree);

    let d = new Date();
    let day = weekday[d.getDay()];

    let items = traverseTree(tree[0]);

    alert(items);
}