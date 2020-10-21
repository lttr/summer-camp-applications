import { db } from '../firebase'

export function getApplicationsForEvent(eventId) {
  return db
    .collection('events')
    .doc(eventId)
    .collection('applications')
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs
        .map((x) => ({ id: x.id, ...x.data() }))
        .filter((x) => !x.deleted)
        .sort((a, b) => a.created.seconds - b.created.seconds)
    })
}
