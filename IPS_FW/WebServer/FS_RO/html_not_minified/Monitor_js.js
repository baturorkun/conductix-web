var TempLineChart;
var PiLineChart;
var signedIn;


if (navigator.userAgent.indexOf("Firefox") != -1) {    //for Firefox
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", init, false)
    }
} else {
    // For other browsers
    window.onload = init();
}


function init() {

    initLanguage();
    signedIn = sessionStorage.getItem('access');
    console.log(signedIn);

    if (signedIn == null) {
        sessionStorage.setItem('access', "no");
        signedIn = sessionStorage.getItem('access');
    }
    console.log(signedIn);

    _ajaxGetStatusLEDs();
    _ajaxGetMonitorLiveData();
    _ajaxGetCpuErrors();
    _ajaxGetInvErrors();
    _ajaxGetWarnings();
    _ajaxGetCTemp();
    _ajaxGetHSTemp();
    _ajaxGetCurrent();
    _ajaxGetPower();
    _ajaxGetRTC();

    var ctx = document.getElementById('canvas-temp').getContext('2d');
    TempLineChart = new Chart.Line(ctx, TempLineChartConfig);
    window.myLine = TempLineChart;

    var ctxpi = document.getElementById('canvas-p-i').getContext('2d');
    PiLineChart = new Chart.Line(ctxpi, PiLineChartConfig);
    window.myLine = PiLineChart;

    if (signedIn == "no") {
        document.getElementById("Settings-href").href = "Settings_login.htm";
    }
}

/* STATUS LED */
function _ajaxGetStatusLEDs() {
    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
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
        if (this.readyState == 4) {
            if (this.status == 200) {
                var json = JSON.parse(this.responseText);
                //console.log(json);
                if (json[0][1] == 1) {
                    document.getElementById("r-led").className = "red-led-on";
                } else {
                    document.getElementById("r-led").className = "red-led-off";
                }
                if (json[1][1] == 1) {
                    document.getElementById("g-led").className = "green-led-on";
                } else {
                    document.getElementById("g-led").className = "green-led-off";
                }
                if (json[2][1] == 1) {
                    document.getElementById("b-led").className = "blue-led-on";
                } else {
                    document.getElementById("b-led").className = "blue-led-off";
                }
            }

            if (this.status == 404) {
                console.log("LEDs status can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/GetStatusLEDs.cgi', true);
    httpRequest.send();
    setTimeout(_ajaxGetStatusLEDs, 100);
}

//setInterval(_ajaxGetStatusLEDs, 100);

/* RTC REAL TIME CLOCK*/
function _ajaxGetRTC() {
    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
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
        if (this.readyState == 4) {
            if (this.status == 200) {
                var json = JSON.parse(this.responseText);
                document.getElementById("year").innerHTML = "20" + json[0].toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                document.getElementById("month").innerHTML = json[1].toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                document.getElementById("day").innerHTML = json[2].toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                document.getElementById("hour").innerHTML = json[3].toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                document.getElementById("min").innerHTML = json[4].toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                document.getElementById("sec").innerHTML = json[5].toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
            }

            if (this.status == 404) {
                console.log("RTC values can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/GetRTC.cgi', true);
    httpRequest.send();
    setTimeout(_ajaxGetRTC, 800);
}

//setInterval(_ajaxGetRTC, 800);


/* IPS WARNINGS */
var warnings = document.getElementById('warn-table');

function _ajaxGetWarnings() {
    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
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
        if (this.readyState == 4) {
            if (this.status == 200) {

                var json = JSON.parse(this.responseText);
                console.log(json);

                for (var i = 1; i < warnings.rows.length; i++) {
                    if (json[i][1] === 0) {
                        warnings.rows[i].cells[2].innerHTML =
                            '<span class="no-warning-square"></span>';
                    } else {
                        warnings.rows[i].cells[2].innerHTML =
                            '<span class="warning-square"></span>';
                    }
                }
            }

            if (this.status == 404) {
                console.log("Warnings can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/GetWarnings.cgi', true);
    httpRequest.send();
    setTimeout(_ajaxGetWarnings, 900);
}

//setInterval(_ajaxGetWarnings, 900);

/* CPU ERRORS */
var cpu_errors = document.getElementById('cpu-err-table');

function _ajaxGetCpuErrors() {
    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
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
        if (this.readyState == 4) {
            if (this.status == 200) {
                var json = JSON.parse(this.responseText);
                console.log(json);

                for (var i = 1; i < cpu_errors.rows.length; i++) {
                    if (json[i] === 0) {
                        cpu_errors.rows[i].cells[2].innerHTML =
                            '<span class="no-err-square"></span>';
                    } else {
                        cpu_errors.rows[i].cells[2].innerHTML =
                            '<span class="err-square"></span>';
                    }
                }
            }

            if (this.status == 404) {
                console.log("Error can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/GetCpuErrors.cgi', true);
    httpRequest.send();
    setTimeout(_ajaxGetCpuErrors, 1150);
}

//setInterval(_ajaxGetCpuErrors, 1150);

/* INVERTER ERRORS */
var inv_errors = document.getElementById('inv-err-table');

function _ajaxGetInvErrors() {
    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
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
        if (this.readyState == 4) {
            if (this.status == 200) {
                var json = JSON.parse(this.responseText);
                console.log(json);

                for (var i = 1; i < inv_errors.rows.length; i++) {
                    if (json[i] === 0) {
                        inv_errors.rows[i].cells[2].innerHTML =
                            '<span class="no-err-square"></span>';
                    } else {
                        inv_errors.rows[i].cells[2].innerHTML =
                            '<span class="err-square"></span>';
                    }
                }
            }

            if (this.status == 404) {
                console.log("Error can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/GetInvErrors.cgi', true);
    httpRequest.send();
    setTimeout(_ajaxGetInvErrors, 1100);
}

//setInterval(_ajaxGetInvErrors, 1100);

/* LIVE DATA*/
var logging_flg = false;
var start_logging;

function _ajaxGetMonitorLiveData() {
    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
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
        if (this.readyState == 4) {
            if (this.status == 200) {
                var json = JSON.parse(this.responseText);
                console.log(json);
                document.getElementById("v-out").innerHTML = (json[0][1] / 100).toFixed(1);
                document.getElementById("i-out").innerHTML = (json[1][1] / 100).toFixed(2);
                document.getElementById("p-out").innerHTML = json[2][1];
                document.getElementById("inv-dc-link-v").innerHTML = json[3][1];
                document.getElementById("rectified-mains-v").innerHTML = json[4][1];
                document.getElementById("mains-v-trms").innerHTML = json[5][1];
                document.getElementById("mains-v-freq").innerHTML = json[6][1];

                document.getElementById("heat-sink-t").innerHTML = json[7][1];
                document.getElementById("heat-sink-t-max").innerHTML = json[8][1];
                document.getElementById("coil-t").innerHTML = json[9][1];
                document.getElementById("coil-t-max").innerHTML = json[10][1];
                document.getElementById("cpu-app").innerHTML = json[11][1];
                document.getElementById("app-date-time").innerHTML = json[12][1] + "<span class='delta'> &#x029E5; </span>" + json[12][2];
                document.getElementById("cpu-bl").innerHTML = json[13][1];
                document.getElementById("bl-date-time").innerHTML = json[14][1] + "<span class='delta'> &#x029E5; </span>" + json[14][2];
                document.getElementById("dsp-app").innerHTML = json[15][1];
                document.getElementById("dsp-date-time").innerHTML = json[16][1] + "<span class='delta'> &#x029E5; </span>" + json[16][2];
                document.getElementById("dsp-bl").innerHTML = json[17][1];
                document.getElementById("dsp-bl-date-time").innerHTML = json[18][1] + "<span class='delta'> &#x029E5; </span>" + json[18][2];

                start_logging = json[19][1];

                if ((start_logging == 1) && (logging_flg == false)) { // Start logging if enabled

                    logging_flg = true;
                    setInterval(_ajaxGetLogsLiveData, json[20][1]);
                    if (lang == "DE") { // DE
                        var request = indexedDB.open("de_logs_ips", 1);
                        request.onerror = function (event) {
                            console.log('The database is opened failed');
                        }
                        request.onsuccess = function (event) {
                            db = request.result;
                            console.log('The database is opened successfully');
                        }
                        request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            if (!db.objectStoreNames.contains('ips_logs_de')) {
                                var objectStore = db.createObjectStore('ips_logs_de', {keyPath: 'DatumUndZeit'});
                            }
                        }
                    } else { // EN
                        var request = indexedDB.open("en_logs_ips", 1);
                        request.onerror = function (event) {
                            console.log('The database is opened failed');
                        }
                        request.onsuccess = function (event) {
                            db = request.result;
                            console.log('The database is opened successfully');
                        }
                        request.onupgradeneeded = function (event) {
                            db = event.target.result;
                            if (!db.objectStoreNames.contains('ips_logs_en')) {
                                objectStore = db.createObjectStore('ips_logs_en', {keyPath: 'DateAndTime'});
                            }
                        }
                    }
                }
            }

            if (this.status == 404) {
                console.log("Live data can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/AjaxGetMonitorLiveData.cgi', true);
    httpRequest.send();
    setTimeout(_ajaxGetMonitorLiveData, 700);
}

//setInterval(_ajaxGetMonitorLiveData, 700);

/* LOGGING */

var db;
var log_record;

function _ajaxGetLogsLiveData() {
    if (window.XMLHttpRequest) {
        var httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
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
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                var json = JSON.parse(this.responseText);
                var now = new Date();
                if (lang == "DE") { // DE
                    log_record = {
                        DatumUndZeit: now.toLocaleString().replace(/,/g, "") + "," + now.getMilliseconds(),
                        AusgangsSpannung: (json[0][1] / 100).toFixed(1),
                        AusgangsStrom: (json[1][1] / 100).toFixed(2),
                        Leistung: json[2][1],
                        KK: json[7][1],
                        Pad: json[8][1],
                        Duty: json[9][1],
                        UmrichterFreq: json[10][1]
                    }

                } else { // EN
                    log_record = {
                        DateAndTime: now.toLocaleString("en-GB").replace(/,/g, "") + "." + now.getMilliseconds(),
                        VOut: (json[0][1] / 100).toFixed(1),
                        IOut: (json[1][1] / 100).toFixed(2),
                        Power: json[2][1],
                        HS: json[7][1],
                        Pad: json[8][1],
                        Duty: json[9][1],
                        InvFreq: json[10][1]
                    }
                }
                add_record(log_record);
            }

            if (this.status == 404) {
                console.log("Live data can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/AjaxGetLogsLiveData.cgi', true);
    httpRequest.send();
}

function add_record(record) {
    if (lang == "DE") {
        var transaction = db.transaction(["ips_logs_de"], "readwrite");
        var objectStore = transaction.objectStore("ips_logs_de");
    } else {
        var transaction = db.transaction(["ips_logs_en"], "readwrite");
        var objectStore = transaction.objectStore("ips_logs_en");
    }

    var request = objectStore.add(record);

    request.onsuccess = function (event) {
        console.log("new log record has been added to your database.");
    }
    request.onerror = function (event) {
        console.log("The new record already exists in your database! ");
    }
}

/* OTHER THINGS */
/* JavaScript keep scroll position after refresh */
document.addEventListener("DOMContentLoaded", function (event) {
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function (e) {
    localStorage.setItem('scrollpos', window.scrollY);
}

/* Sticky Navigation Bar */
window.onscroll = function () {
    stickyFunction();
}

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickyFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}
