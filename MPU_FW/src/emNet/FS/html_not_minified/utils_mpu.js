if (- 1 != navigator.userAgent.indexOf("Firefox"))
{
    document.addEventListener && document.addEventListener("DOMContentLoaded", init, false);
}
else
{
    window.addEventListener("load", init, false);
}

function init()
{
    console.log("init..")
    initLanguage()
}


//const sleep = ms => new Promise(r => setTimeout(r, ms));
function FormSubmit(form)
{
    const http    = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    const url     = "PostData.cgi";
    http.open(form.method, url, true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    http.onload     = function() {
        logger?.debug("Submit response: " + http.statusText);
        logger?.debug("Submit response: " + http.responseText.replace(/<[^>]*>?/gm, '').replace(/(\r\n|\n|\r)/gm, "").substring(0,50));
    }
    http.onerror    = function() {
        logger?.error("Submit error");
    };
    http.ontimeout  = function() {
        logger?.error("Submit timeout");
    };

    // let form_data = new FormData(form);
    // let data = {};
    // form_data.forEach((value, key) => data[ key ] = value);

    let form_data = {};
    for (const element of form)
    {
        if (element.name === undefined || element.name == "" /* || element.value === undefined */)
        {
            continue;
        }
        if (element?.validity?.valid === false)
        {
            continue;
        }
        if (element.value == "")
        {
            //continue;
        }
        form_data[ element.name ] = element.value.replace(":", "-");
        logger ?.debug("Add " + element.name + "=" + form_data[ element.name ] + " to FormData");
    }

    const json = JSON.stringify(form_data);
    logger?.debug("Send json string: " + json);

    http.timeout = 1000;
    http.send(json);
}