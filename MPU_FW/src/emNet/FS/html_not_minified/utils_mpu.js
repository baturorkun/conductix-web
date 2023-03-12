if (-1 != navigator.userAgent.indexOf("Firefox")) {
    document.addEventListener && document.addEventListener("DOMContentLoaded", init, false);
} else {
    window.addEventListener("load", init, false);
}

function init() {
    console.log("init..")
    initLanguage()
}


//const sleep = ms => new Promise(r => setTimeout(r, ms));
function FormSubmit(form) {
    const http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    const url = "PostData.cgi";
    http.open(form.method, url, true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    http.onload = function () {
        logger?.debug("Submit response: " + http.statusText);
        logger?.debug("Submit response: " + http.responseText.replace(/<[^>]*>?/gm, '').replace(/(\r\n|\n|\r)/gm, "").substring(0, 50));
    }
    http.onerror = function () {
        logger?.error("Submit error");
    };
    http.ontimeout = function () {
        logger?.error("Submit timeout");
    };

    // let form_data = new FormData(form);
    // let data = {};
    // form_data.forEach((value, key) => data[ key ] = value);
    console.log(form);
    let form_data = {};
    for (const element of form) {
        if (element.name === undefined || element.name == "" /* || element.value === undefined */) {
            continue;
        }
        if (element?.validity?.valid === false) {
            continue;
        }
        if (element.value == "") {
            //continue;
        }
        form_data[element.name] = element.value.replace(":", "-");
        logger?.debug("Add " + element.name + "=" + form_data[element.name] + " to FormData");
    }

    const json = JSON.stringify(form_data);
    logger?.debug("Send json string: " + json);

    http.timeout = 1000;
    http.send(json);
}

function settingDownload() {
    const settingData = {};
    const inputs = document.getElementsByTagName("input");
    const selects = document.getElementsByTagName("select");

    for (let i = 0; i < selects.length; i++) {
        settingData[selects[i].name] = selects[i].value
    }

    for (let i = 0; i < inputs.length; i++) {

        if (!inputs[i].disabled) {
            if (inputs[i].type == "checkbox") {
                settingData[inputs[i].name] = inputs[i].checked ? "1" : "0";
            } else {
                valueElement = document.getElementById("sse_" + inputs[i].name);
                if (valueElement) {
                    settingData[inputs[i].name] = valueElement.innerHTML
                }
            }
        }

    }

    const jsonBlob = new Blob([JSON.stringify(settingData)], {type: "application/json"});
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(jsonBlob);
    const currentDate = new Date().toISOString().slice(0, 10);
    downloadLink.download = `MPU_setting_${currentDate}.json`;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
    logger?.debug("Send json string: " + jsonBlob);
}

function settingImport() {

    const file = document.getElementById("configuration_file").files[0];
    if (!file) {
        alert("Please select a file");
        return;
    }
    const reader = new FileReader();

    reader.onload = function (event) {


        const jsonData = JSON.parse(event.target.result);

        logger?.debug(file.name + " read" + jsonData);
        textarea = document.getElementById("config_file");
        textarea.value += file.name + " read. \n";
        for (let key in jsonData) {

            const http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            const url = "PostData.cgi";
            http.open("POST", url, true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            http.onload = function () {
                logger?.debug("Submit response: " + http.statusText);
                logger?.debug("Submit response: " + http.responseText.replace(/<[^>]*>?/gm, '').replace(/(\r\n|\n|\r)/gm, "").substring(0, 50));
            }
            http.onerror = function () {
                logger?.error("Submit error");
            };
            http.ontimeout = function () {
                logger?.error("Submit timeout");
            };

            data = {};
            data[key] = jsonData[key];
            const json = JSON.stringify(data);
            logger?.debug("Send json string: " + json);
            http.timeout = 1000;

            http.send(json);
            http.onreadystatechange = function () {
                if (http.readyState === XMLHttpRequest.DONE) {
                    if (http.status === 200) {
                        textarea.value += key + " = " + jsonData[key] + " updated. \n";
                        logger?.debug("Configuration Import:" + key + " = " + jsonData[key] + " updated.");
                    } else {
                        textarea.value += key + " = " + jsonData[key] + " update error. \n";
                        logger?.debug("Configuration Import:" + key + " = " + jsonData[key] + " update error.");
                    }
                }
            };
        }
    }
    reader.readAsText(file);

}