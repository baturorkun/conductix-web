/* SETTINGS */
var LAN;

window.onload = init();
                
function init() 
{
    initLanguage()

    if ((window.location.href.match(/Settings_login.htm/)) || (window.location.href.match(/Settings_login_de.htm/)))
    {
        // We don't need settings data
        if (document.getElementById("usr-check-in").innerHTML === "ACCESS GRANTED")
        {

            location.replace("Settings.htm");
            userAccessGranted();
        }

        _ajaxGetSettingsLogInLiveData();
        setInterval(_ajaxGetSettingsLogInLiveData, 500);
    }
    else
    {
        if (document.getElementById("usr-check-out").innerHTML === "LOGOUT")
        {

            location.replace("Settings_login.htm");
            userAccessNone() ; 
            document.getElementById("usr-check-in").innerHTML = "NO ACCESS";
             
        }
        else
        {
            _ajaxGetSettingsLiveData();
            setInterval(_ajaxGetSettingsLiveData, 500);
        }
    }
}

function userAccessGranted()
{
    sessionStorage.setItem('access', "yes");
}

function userAccessNone()
{
    sessionStorage.setItem('access', "no");
}

/* FIRMWARE CONVERTING ASCII TO BINARY */

var no_hex_format_dialog;
var not_ips_fw_dialog;
var textarea;
var file = null;
const XHR_BUFF_SIZE = 256;
const DSP_XHR_BUFF_SIZE = 256;
var bytes = []; // arrayBuffer
var Uint8View = null;
var DSPUint8View = null;

function close_no_hex_format_dialog() 
{
    no_hex_format_dialog.close();
}

function close_not_ips_fw_dialog() 
{
    not_ips_fw_dialog.close();
    location.reload();
}

function fileChange() 
{
    file = null;
    no_hex_format_dialog = document.getElementById('no_hex_format_dialog');
    not_ips_fw_dialog = document.getElementById('not_ips_fw_dialog');
    textarea = document.getElementById('fw-textarea');

    var readerAsText = new FileReader();
    var lines = null;
    var dsp_lines = null;
    var fileList = document.getElementById("fileA").files;       
    file = fileList[0];
    console.log(fileList);
    if (!file) 
    {
        return;
    }
    else 
    {
        console.log(file.name.substr((file.name.length - 4), 4));
        if (file.name.substr((file.name.length - 4), 4) === ".hex")
        if (file.name.substr(0, 6) !== "78007_") 
        {
            document.getElementById("fileA").files = null; 
            fileList = null; 
            file = null;
            not_ips_fw_dialog.showModal();
            console.log(fileList);
            return;
        }
    }

    readerAsText.onload = function()
    {   
        if (file.name.substr(0, 6) == "78007_")
        {
            var dsp_text = readerAsText.result;
            dsp_lines = dsp_text.split("\r\n");
            dsp_bytes = []; // Reset to null   
            const dsp_fff = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"; // 32 Bytes dummy
            const dsp_addr = "ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD"; // 32 Bytes dummy
    
            // Is the selected file a valid .hex file?
            for (var i= 0; i < (dsp_lines.length - 1); i++) 
            {    
                if (dsp_lines[i].substr(0, 1) !== ':') 
                {
                    no_hex_format_dialog.showModal();
                    dsp_bytes = []; // Reset to null
                    dsp_lines = null;
                    return;
                }
            }

            // Print the content to the text area
            textarea.value = dsp_lines.join('\n');
        
            for (var i= 0; i < dsp_lines.length; i++) 
            {
                /*
                console.log(lines[i].substr(0, 1) + ' ' +                           // RECORD MARK          ":"     1 Byte
                            lines[i].substr(1, 2) + ' ' +                           // RECORD LENGTH        "02"    2 Bytes
                            lines[i].substr(3, 4) + ' ' +                           // LOAD OFFSET          "0000"  4 Bytes
                            lines[i].substr(7, 2) + ' ' +                           // RECORD TYPE          "04"    2 Bytes
                            lines[i].substr(9, (lines[i].length - 9 - 2)) + ' ' +   // DATA                 "FFF0"  0 - 32 Bytes
                            lines[i].substr((lines[i].length - 2), 2) );            // CHECKSUM             "0B"    2 Bytes
                */
                if (dsp_lines[i].substr(1, 2) == "20") // Application flash raw data 
                {
                    dsp_lines[i] = dsp_lines[i].substr(9, (dsp_lines[i].length - 9 - 2));
                } 
                else 
                {
                    if (dsp_lines[i].substr(7, 2) == "04") 
                    {
                            dsp_lines[i] = dsp_lines[i].substr(9, (dsp_lines[i].length - 9 - 2)) + dsp_lines[i+1].substr(3, 4);
                            dsp_lines[i] = dsp_lines[i] + dsp_addr.substr(dsp_lines[i].length, dsp_addr.length);
                    } 
                    else if (dsp_lines[i].substr(7, 2) == "01") // End of file 
                    {
                        dsp_lines[i] = "FFFFFFFF" + dsp_addr.substr(8, dsp_addr.length);
                        //break;
                
                    }
                    else
                    {
                        dsp_lines[i] = dsp_lines[i].substr(9, (dsp_lines[i].length - 9 - 2));
                        dsp_lines[i] = dsp_lines[i] + dsp_fff.substr(dsp_lines[i].length, dsp_fff.length);
                    }
                }

                for (var j = 0; j < dsp_lines[i].length; j+=2) 
                {
                    dsp_bytes.push(dsp_lines[i].substr(j, 2));
                }

                console.log(dsp_lines[i]);
                //textarea.value += dsp_lines[i] + '\n';
            }

            // Converting hex to numeric 8 bits values
            for (var _bizz = 0; _bizz < dsp_bytes.length; _bizz++) 
            {
                dsp_bytes[_bizz] = parseInt(dsp_bytes[_bizz], 16);
            }

            console.log(dsp_bytes);
            // Length of the typed array is a multiple of ajax http request buffer size
            dsp_bytes.length = Math.ceil(dsp_bytes.length / DSP_XHR_BUFF_SIZE) * DSP_XHR_BUFF_SIZE;
            DSPUint8View = new Uint8Array(dsp_bytes);
            
            document.getElementById("mem-weight").innerHTML = '  (' + dsp_bytes.length + ' / 524288)';
        }
    };

    readerAsText.readAsText(file);
    
    document.getElementById("fileName").innerHTML = file.name;
    document.getElementById("fileSize").innerHTML = file.size + ' Bytes';
    document.getElementById("progress").value = 0;
    document.getElementById("percent").innerHTML = "0%, please click the Upload button.";
    //document.getElementById("fileType").innerHTML = 'Type:   ' + file.type;
    //document.getElementById("link").innerHTML = "";
}

/* FIRMWARE UPLOAD TO MRAM */

var i = 0;
var client;
var prog;
var percentage; 
var update_dialog;
var dsp_update_dialog;
var no_file_dialog;

function close_no_file_dialog() 
{
    no_file_dialog.close();
}

function close_update_dialog() 
{

    location.replace("Settings_login.htm");
    userAccessNone();
    update_dialog.close();
    //location.reload();
}

function close_dsp_update_dialog()
{
    LAN = document.getElementById("lan").innerHTML.substr(0, 2); 
    if (LAN == "DE")
    {
        location.replace("Settings_login_de.htm");
    }
    else
    {
        location.replace("Settings_login.htm");
    }
    userAccessNone();
    dsp_update_dialog.close();
    //location.reload();
}

function close_dsp_update_success_dialog()
{
    document.getElementById('dsp_fw_update_success_dialog').close();
}

function uploadFile(event) 
{
    prog = document.getElementById("progress");
    percentage = document.getElementById("percent");
    update_dialog = document.getElementById('fw_update_dialog');
    dsp_update_dialog = document.getElementById('dsp_fw_update_dialog');
    no_file_dialog = document.getElementById('no_file_dialog');
    prog.value = 0;
    prog.max = 100;

    if (!file) 
    {
        no_file_dialog.showModal();
    } 
    else 
    {
        if (file.name.substr(0, 6) == "78007_")
        {
            var frames = Math.ceil(dsp_bytes.length / DSP_XHR_BUFF_SIZE); // round up
        }

        //console.log('All frames :' + frames);
        client = new XMLHttpRequest();
        client.onerror = function(e) 
        {
            alert("onError");
        }

        client.onabort = function(e) 
        {
            alert("Upload aborted!");
            prog.value = 0;            
            percentage.innerHTML = "Progress: 0%.";
            i = 0;
        }        
        client.onreadystatechange = function() // Call a function when the state changes.
        {    
            if (client.readyState === XMLHttpRequest.DONE && client.status === 200) 
            {
                console.log('frame nr :' + i);
                //console.log(this.responseText);
                if (i < frames) 
                {
                    uploadFile();
                }

                if (i == frames)
                {
                    uploadFileFinished();
                    i++;
                }
            }
        }
        
        if (file.name.substr(0, 6) == "78007_")
        {
            client.open("POST", "DSPUploadFw.cgi", true);
            client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            client.send((DSPUint8View.slice((i*DSP_XHR_BUFF_SIZE), (i*DSP_XHR_BUFF_SIZE) + DSP_XHR_BUFF_SIZE)) || null);
            
            if (i < (frames - 1)) 
            {
                var p = Math.round((i / frames) * 100);
                prog.value = (i / frames) * 100;            
                document.getElementById("percent").textContent = p + "%, uploading. . .";
            } 
            else 
            {    
                document.getElementById("percent").textContent = "100%, upload done.";
                prog.value = prog.max;
                dsp_update_dialog.showModal();
            }
            i++;
        }
        else
        {
            // Upload error
        }
    }
}

function uploadFileFinished()
{
    var xhr_end = new XMLHttpRequest();

    xhr_end.onreadystatechange = function()
    {    
        if (xhr_end.readyState === XMLHttpRequest.DONE && xhr_end.status === 200) 
        {
            //console.log(this.responseText);
        }
    }
    if (file.name.substr(0, 6) == "78007_")
    {
        xhr_end.open("POST", "DSPUploadFw.cgi", true);
        xhr_end.send("DSP_FINISHED_UPLOADING");
    }
}

function uploadAbort() 
{
    if(client instanceof XMLHttpRequest) 
    {
        client.abort();
    }
}

/* NETWORK CONFIGURATION */
 
function _activate_dhcp() 
{
    document.getElementById("dhcp").checked = true;
    document.getElementById("static").checked = false;

    console.log(document.getElementById("dhcp").value);
    console.log(document.getElementById("static").value);

    document.getElementById("ip_0").disabled    = true;
    document.getElementById("ip_1").disabled    = true;
    document.getElementById("ip_2").disabled    = true;
    document.getElementById("ip_3").disabled    = true;
    document.getElementById("mask_0").disabled    = true;
    document.getElementById("mask_1").disabled    = true;
    document.getElementById("mask_2").disabled    = true;
    document.getElementById("mask_3").disabled    = true;
    document.getElementById("gate_0").disabled    = true;
    document.getElementById("gate_1").disabled    = true;
    document.getElementById("gate_2").disabled    = true;
    document.getElementById("gate_3").disabled    = true;
    document.getElementById("dns_0").disabled    = true;
    document.getElementById("dns_1").disabled    = true;
    document.getElementById("dns_2").disabled    = true;
    document.getElementById("dns_3").disabled    = true;
}

function _activate_manual() 
{
    document.getElementById("static").checked = true;
    document.getElementById("dhcp").checked = false;

    console.log(document.getElementById("dhcp").value);
    console.log(document.getElementById("static").value);
    
    document.getElementById("ip_0").disabled    = false;
    document.getElementById("ip_1").disabled    = false;
    document.getElementById("ip_2").disabled    = false;
    document.getElementById("ip_3").disabled    = false;
    document.getElementById("mask_0").disabled    = false;
    document.getElementById("mask_1").disabled    = false;
    document.getElementById("mask_2").disabled    = false;
    document.getElementById("mask_3").disabled    = false;
    document.getElementById("gate_0").disabled    = false;
    document.getElementById("gate_1").disabled    = false;
    document.getElementById("gate_2").disabled    = false;
    document.getElementById("gate_3").disabled    = false;
    document.getElementById("dns_0").disabled    = false;
    document.getElementById("dns_1").disabled    = false;
    document.getElementById("dns_2").disabled    = false;
    document.getElementById("dns_3").disabled    = false;
}


/* SETTINGS LIVE DATA */

var logging_flg = false;
var start_logging;
var client_logging_freq;
var lang;
var dsp_updating_flg = 0;

var admin_page_layout_once = 0;
var user_page_layout_once = 0;

function _ajaxGetSettingsLiveData() 
{
    if (window.XMLHttpRequest) 
    {
        var httpRequest = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) 
    {
        try 
        {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (otherMS) 
        {
            try 
            {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) 
            {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () 
    {
        if (httpRequest.readyState == 4) 
        {
            if (httpRequest.status == 200) 
            {
                var json_settings = JSON.parse(this.responseText);
                //console.log(json_settings);
                document.getElementById("app-version").innerHTML          = json_settings[0][1];
                document.getElementById("app-date-time").innerHTML        = json_settings[1][1]+"<span class='delta'> &#x029E5; </span>"+json_settings[1][2];
                document.getElementById("bl-version").innerHTML           = json_settings[2][1];
                document.getElementById("bl-date-time").innerHTML         = json_settings[3][1]+"<span class='delta'> &#x029E5; </span>"+json_settings[3][2];
                document.getElementById("year").innerHTML       = json_settings[4][1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                document.getElementById("month").innerHTML      = json_settings[5][1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                document.getElementById("day").innerHTML        = json_settings[6][1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                document.getElementById("hour").innerHTML       = json_settings[7][1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                document.getElementById("min").innerHTML        = json_settings[8][1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                document.getElementById("sec").innerHTML        = json_settings[9][1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                
                document.getElementById("out-voltage").innerHTML   = (json_settings[10][1] / 100).toFixed(1)+" V";
                document.getElementById("out-current").innerHTML   = (json_settings[11][1] / 100).toFixed(1)+" A";
                document.getElementById("out-power").innerHTML     = json_settings[12][1]+" VA";
                document.getElementById("pad-tempr").innerHTML     = json_settings[13][1]+" &#176;C";
                document.getElementById("hs-tempr").innerHTML      = json_settings[14][1]+" &#176;C";
                document.getElementById("inv-duty").innerHTML      = json_settings[15][1]+" %";
                document.getElementById("feedback-sig").innerHTML  = json_settings[16][1]+" %";
                document.getElementById("a-freq-hs").innerHTML     = json_settings[17][1]+" Hz";
                document.getElementById("a-freq-ls").innerHTML     = json_settings[18][1]+" Hz";
                document.getElementById("b-freq-hs").innerHTML     = json_settings[19][1]+" Hz";
                document.getElementById("b-freq-ls").innerHTML     = json_settings[20][1]+" Hz";
                document.getElementById("dc-link-duty").innerHTML  = json_settings[21][1]+" %";
                document.getElementById("driver-clk").innerHTML    = json_settings[22][1]+" Hz";
                document.getElementById("pump").innerHTML  = json_settings[23][1]+" Hz";
                document.getElementById("mains-rect-n").innerHTML  = json_settings[24][1]+" V";
                document.getElementById("mains-rect-l").innerHTML  = json_settings[25][1]+" V";
                document.getElementById("mains-r-l").innerHTML     = json_settings[26][1]+" V";
                document.getElementById("mains-freq").innerHTML    = json_settings[27][1]+" Hz";
                document.getElementById("dc-link-v").innerHTML     = json_settings[28][1]+" V";

                document.getElementById("debug-0").innerHTML        = json_settings[29][1];
                document.getElementById("debug-1").innerHTML        = json_settings[30][1];
                document.getElementById("debug-2").innerHTML        = json_settings[31][1];
                document.getElementById("debug-3").innerHTML        = json_settings[32][1];

                document.getElementById("err-group-0").innerHTML        = "0x"+json_settings[33][1].toLocaleString('en-US', {minimumIntegerDigits: 8, useGrouping:false});
                document.getElementById("err-group-1").innerHTML        = "0x"+json_settings[34][1].toLocaleString('en-US', {minimumIntegerDigits: 8, useGrouping:false});
                document.getElementById("err-group-2").innerHTML        = "0x"+json_settings[35][1].toLocaleString('en-US', {minimumIntegerDigits: 8, useGrouping:false});
                document.getElementById("err-group-3").innerHTML        = "0x"+json_settings[36][1].toLocaleString('en-US', {minimumIntegerDigits: 8, useGrouping:false});

                document.getElementById("overcurrent-dsp").innerHTML    = json_settings[37][1]+" A";
                document.getElementById("recharge-thold").innerHTML     = json_settings[38][1]+" mV";
                document.getElementById("config-1").innerHTML           = json_settings[39][1];
                document.getElementById("config-2").innerHTML           = json_settings[40][1];

                document.getElementById("dsp-app-version").innerHTML          = json_settings[49][1];
                document.getElementById("dsp-app-date-time").innerHTML        = json_settings[50][1]+"<span class='delta'> &#x029E5; </span>"+json_settings[50][2];
                document.getElementById("dsp-bl-version").innerHTML           = json_settings[51][1];
                document.getElementById("dsp-bl-date-time").innerHTML         = json_settings[52][1]+"<span class='delta'> &#x029E5; </span>"+json_settings[52][2];

                start_logging       = json_settings[53][1];
                lang                = json_settings[54][1];
                client_logging_freq = json_settings[55][1];

                if (json_settings[56][1] == 1)
                {
                    document.getElementById("in-1").className = "input-io-on box-dist";
                }
                else
                {
                    document.getElementById("in-1").className = "input-io-off box-dist";
                }
                if (json_settings[57][1] == 1)
                {
                    document.getElementById("in-2").className = "input-io-on box-dist"
                }
                else
                {
                    document.getElementById("in-2").className = "input-io-off box-dist"
                }

                if (json_settings[58][1] == 1)  
                {
                    if (dsp_updating_flg == 0)
                    {
                        document.getElementById('dsp_updating_dialog').showModal();
                        dsp_updating_flg = 1;
                    }

                    switch (json_settings[58][2])
                    {
                        case 5:
                            if (lang == 1) /* DE */ document.getElementById('dsp-update-state').innerHTML = "DSP FLASH LÖSCHEN";
                            else /* EN */ document.getElementById('dsp-update-state').innerHTML = "ERASING DSP FLASH";
                            break;
                        
                        case 10:
                            if (lang == 1) /* DE */ document.getElementById('dsp-update-state').innerHTML = "DSP FLASH SCHREIBEN";
                            else /* EN */ document.getElementById('dsp-update-state').innerHTML = "WRITING TO DSP FLASH";
                            break;

                        case 13:
                            if (lang == 1) /* DE */ document.getElementById('dsp-update-state').innerHTML = "DSP AKTUALISIERUNG BEENDEN";
                            else /* EN */ document.getElementById('dsp-update-state').innerHTML = "FINISHING DSP UPDATE";
                            break;

                        default:
                            break;
                    }
                }

                if (json_settings[58][1] == 0)  
                {
                    if (dsp_updating_flg == 1)
                    {
                        document.getElementById('dsp_updating_dialog').close();
                        document.getElementById('dsp_fw_update_success_dialog').showModal();
                        dsp_updating_flg = 0;
                    }
                }

                if ((start_logging == 1) 
                && (logging_flg == false)) // Start logging if enabled
                { 
                    logging_flg = true;
                    setInterval(_ajaxGetLogsLiveData, client_logging_freq);
                    if (lang == 1) // DE 
                    {
                        var request = indexedDB.open("de_logs_ips", 1);   
                        request.onerror = function (event) 
                        {
                            console.log('The database is opened failed');
                        }
                        request.onsuccess = function (event) 
                        {
                            db = request.result;
                            console.log('The database is opened successfully');
                        }
                        request.onupgradeneeded = function (event) 
                        {
                            db = event.target.result;    
                            if (!db.objectStoreNames.contains('ips_logs_de')) 
                            {
                                var objectStore = db.createObjectStore('ips_logs_de', { keyPath: 'DatumUndZeit' });
                            }
                        }
                    } 
                    else // EN 
                    { 
                        var request = indexedDB.open("en_logs_ips", 1);
                        request.onerror = function (event) 
                        {
                            console.log('The database is opened failed');
                        }
                        request.onsuccess = function (event) 
                        {
                            db = request.result;
                            console.log('The database is opened successfully');
                        }                    
                        request.onupgradeneeded = function (event) 
                        {
                            db = event.target.result;
                            if (!db.objectStoreNames.contains('ips_logs_en')) 
                            {
                                objectStore = db.createObjectStore('ips_logs_en', { keyPath: 'DateAndTime' });
                            }
                        }
                    }
                }

                for (let i = 41; i <= 48; i++) 
                {
                    if (json_settings[i][3] == 1) // SUPER
                    {
                        document.getElementById("active-usr").innerHTML  = "("+json_settings[i][1]+")";
                        
                        if ((json_settings[i][5] == 0) && (admin_page_layout_once == 0)) // ADMIN
                        {
                            admin_page_layout_once = 1;
                            document.getElementById("ips-live-sys-data-box").style.display = "none";
                            document.getElementById("config-box").style.display = "none";
                            document.getElementById("dns-box").style.display = "none";
                            document.getElementById("mac-box").style.display = "none";
                            document.getElementById("prod-sn").style.display = "none";
                            /*
                            document.getElementById("prod-info-admin").style.display = "none";
                            document.getElementById("prod-info-act-h3").style.display = "none";
                            document.getElementById("prod-info-edit-h3").style.display = "none";
                            */
                            document.getElementById("ips-ios").style.display = "none";
                            document.getElementById("left-layout-col").appendChild(document.getElementById("config-file-box"));
                            document.getElementById("left-layout-col").appendChild(document.getElementById("network-box"));
                            document.getElementById("fw-textarea").rows = "21";
                            document.getElementById("fw-textarea").style.height = "312px";

                            if ((json_settings[i][7] == 0) && (user_page_layout_once == 0)) // USER
                            {
                                user_page_layout_once = 1;
                                document.getElementById("fw-admin-box").style.display = "none";
                                document.getElementById("fw-info-h3").style.display = "none";
                                document.getElementById("fw-up-h3").style.display = "none";
                                document.getElementById("dsp-cpu-fw-h2").innerHTML = "DSP/CPU Firmware Information"
                                document.getElementById("user-box").style.display = "none";
                                document.getElementById("hostname-box").style.display = "none";
                                document.getElementById("prod-info-admin").style.display = "none";
                                document.getElementById("prod-info-act-h3").style.display = "none";
                                document.getElementById("prod-info-edit-h3").style.display = "none";
                                document.getElementById("left-layout-col").appendChild(document.getElementById("rtc-settings-box"));
                                document.getElementById("right-layout-col").appendChild(document.getElementById("config-file-box"));
                                //document.getElementById("right-layout-col").style.minHeight = "700";
                                //document.getElementById("middle-layout-col").style.minHeight = "700";
                                //document.getElementById("left-layout-col").style.minHeight = "700";
                                //document.getElementById("right-layout-col").insertBefore();
                            }
                        }
                    }
                }

            }

            if (this.status == 404) 
            {    
                console.log("Live data can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/AjaxGetSettingsLiveData.cgi', true);
    httpRequest.send();
    //setTimeout(_ajaxGetSettingsLiveData, 500);
}

/* CONFIG FILE DOWNLOAD */

function downloadCfgFile() 
{
    if (window.XMLHttpRequest) 
    {
        var httpRequest = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) 
    {
        try 
        {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (otherMS) 
        {
            try 
            {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) 
            {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () 
    {
        if (this.readyState == 4) 
        {
            if (this.status == 200) 
            {
                var js_config = JSON.parse(this.responseText);
                var json_config = this.responseText;
                console.log(js_config);
                console.log(json_config);

                var date_time = new Date(); 
                var anchor = document.createElement("a");
                if (language == 2)
                { // DE 
                    var blob = new Blob([JSON.stringify(js_config, null, '\t')], { type: "text/json;charset=UTF-8;"});
                    anchor.download = "ipsCONFIG_"+ date_time.toLocaleDateString('de-DE', {day:"2-digit", month:"2-digit", year:"numeric"}).replace(/\./g, "_") + "_" + date_time.toLocaleTimeString().replace(/:/g,"") +".json";
                }
                else
                { // EN 
                    var blob = new Blob([JSON.stringify(js_config, null, '\t')], { type: "text/json;charset=UTF-8;"});
                    anchor.download = "ipsCONFIG_"+ date_time.toISOString().substring(0, 10).replace(/-/g,"_") + "_" + date_time.toLocaleTimeString().replace(/:/g,"") +".json";
                }
                anchor.href = window.URL.createObjectURL(blob);
                anchor.target ="_blank";
                anchor.style.display = "none"; // just to be safe!
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
            }
        }
    }

    httpRequest.open('GET', '/AjaxGetConfigFile.cgi', true);
    httpRequest.send();
}

/* CONFIG FILE UPLOAD */

var fileB = null;
var not_ips_cfg_file_dialog;

//var JSONdataURL;
var JSONtext;
var JSONjs;
//var JSONarrayBuffer;

function close_not_ips_cfg_file_dialog() 
{
    not_ips_cfg_file_dialog.close();
}

function cfgFileChange() 
{
    not_ips_cfg_file_dialog = document.getElementById("not_ips_cfg_file_dialog")
    var readerAsText  = new FileReader();
    //var readerAsDataURL = new FileReader();
    //var readerAsArrayBuffer    = new FileReader();
    var fileList = document.getElementById("fileB").files;       
    fileB = fileList[0];
    console.log(fileList);

    if (!fileB) 
    {
        return;
    }
    else 
    {
        console.log(fileB.name.substr((fileB.name.length - 5), 5));
        if (fileB.name.substr((fileB.name.length - 5), 5) === ".json")
        if (fileB.name.substr(0, 9) !== "ipsCONFIG") 
        {
            document.getElementById("fileB").files = null; 
            fileList = null; 
            fileB = null;
            not_ips_cfg_file_dialog.showModal();
            console.log(fileList);
            return;
        }
    }

    // READ JSON FILE AS TEXT
    readerAsText.onload = function()
    {    
        JSONtext = readerAsText.result;
        JSONjs = JSON.parse(JSONtext); 
        //console.log(JSONjs); 
        for (var i = 0; i < 2; i++)
        {
            console.log(JSONjs)
        }
    };

    readerAsText.readAsText(fileB);

    // READ JSON FILE AS DATA URL
    //readerAsDataURL.onload = function()
    //{    
    //    JSONdataURL = readerAsDataURL.result;
    //    console.log(JSONdataURL); 
    //};

    //readerAsDataURL.readAsDataURL(fileB);

    // READ JSON FILE AS ARRAY BUFFER
    //readerAsArrayBuffer.onload = function()
    //{    
    //    JSONarrayBuffer = readerAsArrayBuffer.result;
    //    console.log(JSONarrayBuffer); 
    //};

    //readerAsArrayBuffer.readAsArrayBuffer(fileB);

    document.getElementById("cfgFileName").innerHTML = fileB.name;
}

var iterator = 0;
var no_cfg_file_dialog;
var cfg_upload_dialog;
var cfg_upload_finished_dialog;

function close_cfg_upload_finished_dialog()
{
    cfg_upload_finished_dialog = document.getElementById('cfg_upload_finished_dialog');
    cfg_upload_finished_dialog.close();
}

function close_no_cfg_file_dialog() 
{
    no_cfg_file_dialog.close();
}

function open_cfg_upload_dialog() 
{
    no_cfg_file_dialog = document.getElementById('no_cfg_file_dialog');

    if (!fileB) 
    {
        no_cfg_file_dialog.showModal();
    } 
    else 
    { 
        cfg_upload_dialog = document.getElementById('cfg_upload_dialog');
        cfg_upload_dialog.showModal();
    }
}

function close_cfg_upload_dialog_no() 
{
    cfg_upload_dialog = document.getElementById('cfg_upload_dialog');
    cfg_upload_dialog.close();
}

function close_cfg_upload_dialog_ok() 
{
    cfg_upload_dialog = document.getElementById('cfg_upload_dialog');
    cfg_upload_dialog.close();
    cfgUploadFile();
}

function cfgUploadFile(event)
{
    no_cfg_file_dialog = document.getElementById('no_cfg_file_dialog');

    if (!fileB) 
    {
        no_cfg_file_dialog.showModal();
    } 
    else 
    {                    
        var xhr_cfg = new XMLHttpRequest();
        xhr_cfg.onerror = function(e) 
        {
            alert("onError");
        }

        xhr_cfg.onabort = function(e) 
        {
            alert("Upload aborted!");
        }

        /*
        xhr_cfg.onload = function(e) 
        {
        };
        */

        xhr_cfg.onreadystatechange = function() // Call a function when the state changes.
        {    
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) 
            {
                console.log(this.responseText);
                if ("NO_VALID_JSON_FILE" === this.responseText)
                {
                    no_cfg_file_dialog.showModal();
                }
                else
                {
                    if (iterator < JSONjs.length)
                    {
                        cfgUploadFile();
                    }

                    if (iterator == JSONjs.length)
                    {
                        cfg_upload_finished_dialog = document.getElementById('cfg_upload_finished_dialog');
                        cfg_upload_finished_dialog.showModal();
                    }
                }
            }
        }
        
        xhr_cfg.open("POST", "cfgUpload.cgi", true);
        xhr_cfg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xhr_cfg.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        var data = JSON.stringify(JSONjs[iterator]);
        //data.replace(/"/g, /\\"/g);
        console.log(data);
        xhr_cfg.send(data);
        iterator++;
    }
}

/* SETTINGS LOGIN LIVE DATA */

var In_logging_flg = false;
var In_start_logging;
var In_client_logging_freq;
var language;

function _ajaxGetSettingsLogInLiveData() 
{
    if (window.XMLHttpRequest) 
    {
        var httpRequest = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) 
    {
        try 
        {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (otherMS) 
        {
            try 
            {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) 
            {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () 
    {
        if (httpRequest.readyState == 4) 
        {
            if (httpRequest.status == 200) 
            {
                var json_login = JSON.parse(this.responseText);
                In_start_logging       = json_login[0][1];
                language               = json_login[1][1];
                In_client_logging_freq = json_login[2][1];

                if ((In_start_logging == 1) 
                && (In_logging_flg == false)) // Start logging if enabled
                { 
                    In_logging_flg = true;
                    setInterval(_ajaxGetLogsLiveData, In_client_logging_freq);
                    if (language == 1) // DE 
                    {
                        var request = indexedDB.open("de_logs_ips", 1);   
                        request.onerror = function (event) 
                        {
                            console.log('The database is opened failed');
                        }
                        request.onsuccess = function (event) 
                        {
                            db = request.result;
                            console.log('The database is opened successfully');
                        }
                        request.onupgradeneeded = function (event) 
                        {
                            db = event.target.result;    
                            if (!db.objectStoreNames.contains('ips_logs_de')) 
                            {
                                var objectStore = db.createObjectStore('ips_logs_de', { keyPath: 'DatumUndZeit' });
                            }
                        }
                    } 
                    else // EN 
                    { 
                        var request = indexedDB.open("en_logs_ips", 1);
                        request.onerror = function (event) 
                        {
                            console.log('The database is opened failed');
                        }
                        request.onsuccess = function (event) 
                        {
                            db = request.result;
                            console.log('The database is opened successfully');
                        }                    
                        request.onupgradeneeded = function (event) 
                        {
                            db = event.target.result;
                            if (!db.objectStoreNames.contains('ips_logs_en')) 
                            {
                                objectStore = db.createObjectStore('ips_logs_en', { keyPath: 'DateAndTime' });
                            }
                        }
                    }
                }
            }
        }

        if (this.status == 404) 
        {    
            console.log("Settings Login live data can't be loaded!");
        }
    }
    httpRequest.open('GET', '/AjaxGetSettingsLogInLiveData.cgi', true);
    httpRequest.send();
    //setTimeout(_ajaxGetSettingsLogInLiveData, 500);
}

/* LOGGING */ 

var db;    
var log_record;

function _ajaxGetLogsLiveData()
{
    if (window.XMLHttpRequest) 
    {
        var httpRequest = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) 
    {
        try 
        {
            var httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) 
        {
            try 
            {
                var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) 
            {
                var httpRequest = null;
            }
        }
    }

    httpRequest.onreadystatechange = function () 
    {
        if (httpRequest.readyState == 4) 
        {
            if (httpRequest.status == 200) 
            {
                var json = JSON.parse(this.responseText);
                var now = new Date();
                if (lang == "DE")
                { // DE 
                    log_record = {  
                        DatumUndZeit: now.toLocaleString().replace(/,/g, "") + "," + now.getMilliseconds(),
                        AusgangsSpannung:   (json[0][1]/ 100).toFixed(1), 
                        AusgangsStrom:      (json[1][1]/ 100).toFixed(2), 
                        Leistung:       json[2][1],
                        KK:             json[7][1],      
                        Pad:            json[8][1],
                        Duty:           json[9][1],
                        UmrichterFreq:  json[10][1] 
                    }

                } 
                else 
                { // EN 
                    log_record = {  
                        DateAndTime: now.toLocaleString("en-GB").replace(/,/g, "") + "." + now.getMilliseconds(),
                        VOut:       (json[0][1]/ 100).toFixed(1), 
                        IOut:       (json[1][1]/ 100).toFixed(2), 
                        Power:       json[2][1],
                        HS:           json[7][1],      
                        Pad:          json[8][1],
                        Duty:         json[9][1],
                        InvFreq:      json[10][1]  
                    }
                }
                add_record(log_record);
            }

            if (this.status == 404) 
            {
                console.log("Live data can't be loaded!");
            }
        }
    }
    httpRequest.open('GET', '/AjaxGetLogsLiveData.cgi', true);
    httpRequest.send();
}

function add_record(record) 
{
    if (lang == "DE")
    {
        var transaction = db.transaction(["ips_logs_de"], "readwrite");
        var objectStore = transaction.objectStore("ips_logs_de");
    } 
    else 
    {
        var transaction = db.transaction(["ips_logs_en"], "readwrite");
        var objectStore = transaction.objectStore("ips_logs_en");
    }

    var request = objectStore.add(record);

    request.onsuccess = function(event) 
    {
        console.log("new log record has been added to your database.");
    }
    request.onerror = function(event) 
    {
        console.log("The new record already exists in your database! ");
    }
}

/* OTHER THINGS */

/* Prevent dialog from closing if escape button is pressed */
window.onkeydown = function (event) {
    if (event.keyCode === 27) {
        event.preventDefault();
    }
}

/*JavaScript keep scroll position after refresh */
document.addEventListener("DOMContentLoaded", function(event) 
{ 
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) 
{
    localStorage.setItem('scrollpos', window.scrollY);
}

/* Sticky Navigation Bar */
window.onscroll = function() 
{
    myFunction();
}

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() 
{
    if (window.pageYOffset >= sticky) 
    {
        navbar.classList.add("sticky");
    } 
    else 
    {
        navbar.classList.remove("sticky");
    }
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
            valueElement = document.getElementById("sse_" + inputs[i].name);
            if (valueElement) {
                settingData[inputs[i].name] = valueElement.innerHTML
            }
        }
    }

    const jsonBlob = new Blob([JSON.stringify(settingData)], {type: "application/json"});
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(jsonBlob);
    const currentDate = new Date().toISOString().slice(0, 10);
    downloadLink.download = `IPS_setting_${currentDate}.json`;
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
                        textarea.value += key + " = " + jsonData[key] + "updated. \n";

                    } else {
                        textarea.value += key + " = " + jsonData[key] + "couldn't update. \n";
                    }
                }
            };
        }
    }
    reader.readAsText(file);


}