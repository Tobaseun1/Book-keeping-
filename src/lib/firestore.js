import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const DEFAULT_PROFILE = {
    businessName: "My Business",
    businessDescription: "",
    currency: "NGN",
    startingBalance: 0,
    categories: [],
    savingsTarget: null,
    savingsTargets: [],
};

export function userDocRef(uid) {
    return doc(db, "users", uid);
}

export function subscribeToProfile(uid, callback) {
    return onSnapshot(userDocRef(uid), (snapshot) => {
        callback({ ...DEFAULT_PROFILE, ...snapshot.data() });
    });
}

export function saveProfile(uid, data) {
    return setDoc(userDocRef(uid), data, { merge: true });
}

export function subscribeToTransactions(uid, callback) {
    const transactionsQuery = query(
        collection(db, "users", uid, "transactions"),
        orderBy("date", "desc")
    );

    return onSnapshot(transactionsQuery, (snapshot) => {
        callback(
            snapshot.docs.map((docSnapshot) => ({
                id: docSnapshot.id,
                ...docSnapshot.data(),
            }))
        );
    });
}

export function addTransaction(uid, transaction) {
    return addDoc(
        collection(db, "users", uid, "transactions"),
        transaction
    );
}

export function deleteTransaction(uid, transactionId) {
    return deleteDoc(
        doc(db, "users", uid, "transactions", transactionId)
    );
}

export function subscribeToInvoices(uid, callback) {
    const invoicesQuery = query(
        collection(db, "users", uid, "invoices"),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(invoicesQuery, (snapshot) => {
        callback(
            snapshot.docs.map((docSnapshot) => ({
                id: docSnapshot.id,
                ...docSnapshot.data(),
            }))
        );
    });
}

export function addInvoice(uid, invoice) {
    return addDoc(collection(db, "users", uid, "invoices"), invoice);
}

export function updateInvoice(uid, invoiceId, data) {
    return updateDoc(
        doc(db, "users", uid, "invoices", invoiceId),
        data
    );
}

export function deleteInvoice(uid, invoiceId) {
    return deleteDoc(doc(db, "users", uid, "invoices", invoiceId));
}
