// const {
//   firestore,realtime
// } = require("../../../firebase");


// module.exports = {
//   apicall: async (req, res) => {
//     // const { submitAssessId } = req.body;
//     let targetAssetTypes = ["assessments", "courses"];
//     let initQuery = "location";
//     let submittedAssess = firestore.collection(initQuery).doc("jabalpur_mall").collection("spots").doc("car park");
//     let submittedAssessSnapshot = await submittedAssess.get();
//     let finalresult = submittedAssessSnapshot.data();
//     let arrayres = finalresult.values;
//     arrayres.forEach(element => {
//       console.log(element);
//     });
//     // console.log(arrayres[0]);
//     return res.status(200).send(arrayres);
//   },
//   apiSet: async (req, res) => {

//     let confirmid2 = await firestore.collection("location").doc("jabalpur_mall").collection("spots").doc("car park").set({
//       "SeatDetails[2]": {
//         Name: "test4",
//         Mail: "fdfgdfg",
//         ContactNo: "8898989989"
//       }
//     }, {
//       merge: true
//     });

//     // let confirmid2 = await firestore.collection("location").doc("jabalpur_mall").collection("spots").doc("car park").update({
//     //   SeatDetails: firestore.FieldValue.arrayUnion({

//     //         Name: "test4",
//     //         Mail: "zzz@yyy.com",
//     //         ContactNo: "5432167890"
//     //       })
//     // }, {
//     //   merge: true
//     // });

//     // let confirmid2 =  firestore.collection("location").doc("jabalpur_mall").collection("spots").doc("car park");
//     // confirmid2.update(
//     //   'SeatDetails',realtime.firestore.FieldValue.arrayUnion({
//     //         Name: "test2",
//     //         Mail: null,
//     //         ContactNo: "5432167890"
//     //       })
//     // ).then(() => {
//     //   return documentRef.get();
//     // }).then(doc => {
//     //   // doc.get('array') contains field 'foo'
//     // });
//     return res.status(200).send(confirmid2);
//   },

//   apiUpdate: async (req, res) => {
//     let confirmid =  firestore.collection("location").doc("jabalpur_mall").collection("spots").doc("car park");
//     // console.log(confirmid);
//     await confirmid.update({
//       'SeatDetails.0': {
//         Name: "test3",
//         Mail: "zzz@yyy.com",
//         ContactNo: "5432167890"
//       }
//       },{
//         merge: true
//       })

//     return res.status(200).send(confirmid);
//   },
//   apiView:async(req,res)=>{
//     let submittedAssess = firestore.collection("location").doc("jabalpur_mall").collection("spots").doc("car park");
//     let submittedAssessSnapshot = await submittedAssess.get();
//     let finalresult = submittedAssessSnapshot.data();
//     finalresult.SeatDetails.forEach((instanc)=>{
//       console.log(instanc.Name);
//     })
//     return res.status(200).send(finalresult);
//   }
// }