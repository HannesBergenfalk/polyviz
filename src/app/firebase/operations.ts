import {
    collection,
    deleteDoc,
    doc,
    query,
    setDoc,
    updateDoc,
    writeBatch,
    onSnapshot,
    serverTimestamp,
    orderBy
} from "firebase/firestore"
import { getFirebase } from "./firebase"
import { Coord } from "media-overlay-library"
import { CuleBaseData, CuleData, CuleEdge, CuleNode } from "../types"

const { firestore } = getFirebase()

export const listenCuleMaps = (callback: (data: Array<CuleBaseData>) => void) => {
    const q = query(collection(firestore, "polyculeMaps"), orderBy('timestamp'))
    return onSnapshot(q, (querySnapshot) => {
        const docData = []
        querySnapshot.forEach((doc) => {
            docData.push({ id: doc.id, ...doc.data() } as CuleBaseData)
        })
        callback(docData)
    })
}

export const listenCuleMapData = (culeId: string, callback: (data: Partial<CuleData>) => void) => {
    const docRef = doc(collection(firestore, "polyculeMaps"), culeId)
    const nodesRef = query(collection(docRef, "nodes"), orderBy('timestamp'))
    const edgesRef = query(collection(docRef, "edges"))
    const unsubBase = onSnapshot(docRef, (culeBase) => {
        callback({ id: culeId, ...culeBase.data() })
    })
    const unsubNodes = onSnapshot(nodesRef, (querySnapshot) => {
        const nodes = []
        querySnapshot.forEach((doc) => {
            nodes.push({ id: doc.id, ...doc.data() } as CuleNode)
        })
        callback({ nodes })
    })
    const unsubEdges = onSnapshot(edgesRef, (querySnapshot) => {
        const edges = []
        querySnapshot.forEach((doc) => {
            edges.push({ id: doc.id, ...doc.data() } as CuleEdge)
        })
        callback({ edges })
    })
    return () => {
        unsubBase()
        unsubNodes()
        unsubEdges()
    }
}

interface NodeInput {
    culeId: string
    id?: string
    position: Coord
    name: string
    size: number
}
export const uddNode = async (input: NodeInput) => {
    const { culeId, id, ...rest } = input
    const nodeCol = collection(firestore, "polyculeMaps", culeId, "nodes")
    if (id === undefined) {
        const docRef = doc(nodeCol)
        await setDoc(docRef, {
            ...rest,
            timestamp: serverTimestamp()
        })
    } else {
        const docRef = doc(nodeCol, id)
        await updateDoc(docRef, {
            ...rest,
        })
    }
}

export const bulkUpdateNodes = async (
    culeId: string,
    data: ReadonlyArray<CuleNode>
) => {
    const batch = writeBatch(firestore)

    data.forEach((node) => {
        const { id, ...nodeProps } = node
        const docRef = doc(firestore, "polyculeMaps", culeId, "nodes", id)
        batch.update(docRef, nodeProps)
    })

    await batch.commit()
}

export const deleteNode = async (culeId: string, nodeId: string) => {
    const nodeCol = collection(firestore, "polyculeMaps", culeId, "nodes")
    deleteDoc(doc(nodeCol, nodeId))
}

interface EdgeInput {
    culeId: string
    id?: string
    from: string
    to: string
    label?: string
    width: number
    style: string
}

export const uddEdge = async (input: EdgeInput) => {
    const { culeId, id, ...rest } = input
    const edgeCol = collection(firestore, "polyculeMaps", culeId, "edges")
    const docRef = id !== undefined ? doc(edgeCol, id) : doc(edgeCol)
    await setDoc(docRef, {
        ...rest,
    })
}

export const deleteEdge = async (culeId: string, edgeId: string) => {
    const edgeCol = collection(firestore, "polyculeMaps", culeId, "edges")
    deleteDoc(doc(edgeCol, edgeId))
}

interface CuleInput {
    culeId?: string
    title: string
}

export const uddCule = async (input: CuleInput) => {
    const { culeId, title } = input
    const culeCol = collection(firestore, "polyculeMaps")
    if (culeId === undefined) {
        const docRef = doc(culeCol)
        await setDoc(docRef, {
            title,
            timestamp: serverTimestamp()
        })
    } else {
        const docRef = doc(culeCol, culeId)
        await setDoc(docRef, {
            title,
        })
    }
}

export const deleteCule = async (culeId: string) => {
    const docRef = doc(firestore, "polyculeMaps", culeId)
    updateDoc(docRef, {
        hidden: true,
    })
}
