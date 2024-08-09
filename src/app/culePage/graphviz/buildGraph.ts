import { CuleData } from "../../types";
import { Graph, GraphAttributesObject, NodeAttributesObject, Node, Edge } from "ts-graphviz";

const GRAPH_STYLE: GraphAttributesObject = {
    layout: 'neato',
    overlap: 'scalexy',
    sep: '+0.1',
    size: "10,10",
}

const NODE_STYLE: NodeAttributesObject = {
    shape: 'circle',
}

export const buildGraph = (data: CuleData, seed = 1): Graph => {
    const graph = new Graph({ ...GRAPH_STYLE, start: `random${seed}` });
    data.nodes.forEach((node, i) => {
        const nodeObject = new Node(node.id, {
            id: node.id,
            ...NODE_STYLE,
            width: node.size
        });
        graph.addNode(nodeObject);
    })
    data.edges.forEach(edge => {
        const edgeObject = new Edge([graph.getNode(edge.from), graph.getNode(edge.to)], {
            style: edge.style,
        });
        graph.addEdge(edgeObject);
    })
    return graph
}