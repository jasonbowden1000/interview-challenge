window.onload = () => {
  let chartContainer = document.getElementById("chartContainer");
  let dataPoints = JSON.parse(chartContainer.dataset.scrawl);

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme2",
    title: {
      text: "Opening Scrawl Lengths"
    },
    height: 400,
    axisX: {
      labelAutoFit: false,
      labelFontSize: 12,
      labelMaxWidth: 60,
      labelWrap: true
    },
    axisY: {
      minimum: 400,
      title: "Scrawl Length"
    },
    zoomEnabled: true,
    data: [{
      type: "column",
      dataPoints: dataPoints
    }]
  });

  chart.render();
};
