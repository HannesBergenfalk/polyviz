import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { getFirebase } from "./firebase";
import { Coord } from "media-overlay-library"


const { firestore } = getFirebase()

export const getCuleMaps = async () => {
    const q = query(collection(firestore, "polyculeMaps"))
    const querySnapshot = await getDocs(q)
    const docData = []
    querySnapshot.forEach((doc) => {
        docData.push({ id: doc.id, ...doc.data() })
    });
    return docData
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
        ...rest
    })
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
        ...rest
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
    const docRef = culeId !== undefined ? doc(culeCol, culeId) : doc(culeCol)
    await setDoc(docRef, {
        title
    })
}

export const deleteCule = async (culeId: string) => {
    const docRef = doc(firestore, "polyculeMaps", culeId)
    updateDoc(docRef, {
        hidden: true
    })
}