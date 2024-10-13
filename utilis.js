function reset() {
  window.location.reload();
}

function probabilityFunction(deck) {
    let arr = [...deck]
    let zeroArr = [];
    let oneArr = [];
    let twoArr = [];
    let threeArr = [];
    let stressArr = [];
    let heatArr = [];
    let fourArr = [];
    let fiveArr = [];
  
    let count = arr.length;
  
    arr.forEach((item) => {
      if (item.name == "heat") {
        heatArr.push(item);
      }
      if (item.name == "one") {
        oneArr.push(item);
      }
      if (item.name == "zero") {
        zeroArr.push(item);
      }
      if (item.name == "two") {
        twoArr.push(item);
      }
      if (item.name == "three") {
        threeArr.push(item);
      }
      if (item.name == "four") {
        fourArr.push(item);
      }
      if (item.name == "five") {
        fiveArr.push(item);
      }
      if (item.name == "stress") {
        stressArr.push(item);
      }
    });
  
    // Now return the probability percentages
    return [
      (heatArr.length / count) * 100,
      (stressArr.length / count) * 100,
      (zeroArr.length / count) * 100,
      (oneArr.length / count) * 100,
      (twoArr.length / count) * 100,
      (threeArr.length / count) * 100,
      (fourArr.length / count) * 100,
      (fiveArr.length / count) * 100,
    ];
  }
  