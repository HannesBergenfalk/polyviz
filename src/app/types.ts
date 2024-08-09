import { Coord } from "media-overlay-library"


export interface CuleNode {
    readonly position: Coord,
    readonly name: string
    readonly id: string
    readonly size: number
}

export enum LineStyle {
    solid = 'solid',
    dashed = 'dashed',
    dotted = 'dotted',
}

export interface CuleEdge {
    readonly id: string
    readonly from: string
    readonly to: string
    readonly label?: string
    readonly width: number
    readonly style: LineStyle
}

export type CuleData = {
    readonly id: string
    readonly title: string
    readonly nodes: ReadonlyArray<CuleNode>
    readonly edges: ReadonlyArray<CuleEdge>
}

export enum Mode {
    edit,
    add,
}

export interface CuleControlState {
    readonly activeMode: Mode
    readonly elementToEdit: SVGElement | null
    readonly edgeWidthOveride: number | null
    readonly nodeSizeOveride: number | null
    readonly newNodePosition: Coord | null
    readonly pan: Coord
    readonly zoom: number
}

export enum Sort {
    time,
    alpha,
    alphaReversed,
    timeReversed
}

