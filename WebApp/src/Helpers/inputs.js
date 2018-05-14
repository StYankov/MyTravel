export function handleInput(e, state) {
  const target = e.target;

  this.setState({
    [target.name]: target.value
  });
}

export function cleanArray(actual) {
  var newArray = [];
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
