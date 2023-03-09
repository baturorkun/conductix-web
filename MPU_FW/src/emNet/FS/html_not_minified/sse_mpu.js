let pagename = "";
logger?.debug("Pagename = '" + pagename + "'");

let SSE_TimeoutHandle = null;

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
    pagename = window.location.pathname.replace(/\.[^/.]+$/, '').replace('/', '');
    if (0 == pagename.length)
    {
        pagename = "index";
    }
    start_SEELiveData();
}

function start_SSETimeout()
{
    const offlineElement = document.getElementById("offline");
    if (offlineElement !== null)
    {
        offlineElement.innerHTML = "";
    }

    SSE_TimeoutHandle = window.setTimeout(() =>
    { 
        logger?.warn("Server-Sent Events (SSE) timeout");
        alert("TCP Communication Timeout");
        if (offlineElement !== null)
        {
            offlineElement.innerHTML = " (Offline)";
        }
    }, 5000);
}
function stop_SSETimeout()
{
    if (SSE_TimeoutHandle !== null)
    {
        window.clearTimeout(SSE_TimeoutHandle);
    }
}
function restart_SSETimeout()
{
    stop_SSETimeout();
    start_SSETimeout();
}

function start_SEELiveData()
{
    if (typeof(EventSource) !== "undefined")
    {
        const SSE_file = "SSE" + pagename[ 0 ].toUpperCase() + pagename.substring(1) + "LiveData.sse";
        logger?.info("Start Server-Sent Events (SSE) '" + SSE_file + "'");
        const source = new EventSource(SSE_file);
        source.onopen = () => { logger?.info("SSE connection opened"); };
        source.onmessage = SSELiveData_callback;
        source.onerror = (e) =>
        {
            logger?.error("SSE '" + SSE_file + "' error occurred while attempting to connect");
            //source.close();
        };
        start_SSETimeout()
    }
    else
    {
        logger?.warning("The browser does not support Server-Sent Events (SSE).");
    }
}

function SSELiveData_callback(event)
{
    let data = event.data;
    let json;
    if (null == data)
    {
        return;
    }

    restart_SSETimeout();

    data = data.replaceAll(`'`, `"`);
    data = data.replaceAll(':nan', ':"nan"');
    data = data.replaceAll(':-nan', ':"nan"');

    try
    {
        logger?.debug("Json receive: " + data);
        json   = JSON.parse(data);
    }
    catch (e)
    {
        if (e instanceof SyntaxError)
        {
            const msg = e.message;
            const search_text = "at position";
            const search_index = msg.indexOf(search_text);
            
            if (search_index > 0)
            {
                const position = parseInt(msg.substring(search_index + search_text.length));
                if (false == isNaN(position) && position <= data.length)
                {
                    const trim_length = 25;
                    let syntax_text = data.substring(position);
                    if (syntax_text.length > trim_length)
                    {
                        syntax_text = syntax_text.substring(0, trim_length) + "...";
                    }
                    logger?.error("Json syntax error: " + msg + "; " + syntax_error);
                    return;
                }
            }
        }

        logger?.error("Json error: " + e.message);
        return;
    }
    
    Object.entries(json).forEach((entry) => {
        let[ parameters, values ] = entry;
        let parameter_list        = parameters.split(".");
        if (parameter_list.length < 1 || values === undefined)
        {
            logger?.error("Invalid argument: " + parameters + "=" + values);
            return;
        }

        const id       = parameter_list[ 0 ];
        const elements = document.querySelectorAll("[id='" + id + "']");
        if (elements.length == 0)
        {
            logger?.error("Element " + id + " not found");
            return;
        }

        parameter_list = parameter_list.splice(1);

        if (parameter_list.length == 0)
        {
            if (typeof values !== 'object')
            {
                values = { 'innerHTML' : values };
            }
            else
            {
                parameter_list.push('attributes');
            }
        }
        else
        {
            if (typeof values !== 'object' || values === null)
            {
                const name     = parameter_list.splice(-1)[ 0 ];
                const val      = values;
                values         = {};
                values[ name ] = val;
                parameter_list = parameter_list.splice(1);
            }
        }

        for (var i = 0; i < elements.length; i++)
        {
            let property = elements[i];
            for (par in parameter_list)
            {
                property = property[ parameter_list[ par ] ];
            }

            Object.entries(values).forEach((obj) => {
                let[ key, value ] = obj;
                if (value === false)
                {
                    value = null;
                }
                else if (value === true)
                {
                    value = key;
                }

                switch (property.constructor.name)
                {
                    case 'NamedNodeMap':
                        if ((property[ key ] === undefined && value !== null)
                            || (property[ key ] !== undefined && property[ key ].value != value))
                        {
                            if (value === null)
                            {
                                property.removeNamedItem(key);
                                logger?.debug("SSE clear " + parameters);
                            }
                            else
                            {
                                const node = document.createAttribute(key);
                                node.value = value;
                                property.setNamedItem(node);
                                logger?.debug("SSE set " + parameters + " = " + value);
                            }
                        }
                        break;
                    default:
                        if ((property[ key ] === undefined && value !== null)
                            || (property[ key ] !== undefined && property[ key ] != value))
                        {
                            if (value === null)
                            {
                                property[ key ] = undefined;
                                //delete property[key];
                                logger?.debug("SSE clear " + parameters);
                            }
                            else
                            {
                                property[ key ] = value;
                                logger?.debug("SSE set " + parameters + " = " + value);

                            }
                        }
                        break;
                }
            });
        }
    });
}