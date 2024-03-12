/*!
 * decisionTreeAggregator - demo
 * Copyright(c) 2024 Michael Good
 * MIT Licensed
 */

let demoModelData = {
    nodes : {
        3 : {
            title : "Node 3",
            type : "condition",
            condition : "day == 'Monday' || day == 'Tuesday'",
            parent : 1,
            id : 3
        },
        0 : {
            title : "Node 0",
            type : "filter",
            filter : "tastiest",
            parent : "root",
            id : 0,
        },
        1 : {
            title : "Node 1",
            type : "filter",
            filter : "largest",
            parent : 0,
            id : 1,
        },
        2 : {
            title : "Node 2",
            type : "item",
            item : "banana",
            parent : 1,
            id : 2
        },
        44 : {
            title : "Node 4",
            type : "list",
            list : ["potato chip","pancake","hash browns"],
            parent : 3,
            id : 44
        },
        55 : {
            title : "Node 5",
            type : "condition",
            condition : "day == 'Wednesday' || day == 'Thursday'",
            parent : 1,
            id : 55
        },
        60 : {
            title : "Node 6",
            type : "list",
            list : ["toast","crouton","bowl of cereal"],
            parent : 55,
            id : 60
        },
        70 : {
            title : "Node 7",
            type : "item",
            item : "apple",
            parent : 0,
            id : 70
        },
        80 : {
            title : "Node 8",
            type : "item",
            item : "orange",
            parent : 0,
            id : 80
        }
    }
}