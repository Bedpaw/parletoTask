const groupBy =
  function(data, key) {
    return data.reduce((storage, item) => {
      let group = item[key];

      storage[group] = storage[group] || [];
      storage[group].push(item);
      return storage;
    }, {});
  };

const sumByKey = function (data, key){
  return data.map(item => item[key])
              .reduce((total, curr) => total + parseFloat(curr), 0)
}
const remove = function (data, item) {
  const index = data.indexOf(item);
  if (index > -1) {
    data.splice(index, 1);
  }
}

export const arrayUtils = {
  groupBy,
  sumByKey,
  remove
}

