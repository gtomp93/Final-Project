// const multiplayer = {
//   _id: 12345544,
//   locations: [
//     { lat: 0, lng: 0 },
//     { lat: 0, lng: 0 },
//     { lat: 0, lng: 0 },
//     { lat: 0, lng: 0 },
//     { lat: 0, lng: 0 },
//   ],
//   "gtompkins1993@gmail.com": {
//     gameStatus: { index: 1, gameMode: "guessMode" },
//     gameData: [
//       {
//         score: 4500,
//         distance: 5000,
//         polyline: [
//           { lat: 0, lng: 9 },
//           { lat: 0, lng: 9 },
//           { lat: 0, lng: 9 },
//         ],
//       },
//     ],
//   },
//   "gr321937@dal.ca": {
//     currentlocation: location3,
//     location1: 4500,
//     location2: 4400,
//     location3: "",
//     location4: "",
//     location5: "",
//     totalScore: 8900,
//   },
// };

var twoSum = function (nums, target) {
  console.log(nums, target);
  for (i = 0; i < nums.length; i++) {
    console.log("hello?");
    for (j = 0; j < nums.length; j++) {
      if (i !== j && nums[j] + nums[i] === target) {
        return [i, j];
      }
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9));
