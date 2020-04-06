export const getData = () => {
  var address = "http://localhost:9888/api/GetServerNowUser ";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          workers: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaFirst = () => {
  var address = "http://localhost:9888/scrap/getcoronadata1";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaSecond = () => {
  var address = "http://localhost:9888/scrap/getcoronadatakorea";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaThird = () => {
  var address = "http://localhost:9888/scrap/getcoronamanwomanage";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaMain = () => {
  var address = "http://localhost:9888/scrap/getcoronarealtime";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaMainSub = () => {
  var address = "http://localhost:9888/scrap/getworldrealtimelist";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaWorldNewDailyList = () => {
  var address = "http://localhost:9888/scrap/worldnewdailylist";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaWorldNewDailyListByContinent = () => {
  var address = "http://localhost:9888/scrap/worldnewdailylistbycontinent";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaWorldNewDailyListSummary = () => {
  var address = "http://localhost:9888/scrap/worldnewdailylistsummary";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaWorldroylab = () => {
  var address = "http://localhost:9888/scrap/getworlddatabyroylab";

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};

export const getCoronaWorldroylabname = (name) => {
  var address =
    "http://localhost:9888/scrap/getworlddatabyroylabbyname/" + name;

  let promise = new Promise((resolve) => {
    fetch(address)
      .then((results) => results.json())
      .then((jsonData) => {
        //console.log("jsondata");
        //console.log(jsonData);

        resolve({
          coronadata: jsonData,
        });
      })
      .then((data) => {
        console.log("fetch then-- data", data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  });
  return promise;
};
