const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.createApplication = functions.firestore
  .document('/events/{eventId}/applications/{applicationId}')
  .onCreate(async (snapshot, context) => {
    const applicationsCollection = snapshot.ref.parent

    const applicationsSnapshot = await applicationsCollection.get()
    const count = applicationsSnapshot.size

    return snapshot.ref.set(
      {
        order: count,
        variableSymbol: variableSymbol(count),
      },
      { merge: true }
    )
  })

exports.resetApplicationsOrder = functions.https.onCall((data, context) => {
  admin.initializeApp(functions.config().firebase)
  admin
    .firestore()
    .collection('events')
    .doc(data.eventId)
    .collection('applications')
    .get()
    .then(querySnapshot => {
      const sortedApplications = querySnapshot.docs
        .map(x => {
          return { id: x.id, ...x.data() }
        })
        // @ts-ignore
        .filter(x => !x.deleted)
        // @ts-ignore
        .sort((a, b) => a.created.seconds - b.created.seconds)

      sortedApplications.forEach((application, index) => {
        querySnapshot.docs
          .find(doc => doc.id === application.id)
          .ref.set(
            {
              order: index + 1,
            },
            { merge: true }
          )
      })
    })
})

exports.generateVariableSymbols = functions.https.onCall((data, context) => {
  admin.initializeApp(functions.config().firebase)
  admin
    .firestore()
    .collection('events')
    .doc(data.eventId)
    .collection('applications')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc.ref.set(
          {
            variableSymbol: variableSymbol(doc.data().order),
          },
          { merge: true }
        )
      })
    })
})

function variableSymbol(order) {
  return '24' + order.toString().padStart(3, '0')
}
