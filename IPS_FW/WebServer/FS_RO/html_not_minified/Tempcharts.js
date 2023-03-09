
// Temperature Datasets
var TempLineChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    datasets: [{
        data: [],
        label: 'Heat Sink Temp',
        borderColor: window.chartColors.green,
        backgroundColor: window.chartColors.green, //'transparent',
        borderWidth: 0,
        fill: false,
        yAxisID: 'y-axis-1',
        cubicInterpolationMode: 'monotone',
        //lineTension: 0,
        pointRadius: 2,
        //pointHoverRadius: 15,
        pointStyle: //'circle',
                    'triangle',
                    //'rect',
                    //'rectRounded',
                    //'rectRot',
                    //'cross',
                    //'crossRot',
                    //'star',
                    //'line',
                    //'dash',
    }, {
        data: [],
        label: 'IS-Pad Temp',
        borderColor: '#575757', //window.chartColors.grey,
        backgroundColor: '#575757', //'transparent', //window.chartColors.blue,
        borderWidth: 0,
        fill: false,
        yAxisID: 'y-axis-2',
        cubicInterpolationMode: 'monotone',
        //lineTension: 0,
        pointRadius: 2,
        //pointHoverRadius: 15,
        pointStyle: //'circle',
                    //'triangle',
                    //'rect',
                    //'rectRounded',
                    'rectRot',
                    //'cross',
                    //'crossRot',
                    //'star',
                    //'line',
                    //'dash',
    }]
};

// General Chart configuration
var TempLineChartConfig = {
    data: TempLineChartData,
    options: {
        responsive: true,
        stacked: false,
        //hoverMode: 'index',

        title: {
            display: false,
            text: 'IPS IS-Pad & Heat Sink Temperature'
        },
      
        tooltips: {
            mode: 'nearest',
            intersect: false,
            cornerRadius: 2,
            backgroundColor: 'rgba(233, 91, 16, 0.85)', //'#E95B10', 
            borderColor: 'rgba(233, 91, 16, 0.85)', //'#E95B10',
            borderWidth: 0,
            titleFontColor: 'white', 
            titleFontStyle: 'normal',
            bodyFontColor: 'white',
            caretPadding: 0,
            usePointStyle: false,
            //multiKeyBackground: 'white',
            //mode: 'index',
            //bodyFontSize: 12,
            //caretSize: 5,
            //footerSpacing: 2,
            //footerMarginTop: 6,
            //rtl: true,
        },

        hover: {
            mode: 'nearest',
            intersect: false,
        },

        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                },
                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],

            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'HS Temperature [°C]'
                },
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                    suggestedMin: -10,
                    suggestedMax: 100,
                },
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'IS-Pad Temperature [°C]'
                },
                position: 'right',
                id: 'y-axis-2',
                ticks: {
                    suggestedMin: -10,
                    suggestedMax: 100,
                },

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    }
}


//
// This is the AJAX callback. This function creates the chart, after the AJAX function
// receives the data.
//
function _callback_hs(data_hs) {

    if (typeof (TempLineChart) !== "undefined") {

        let language = document.getElementById("lan").innerHTML.substring(0, 2); 

        if (language == "DE")
        {
            TempLineChartConfig.options.scales.xAxes[0].scaleLabel.labelString = "Zeit";
            TempLineChartConfig.options.scales.yAxes[0].scaleLabel.labelString = "KK Temperatur [°C]";
            TempLineChart.data.datasets[0].label = "Kühlkörper Temp";
        }
        else
        {
            TempLineChartConfig.options.scales.xAxes[0].scaleLabel.labelString = "Time";
            TempLineChartConfig.options.scales.yAxes[0].scaleLabel.labelString = "HS Temperature [°C]";
            TempLineChart.data.datasets[0].label = "Heat Sink Temp";
        }
        //
        // Heat-sink Temperature
        //
        TempLineChart.data.datasets[0].data = data_hs;
    
        console.log(TempLineChart.data.datasets[0].data);
    
        //TempLineChart.options.tooltips.destroy();
        //TempLineChart.reset();
        TempLineChart.update(0);
    }

}

//
//
//
function _ajaxGetHSTemp() {

    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        try {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            this.__user_callback__ = _callback_hs;
            //this.__user_callback__(this.responseText.split(',').map(Number));
            //document.getElementById("ajax-values").innerHTML = this.responseText;
            var json = JSON.parse(this.responseText);
            this.__user_callback__(json);
            //console.log(this.responseText);
            //console.log(this.response.split(',').map(Number));
        }
    }
    httpRequest.open('GET', '/GetHeatSinkTemp.cgi', true);
    httpRequest.send();
    //setTimeout(_ajaxGetHSTemp, 1000);
}

//
// Get Heat Sink Temperature every second
//
setInterval(_ajaxGetHSTemp, 1000);


//
// This is the AJAX callback. This function creates the chart, after the AJAX function
// receives the data.
//
function _callback_c(data_c) {

    if (typeof (TempLineChart) !== "undefined") {

        let language = document.getElementById("lan").innerHTML.substring(0, 2); 

        if (language == "DE")
        {
            TempLineChartConfig.options.scales.yAxes[1].scaleLabel.labelString = "IS-Pad Temperatur [°C]";
        }
        else
        {
            TempLineChartConfig.options.scales.yAxes[1].scaleLabel.labelString = "IS-Pad Temperature [°C]";
        }
        
        //
        // Heat-sink Temperature
        //
        TempLineChart.data.datasets[1].data = data_c;

        console.log(TempLineChart.data.datasets[1].data);

        //TempLineChart.options.tooltips.destroy();
        //TempLineChart.reset();
        TempLineChart.update(0);
    }
}

function _ajaxGetCTemp() {

    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        try {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            this.__user_callback__ = _callback_c;
            //this.__user_callback__(this.responseText.split(',').map(Number));
            //document.getElementById("ajax-values").innerHTML = this.responseText;
            var json = JSON.parse(this.responseText);
            this.__user_callback__(json);
            //console.log(this.responseText);
            //console.log(this.response.split(',').map(Number));
        }
    }
    httpRequest.open('GET', '/GetCoilTemp.cgi', true);
    httpRequest.send();
    //setTimeout(_ajaxCoilTemp, 1000);
}

//
// Get Coil Temperature every second
//
setInterval(_ajaxGetCTemp, 1000);
