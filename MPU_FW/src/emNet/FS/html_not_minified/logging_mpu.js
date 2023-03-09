let logger = null;

if (-1 != navigator.userAgent.indexOf("Firefox"))
{
    document.addEventListener && document.addEventListener("DOMContentLoaded", init, !1);
}
else
{
    window.addEventListener("load", init, false);
}

const LoggerLevel = {
    Off: 0,
    Debug: 1,
    Info: 2,
    Status: 3,
    Warning: 4,
    Error: 5,
    Fatal: 6,
};

function init()
{
    logger        = {};
    logger.init   = function(id) { logger.target = document.getElementById(id); };
    logger.print  = function(msg, level = LoggerLevel.Debug) {
        let post_str = "\r\n";
        let pre_str = "";
        /*switch (level)
        {
            case LoggerLevel.Off:
                return;
            case LoggerLevel.Debug: pre_str = "Debug: "; break;
            case LoggerLevel.Info: pre_str = "Info: ";  break;
            case LoggerLevel.Status: pre_str = "Status: ";  break;
            case LoggerLevel.Warning: pre_str = "Warning: ";  break;
            case LoggerLevel.Error: pre_str = "Error: ";  break;
            case LoggerLevel.Fatal: pre_str = "Fatal: "; break;
        }*/

        if (null == logger.target)
        {
            return;
        }
        const scroll_pos_percent = ((logger.target.scrollTop + logger.target.offsetHeight) / logger.target.scrollHeight) * 100.0;
        logger.target.value += pre_str + msg + post_str;
        if (scroll_pos_percent >= 100.0)
        {
            logger.target.scrollTop = logger.target.scrollHeight;
        }
    };
    logger.reset  = function() {
        if (null == logger.target)
        {
            return;
        }
        logger.target.value = "";
    };

    logger.debug  = function(msg) {
        console.debug(msg);
        //return logger.print(msg, LoggerLevel.Debug);
        return;
    };
    logger.info  = function(msg) {
        console.info(msg);
        return logger.print(msg, LoggerLevel.Info);
    };
    logger.warn  = function(msg) {
        console.warn(msg);
        return logger.print(msg, LoggerLevel.Warning);
    };
    logger.error  = function(msg) {
        console.error(msg);
        return logger.print(msg, LoggerLevel.Error);
    };

    logger?.init("logging");

    if (typeof(EventSource) !== "undefined")
    {
        const SSE_file = "SSELogging.sse";
        console.info("Start Server-Sent Events (SSE) '" + SSE_file + "'");
        const source     = new EventSource(SSE_file);
        source.onmessage = function(event)
        {
            const msg = event.data;
            console.log(msg);
            logger?.print(msg);
        };
        source.onerror = (e) =>
        {
            logger?.error("SSE '" + SSE_file + "' error occurred while attempting to connect");
            //source.close();
        };
    }
    else
    {
        console.warning("The browser does not support Server-Sent Events (SSE).");
    }
}

function download()
{
    if (null == logger?.target)
    {
        console.log("Downloading not possible.");
        return;
    }

    const e = new Date();
    const t = document.createElement("a");
    const a = new Blob([ logger.target.value ], {
        type:
            "text/csv;charset=UTF-8;"
    });
    let prefix = "";
    const title_element = document.getElementsByClassName("title");
    if (title_element != null && title_element[ 0 ].textContent != "")
    {
        prefix = title_element[ 0 ].textContent.replace(/[\:-\s]/g, " ").trim() + "_";
    }
    else
    {
        //prefix = "client_side_log_";
        prefix = "log_";
    }

    t.download = prefix + e.toISOString().substring(0, 10)
    + "_"  + e.toLocaleTimeString() + ".csv";
    t.download      = t.download.replace(/[\:-\s]/g, "_").toLowerCase();
    t.href = window.URL.createObjectURL(a);
    t.target = "_blank";
    t.style.display = "none";
    document.body.appendChild(t);
    t.click();
    document.body.removeChild(t);
}