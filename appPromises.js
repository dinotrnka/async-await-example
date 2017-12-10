const users = [{
  id: 1,
  name: 'Dino',
  schoolId: 101
}, {
  id: 2,
  name: 'Jessica',
  schoolId: 999
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 1,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  var user;
  return getUser(userId).then((tempuser) => {
    user = tempuser
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades
        .map((grade) => grade.grade)
        .reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class.`;
  });
};

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);            // Nothing else runs until this resolves or rejects
  const grades = await getGrades(user.schoolId); // Nothing else runs until this resolves or rejects

  let average = 0;

  if (grades.length > 0) {
    average = grades
      .map((grade) => grade.grade)
      .reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;
};

getStatus(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
})

getStatusAlt(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});

//
// SOME COMPARISON CODE:
//

// () => {
//   return new Promise((resolve, reject) => {
//     resolve('Mike');
//   });
// };
//
// const exactSameFunctionAsAbove = async (userId) => {
//   return 'Mike';
// };



// () => {
//   return new Promise((resolve, reject) => {
//     reject('This is a bad error');
//   });
// };
//
// const exactSameFunctionAsAbove = async (userId) => {
//   throw new Error('This is a bad error');
// };