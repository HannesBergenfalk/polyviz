import { Graph, toDot } from "ts-graphviz";
import { instance } from "@viz-js/viz";
import { Coord } from "media-overlay-library";


export const parseGraph = async (graph: Graph): Promise<Record<string, readonly [Coord, number]>> => {
    const viz = await instance()
    const dotString = toDot(graph)
    //console.log(dotString)
    const json = viz.renderJSON(dotString, { yInvert: true })
    //document.body.appendChild(viz.renderSVGElement(dotString))
    const [, height, width] = (json['bb'] as string).split(',').map(parseFloat)
    const nodes = (json['objects'] as Array<{ id: string, _draw_: [unknown, { rect: [number, number, number, number] }] }> | undefined ?? []).map(jsonNode => {
        const [x, y, size] = jsonNode._draw_[1].rect
        return { id: jsonNode.id, position: [x, y], size }
    })
    const bbSize = (width + height) / 2
    return nodes.reduce((result, node) => {
        const [x, y] = node.position
        const relativePos: Coord = [100 * x / width, 100 * y / height]
        const relativeSize = Math.max(1, Math.min(100 * node.size / bbSize, 25))
        result[node.id] = [relativePos, relativeSize]
        return result
    }, {})
}