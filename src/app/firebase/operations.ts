import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    writeBatch,
} from "firebase/firestore"
import { getFirebase } from "./firebase"
import { Coord } from "media-overlay-library"
import { CuleNode } from "../types"

const { firestore } = getFirebase()

export const getCuleMaps = async () => {
    const q = query(collection(firestore, "polyculeMaps"))
    const querySnapshot = await getDocs(q)
    const docData = []
    querySnapshot.forEach((doc) => {
        docData.push({ id: doc.id, ...doc.data() })
    })
    return docData
}

export const getCuleMapData = async (culeId: string) => {
    const docRef = doc(collection(firestore, "polyculeMaps"), culeId)
    const nodesRef = query(collection(docRef, "nodes"))
    const edgesRef = query(collection(docRef, "edges"))
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const nodes = []
        const edges = []
        const nodesSnapshot = await getDocs(nodesRef)
        const edgesSnapshot = await getDocs(edgesRef)
        nodesSnapshot.forEach((doc) => {
            nodes.push({ id: doc.id, ...doc.data() })
        })
        edgesSnapshot.forEach((doc) => {
            edges.push({ id: doc.id, ...doc.data() })
        })
        return {
            ...docSnap.data(),
            id: culeId,
            edges,
            nodes,
        }
    }
}
interface NodeInput {
    culeId: string
    nodeId?: string
    position: Coord
    name: string
    size: number
}
export const uddNode = async (input: NodeInput) => {
    const { culeId, nodeId, ...rest } = input
    const nodeCol = collection(firestore, "polyculeMaps", culeId, "nodes")
    const docRef = nodeId !== undefined ? doc(nodeCol, nodeId) : doc(nodeCol)
    await setDoc(docRef, {
        ...rest,
    })
}

export const bulkUpdateNodes = async (
    culeId: string,
    data: ReadonlyArray<CuleNode>
) => {
    const batch = writeBatch(firestore)

    data.forEach((node) => {
        const { id, ...nodeProps } = node
        const docRef = doc(firestore, "polyculeMaps", culeId, "nodes", id)
        batch.set(docRef, nodeProps)
    })

    await batch.commit()
}

export const deleteNode = async (culeId: string, nodeId: string) => {
    const nodeCol = collection(firestore, "polyculeMaps", culeId, "nodes")
    deleteDoc(doc(nodeCol, nodeId))
}

interface EdgeInput {
    culeId: string
    edgeId?: string
    from: string
    to: string
    label?: string
    width: number
    style: string
}

export const uddEdge = async (input: EdgeInput) => {
    const { culeId, edgeId, ...rest } = input
    const edgeCol = collection(firestore, "polyculeMaps", culeId, "edges")
    const docRef = edgeId !== undefined ? doc(edgeCol, edgeId) : doc(edgeCol)
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
        collection(docRef, "nodes")
        collection(docRef, "edges")
        await setDoc(docRef, {
            title,
        })
        return
    }
    const docRef = doc(culeCol, culeId)
    await setDoc(docRef, {
        title,
    })
}

export const deleteCule = async (culeId: string) => {
    const docRef = doc(firestore, "polyculeMaps", culeId)
    updateDoc(docRef, {
        hidden: true,
    })
}
