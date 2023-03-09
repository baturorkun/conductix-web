var db;var db_de;var logs_textarea;var logs_textarea_de;var sys_logs_textarea;var allRecords_de;var language;var log_record;var allRecords;var log_start_stop;var intervalId;var log_frequenz;var signedIn;window.onload=init();function init()
{initLanguage();signedIn=sessionStorage.getItem('access');sys_logs_textarea=document.getElementById("system-logs");sys_logs_textarea.scrollTop=sys_logs_textarea.scrollHeight;language=document.getElementById("lan").innerHTML.substr(0,2);log_start_stop=document.getElementById("ctrl").innerHTML;log_frequenz=document.getElementById("log-freqz").innerHTML;console.log(log_start_stop);console.log(log_frequenz);if(signedIn==null)
{sessionStorage.setItem('access',"no");signedIn=sessionStorage.getItem('access');}
if(language=="DE")
{if(signedIn=="no")
{document.getElementById("Settings-de-href").href="Settings_login.htm";}
console.log(document.getElementById("Settings-de-href").href);if((log_start_stop=="GESTOPPT"))
{if(intervalId!=null)
{clearInterval(intervalId);}}
else if(log_start_stop=="GESTARTET")
{switch(log_frequenz)
{case"100 MS":intervalId=setInterval(_ajaxGetLogsLiveData,100);break;case"500 MS":intervalId=setInterval(_ajaxGetLogsLiveData,500);break;case"1 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,1000);break;case"2 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,2000);break;case"3 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,3000);break;case"4 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,4000);break;case"5 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,5000);break;case"10 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,10000);break;case"30 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,30000);break;case"60 SEK":intervalId=setInterval(_ajaxGetLogsLiveData,60000);break;default:intervalId=setInterval(_ajaxGetLogsLiveData,5000);break;}}
var request=indexedDB.open("de_logs_ips",1);request.onerror=function(event)
{console.log('Opening database failed');}
request.onsuccess=function(event)
{db_de=request.result;console.log('The database is opened successfully');logs_textarea_de=document.getElementById("data-logs-de");logs_textarea_de.value="Datum & Zeit; Spannung in V; Strom in A; Leistung in VA; Kühlkörper T in Celcius; Pad T in Celcius; 10kHz Taktverhältnis in %; Umrichter Freq in Hz";if(log_start_stop=="GELÖSCHT")
{var transaction=db_de.transaction(["ips_logs_de"],'readwrite');var objectStore=transaction.objectStore("ips_logs_de");var objectStoreRequest=objectStore.clear();transaction.onerror=function(event)
{alert("Fehler beim Löschen von Daten!")};objectStoreRequest.onsuccess=function(event)
{console.log("Alle Daten sind gelöscht.");};}
else
{var transaction=db_de.transaction(["ips_logs_de"],'readonly');var objectStore=transaction.objectStore("ips_logs_de");objectStore.openCursor().onsuccess=function(event)
{var cursor=event.target.result;if(cursor)
{logs_textarea_de.value+="\r\n"+cursor.value.DatumUndZeit+
";\t"+cursor.value.AusgangsSpannung+
";\t"+cursor.value.AusgangsStrom+
";\t"+cursor.value.Leistung+
";\t"+cursor.value.KK+
";\t"+cursor.value.Pad+
";\t"+cursor.value.Duty+
";\t"+cursor.value.UmrichterFreq;cursor.continue();}
else
{logs_textarea_de.scrollTop=logs_textarea_de.scrollHeight;console.log("Alle Daten sind dargestellt.");}}}}
request.onupgradeneeded=function(event)
{db_de=event.target.result;if(!db_de.objectStoreNames.contains("ips_logs_de"))
{var objectStore=db_de.createObjectStore("ips_logs_de",{keyPath:"DatumUndZeit"});}}}
else
{if(signedIn=="no")
{document.getElementById("Settings-href").href="Settings_login.htm";}
console.log(document.getElementById("Settings-href").href);if((log_start_stop=="STOPED"))
{if(intervalId!=null)
{clearInterval(intervalId);}}
else if(log_start_stop=="STARTED")
{switch(log_frequenz)
{case"100 MS":intervalId=setInterval(_ajaxGetLogsLiveData,100);break;case"500 MS":intervalId=setInterval(_ajaxGetLogsLiveData,500);break;case"1 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,1000);break;case"2 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,2000);break;case"3 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,3000);break;case"4 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,4000);break;case"5 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,5000);break;case"10 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,10000);break;case"30 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,30000);break;case"60 SEC":intervalId=setInterval(_ajaxGetLogsLiveData,60000);break;default:intervalId=setInterval(_ajaxGetLogsLiveData,5000);break;}}
var request=indexedDB.open("en_logs_ips",1);request.onerror=function(event)
{console.log('Opening database failed');}
request.onsuccess=function(event)
{db=request.result;console.log('The database is opened successfully');logs_textarea=document.getElementById('data-logs');logs_textarea.value="Date & Time, Out Voltage in V, Out Current in A, Power in VA, Heat-Sink T in Celcius, Pad T in Celcius, 10 kHz Duty in %, Inverter Freq in Hz";if(log_start_stop=="CLEARED")
{var transaction=db.transaction(["ips_logs_en"],'readwrite');var objectStore=transaction.objectStore("ips_logs_en");var objectStoreRequest=objectStore.clear();transaction.onerror=function(event)
{alert("Error while deleting data!")};objectStoreRequest.onsuccess=function(event)
{console.log("all records are deleted");};}
else
{var transaction=db.transaction(["ips_logs_en"],'readonly');var objectStore=transaction.objectStore("ips_logs_en");objectStore.openCursor().onsuccess=function(event)
{var cursor=event.target.result;if(cursor)
{logs_textarea.value+="\r\n"+cursor.value.DateAndTime+
",\t"+cursor.value.VOut+
",\t"+cursor.value.IOut+
",\t"+cursor.value.Power+
",\t"+cursor.value.HS+
",\t"+cursor.value.Pad+
",\t"+cursor.value.Duty+
",\t"+cursor.value.InvFreq;cursor.continue();}
else
{logs_textarea.scrollTop=logs_textarea.scrollHeight;console.log("All entries are displayed.");}}}}
request.onupgradeneeded=function(event)
{db=event.target.result;if(!db.objectStoreNames.contains("ips_logs_en"))
{var objectStore=db.createObjectStore("ips_logs_en",{keyPath:"DateAndTime"});}}}}
function download()
{var date_time=new Date();var anchor=document.createElement("a");if(language=="DE")
{var blob=new Blob([logs_textarea_de.value],{type:"text/csv;charset=UTF-8;"});anchor.download="de_ips_client_side_log_"+date_time.toLocaleDateString('de-DE',{day:"2-digit",month:"2-digit",year:"numeric"}).replace(/\./g,"_")+"_"+date_time.toLocaleTimeString().replace(/:/g,"_")+".csv";}
else
{var blob=new Blob([logs_textarea.value],{type:"text/csv;charset=UTF-8;"});anchor.download="en_ips_client_side_log_"+date_time.toISOString().substring(0,10).replace(/-/g,"_")+"_"+date_time.toLocaleTimeString().replace(/:/g,"_")+".csv";}
anchor.href=window.URL.createObjectURL(blob);anchor.target="_blank";anchor.style.display="none";document.body.appendChild(anchor);anchor.click();document.body.removeChild(anchor);}
function download_logs(){var date_time=new Date,anchor=document.createElement("a"),blob=new Blob([sys_logs_textarea.value],{type:"text/plain;charset=UTF-8;"});anchor.download="ips_sys_log_"+date_time.toISOString().substring(0,10).replace(/-/g,"_")+"_"+date_time.toLocaleTimeString().replace(/:/g,"_")+".log";anchor.href=window.URL.createObjectURL(blob);anchor.target="_blank";anchor.style.display="none";document.body.appendChild(anchor);anchor.click();document.body.removeChild(anchor);}
function _ajaxGetLogsLiveData()
{if(window.XMLHttpRequest)
{var httpRequest=new XMLHttpRequest();}
else if(window.ActiveXObject)
{try
{var httpRequest=new ActiveXObject("Msxml2.XMLHTTP");}catch(otherMS)
{try
{var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");}catch(failed)
{var httpRequest=null;}}}
httpRequest.onreadystatechange=function()
{if(this.readyState==4)
{if(this.status==200)
{var json=JSON.parse(this.responseText);var now=new Date();if(language=="DE")
{log_record={DatumUndZeit:now.toLocaleString().replace(/,/g,"")+","+now.getMilliseconds(),AusgangsSpannung:(json[0][1]/100).toFixed(1),AusgangsStrom:(json[1][1]/100).toFixed(2),Leistung:json[2][1],KK:json[7][1],Pad:json[8][1],Duty:json[9][1],UmrichterFreq:json[10][1]}
logs_textarea_de.value+="\r\n"+now.toLocaleString().replace(/,/g,"")+","+now.getMilliseconds()+
";\t"+(json[0][1]/100).toFixed(1)+
";\t"+(json[1][1]/100).toFixed(2)+
";\t"+json[2][1]+
";\t"+json[7][1]+
";\t"+json[8][1]+
";\t"+json[9][1]+
";\t"+json[10][1];logs_textarea_de.scrollTop=logs_textarea_de.scrollHeight;}
else
{log_record={DateAndTime:now.toLocaleString("en-GB").replace(/,/g,"")+"."+now.getMilliseconds(),VOut:(json[0][1]/100).toFixed(1),IOut:(json[1][1]/100).toFixed(2),Power:json[2][1],HS:json[7][1],Pad:json[8][1],Duty:json[9][1],InvFreq:json[10][1]}
logs_textarea.value+="\r\n"+now.toLocaleString("en-GB").replace(/,/g,"")+"."+now.getMilliseconds()+
",\t"+(json[0][1]/100).toFixed(1)+
",\t"+(json[1][1]/100).toFixed(2)+
",\t"+json[2][1]+
",\t"+json[7][1]+
",\t"+json[8][1]+
",\t"+json[9][1]+
",\t"+json[10][1];logs_textarea.scrollTop=logs_textarea.scrollHeight;}
add_record(log_record);}
if(this.status==404)
{console.log("Live data can't be loaded!");}}}
httpRequest.open('GET','/AjaxGetLogsLiveData.cgi',true);httpRequest.send();}
function add_record(record)
{language=document.getElementById("lan").innerHTML.substr(0,2);if(language=="DE")
{var transaction=db_de.transaction(["ips_logs_de"],"readwrite");var objectStore=transaction.objectStore("ips_logs_de");}
else
{var transaction=db.transaction(["ips_logs_en"],"readwrite");var objectStore=transaction.objectStore("ips_logs_en");}
var request=objectStore.add(record);request.onsuccess=function(event)
{console.log("new log record has been added to your database.");}
request.onerror=function(event)
{console.log("The new record already exists in your database! ");}}
function read_all()
{}
function delet_all()
{}
document.addEventListener("DOMContentLoaded",function(event)
{var scrollpos=localStorage.getItem('scrollpos');if(scrollpos)
{window.scrollTo(0,scrollpos);}});window.onbeforeunload=function(e)
{localStorage.setItem('scrollpos',window.scrollY);}
window.onscroll=function()
{myFunction();}
var navbar=document.getElementById("navbar");var sticky=navbar.offsetTop;function myFunction()
{if(window.pageYOffset>=sticky)
{navbar.classList.add("sticky");}
else
{navbar.classList.remove("sticky");}}