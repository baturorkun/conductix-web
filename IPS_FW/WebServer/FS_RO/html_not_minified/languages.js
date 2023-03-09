var lang = sessionStorage.getItem("lang") ? sessionStorage.getItem("lang") : "EN";
var languageTexts = {
    "EN": {
        // INDEX
        "Inductive-Power-Supply": "Inductive-Power-Supply",
        "Monitor": "Monitor",
        "Settings": "Settings",
        "Logging": "Logging",
        "Power Transfer Parameters": "Power Transfer Parameters",
        "Description": "Description",
        "Value": "Value",
        "Unit": "Unit",
        "OUTPUT VOLTAGE": "OUTPUT VOLTAGE",
        "OUTPUT CURRENT": "OUTPUT CURRENT",
        "OUTPUT POWER": "OUTPUT POWER",
        "DC-LINK VOLTAGE": "DC-LINK VOLTAGE",
        "MAINS CURRENT": "MAINS CURRENT",
        "MAINS VOLTAGE RMS": "MAINS VOLTAGE RMS",
        "MAINS VOLTAGE FREQUENCY": "MAINS VOLTAGE FREQUENCY",
        "IPS Temperatures": "IPS Temperatures",
        "HEAT-SINK TEMPERATURE": "HEAT-SINK TEMPERATURE",
        "HEAT-SINK MAX TEMPERATURE": "HEAT-SINK MAX TEMPERATURE",
        "IS-PAD TEMPERATURE": "IS-PAD TEMPERATURE",
        "IS-PAD MAX TEMPERATURE": "IS-PAD MAX TEMPERATURE",
        "Firmware Information": "Firmware Information",
        "Master CPU": "Master CPU",
        "APPLICATION VERSION": "APPLICATION VERSION",
        "APPLICATION BUILD DATE & TIME": "APPLICATION BUILD DATE & TIME",
        "BOOTLOADER VERSION": "BOOTLOADER VERSION",
        "BOOTLOADER BUILD DATE & TIME": "BOOTLOADER BUILD DATE & TIME",
        "Inverter DSP": "Inverter DSP",
        "Status LEDs": "Status LEDs",
        "I am shown when someone hovers over the div above.": "I am shown when someone hovers over the div above.",
        "Real Time Clock RTC": "Real Time Clock RTC",
        "Year": "Year",
        "Month": "Month",
        "Day": "Day",
        "Hour": "Hour",
        "Min": "Min",
        "Sec": "Sec",
        "Charts": "Charts",
        "Heat-Sink & IS-Pad Temperature": "Heat-Sink & IS-Pad Temperature",
        "Charging Power & Current": "Charging Power & Current",
        "IPS Warnings": "IPS Warnings",
        "Warning Id": "Warning Id",
        "Status": "Status",
        "HEAT-SINK TEMPERATURE WARN": "HEAT-SINK TEMPERATURE WARN",
        "IS PAD TEMPERATURE WARN": "IS PAD TEMPERATURE WARN",
        "RTC BATTERY LOW VOLTAGE WARN": "RTC BATTERY LOW VOLTAGE WARN",
        "Master CPU": "Master CPU",
        "INVALID CONFIGURATION": "INVALID CONFIGURATION",
        "INVERTER OFFLINE": "INVERTER OFFLINE",
        "INVERTER INVALID CONFIGURATION": "INVERTER INVALID CONFIGURATION",
        "24 VOLT SAFETY SIGNAL ERR": "24 VOLT SAFETY SIGNAL ERR",
        "INVERTER START ACK": "INVERTER START ACK",
        "Inverter DSP": "Inverter DSP",
        "OVER CURRENT ERR": "OVER CURRENT ERR",
        "INVERTER SHORT CIRCUIT ERR": "INVERTER SHORT CIRCUIT ERR",
        "GATE DRIVER READY ERR": "GATE DRIVER READY ERR",
        "HARDWARE RELEASE ERR": "HARDWARE RELEASE ERR",
        "MAINS VOLTAGE ERR": "MAINS VOLTAGE ERR",
        "CHARGING RESISTOR VOLTAGE RELAY ERR": "CHARGING RESISTOR VOLTAGE RELAY ERR",
        "CHARGING RESISTOR VOLTAGE PFC ERR": "CHARGING RESISTOR VOLTAGE PFC ERR",
        "PARAMETER DOES NOT EXIST": "PARAMETER DOES NOT EXIST",
        "PARAMETER VALUE OUT OF RANGE": "PARAMETER VALUE OUT OF RANGE",
        "PARAMETER READ ONLY": "PARAMETER READ ONLY",
        "MINIMUM DC-LINK VOLTAGE ERR": "MINIMUM DC-LINK VOLTAGE ERR",
        "MAINS FREQUENCY RANGE ERR": "MAINS FREQUENCY RANGE ERR",
        "OUTPUT CHARGING PUMP ERR": "OUTPUT CHARGING PUMP ERR",
        "IS-PAD OVER TEMPERATURE ERR": "IS-PAD OVER TEMPERATURE ERR",
        "HEAT-SINK OVER TEMPERATURE ERR": "HEAT-SINK OVER TEMPERATURE ERR",
        "OVER VOLTAGE ERR": "OVER VOLTAGE ERR",
        // SETTINGS
        "IPS System Data": "IPS System Data",
        "Diagnostics": "Diagnostics",
        "Output Voltage": "Output Voltage",
        "Output Current": "Output Current",
        "Output Power ": "Output Power ",
        "IS-Pad Temperature": "IS-Pad Temperature",
        "Heat-Sink Temperature": "Heat-Sink Temperature",
        "Inverter PWM Signals Duty-Cycle": "Inverter PWM Signals Duty-Cycle",
        "AGV": "AGV",
        "MPU Feedback Signal Duty-Cycle": "MPU Feedback Signal Duty-Cycle",
        "Inverter Branch A, HIGH SIDE Frequency": "Inverter Branch A, HIGH SIDE Frequency",
        "Inverter Branch A, LOW SIDE Frequency": "Inverter Branch A, LOW SIDE Frequency",
        "Inverter Branch B, HIGH SIDE Frequency": "Inverter Branch B, HIGH SIDE Frequency",
        "Inverter Branch B, LOW SIDE Frequency": "Inverter Branch B, LOW SIDE Frequency",
        "DC-Link V set Value": "DC-Link V set Value",
        "Driver Supply Clock Frequency": "Driver Supply Clock Frequency",
        "Charging Pump Output": "Charging Pump Output",
        "Mains Voltage at Rectifier": "Mains Voltage at Rectifier",
        "Mains Voltage before Resistor": "Mains Voltage before Resistor",
        "Mains Frequency": "Mains Frequency",
        "DC-Link Voltage": "DC-Link Voltage",
        "Debug": "Debug",
        "Debug 0 Parameter": "Debug 0 Parameter",
        "Debug 1 Parameter": "Debug 1 Parameter",
        "Debug 2 Parameter": "Debug 2 Parameter",
        "Debug 3 Parameter": "Debug 3 Parameter",
        "Errors": "Errors",
        "Error Group 0": "Error Group 0",
        "Error Group 1": "Error Group 1",
        "Error Group 2": "Error Group 2",
        "Error Group 3": "Error Group 3",
        "User Management": "User Management",
        "Create New User": "Create New User",
        "Username": "Username",
        "Password": "Password",
        "Retype Password": "Retype Password",
        "User Rights": "User Rights",
        "Remove User": "Remove User",
        "Select User": "Select User",
        "IPS External I/O's": "IPS External I/O's",
        "Input State": "Input State",
        "Set / Clear Output": "Set / Clear Output",
        "Configuration Parameters": "Configuration Parameters",
        "Actual Values": "Actual Values",
        "DSP Max Output Current": "DSP Max Output Current",
        "RTC Battery Recharge Threshold Voltage": "RTC Battery Recharge Threshold Voltage",
        "Config1": "Config1",
        "Config2": "Config2",
        "Edit Parameters Values": "Edit Parameters Values",
        "Set DSP Max Output Current": "Set DSP Max Output Current",
        "Set Value": "Set Value",
        "Set Recharge Threshold": "Set Recharge Threshold",
        "Set Config1 Value": "Set Config1 Value",
        "Set Config2 Value": "Set Config2 Value",
        "Edit Debug Parameters Values": "Edit Debug Parameters Values",
        "username": "username",
        //SETTINGS LOGIN
        "username": "username",
        "password": "password",
        "Login": "Login",
        // LOGS
        "Client Side Logging": "Client Side Logging",
        "Client Side Logging Control": "Client Side Logging Control",
        "Select Data Logging Frequency": "Select Data Logging Frequency",
        "Download": "Download",
        "IPS System Log": "IPS System Log",
        "Load IPS System Log": "Load IPS System Log",
        "Clear IPS System Log": "Clear IPS System Log",
        "System Logging Control": "System Logging Control",
        "Select System Logging Level": "Select System Logging Level"


    },
    "DE": {

        "Inductive-Power-Supply": "Inductive-Power-Supply",
        "Monitor": "Monitor",
        "Settings": "Einstellungen",
        "Logging": "Loggen",
        "Power Transfer Parameters": "Parameter der Leistungsübertragung",
        "Description": "Beschreibung",
        "Value": "Wert",
        "Unit": "Einheit",
        "OUTPUT VOLTAGE": "OUTPUT VOLTAGE",
        "OUTPUT CURRENT": "AUSGANGSSTROM",
        "OUTPUT POWER": "AUSGANGSSCHEINLEISTUNG",
        "DC-LINK VOLTAGE": "ZWISCHENKREISSPANNUNG ",
        "MAINS CURRENT": "NETZSTROM",
        "MAINS VOLTAGE RMS": "NETZSPANNUNG EFFEKTIVWERT",
        "MAINS VOLTAGE FREQUENCY": "NETZSPANNUNG FREQUENZ",
        "IPS Temperatures": "IPS Temperaturen",
        "HEAT-SINK TEMPERATURE": "KÜHLKÖRPER TEMPERATUR",
        "HEAT-SINK MAX TEMPERATURE": "MAX KÜHLKÖRPER TEMPERATUR",
        "IS-PAD TEMPERATURE": "IS-PAD TEMPERATUR",
        "IS-PAD MAX TEMPERATURE": "MAX IS-PAD TEMPERATUR",
        "Firmware Information": "Firmware Informationen",
        "Master CPU": "Master CPU",
        "APPLICATION VERSION": "APPLIKATIONSVERSION",
        "APPLICATION BUILD DATE & TIME": "APPLIKATIONSVERSION ERSTELLUNGSDATUM UND -ZEIT",
        "BOOTLOADER VERSION": "BOOTLOADER VERSION",
        "BOOTLOADER BUILD DATE & TIME": "BOOTLOADER ERSTELLUNGSDATUM UND -ZEIT",
        "Inverter DSP": "Umrichter DSP",
        "Status LEDs": "Status LEDs",
        "I am shown when someone hovers over the div above.": "I am shown when someone hovers over the div above.",
        "Real Time Clock RTC": "Echtzeit-Uhr (RTC)",
        "Year": "Jahr",
        "Month": "Monat",
        "Day": "Tag",
        "Hour": "Stunde",
        "Min": "Min",
        "Sec": "Sek",
        "Charts": "Grafiken",
        "Heat-Sink & IS-Pad Temperature": "Kühlkörper & IS-Pad Temperatur",
        "Charging Power & Current": "Ladeleistung & Ladestrom",
        "IPS Warnings": "IPS Warnungen",
        "Warning Id": "Warnung Id",
        "Status": "Status",
        "HEAT-SINK TEMPERATURE WARN": "KÜHLKÖRPER TEMPERATUR ERHÖHT",
        "IS PAD TEMPERATURE WARN": "IS-PAD TEMPERATUR ERHÖHT",
        "RTC BATTERY LOW VOLTAGE WARN": "RTC PUFFERBATTERIESPANNUNG NIEDRIG",
        "Master CPU": "Master CPU",
        "INVALID CONFIGURATION": "KEINE KONFIGURATION / FLASH DEFEKT    ",
        "INVERTER OFFLINE": "UMRICHTER OFFLINE  ",
        "INVERTER INVALID CONFIGURATION": "FEHLER UMRICHTERKONFIGURATION    ",
        "24 VOLT SAFETY SIGNAL ERR": "KEINE SICHERHEITSFREIGABE ",
        "INVERTER START ACK": "START/STOP SCHALTER AUS  ",
        "Inverter DSP": "Umrichter DSP",
        "OVER CURRENT ERR": "ÜBERSTROM WECHSELRICHTER",
        "INVERTER SHORT CIRCUIT ERR": "WECHSELRICHTER KURZSCHLUSS",
        "GATE DRIVER READY ERR": "FEHLER GATETREIBER",
        "HARDWARE RELEASE ERR": "KEINE SICHERHEITSFREIGABE",
        "MAINS VOLTAGE ERR": "NETZSPANNUNG ZU KLEIN",
        "CHARGING RESISTOR VOLTAGE RELAY ERR": "FEHLER EINSCHALTSTROMBEGRENZUNG (RELAIS)",
        "CHARGING RESISTOR VOLTAGE PFC ERR": "FEHLER EINSCHALTSTROMBEGRENZUNG (PFC)",
        "PARAMETER DOES NOT EXIST": "PARAMETER FEHLT",
        "PARAMETER VALUE OUT OF RANGE": "PARAMETERWERT UNGÜLTIG",
        "PARAMETER READ ONLY": "PARAMETER NICHT BESCHREIBBAR",
        "MINIMUM DC-LINK VOLTAGE ERR": "ZWISCHENKREISSPANNUNG ZU KLEIN",
        "MAINS FREQUENCY RANGE ERR": "FEHLER NETZFREQUENZ",
        "OUTPUT CHARGING PUMP ERR": "FEHLER PILOTLINE",
        "IS-PAD OVER TEMPERATURE ERR": "ÜBERTEMPERATUR IS-PAD",
        "HEAT-SINK OVER TEMPERATURE ERR": "ÜBERTEMPERATUR KÜHLKÖRPER",
        "OVER VOLTAGE ERR": "   ÜBERSPANNUNG AUSGANG",
        // SETTINGS
        "IPS System Data": "IPS System Daten",
        "Diagnostics": "Diagnose",
        "Output Voltage": "Ausgangsspannung",
        "Output Current": "Ausgangsstrom",
        "Output Power ": "Output Power ",
        "IS-Pad Temperature": "IS-Pad Temperatur",
        "Heat-Sink Temperature": "Kühlkörper Temperatur",
        "Inverter PWM Signals Duty-Cycle": "Wechselrichter Stellgröße",
        "AGV": "AGV",
        "MPU Feedback Signal Duty-Cycle": "MPU Sollwert",
        "Inverter Branch A, HIGH SIDE Frequency": "Wechselrichter Zweig A, HIGH SIDE Frequenz",
        "Inverter Branch A, LOW SIDE Frequency": "Wechselrichter Zweig A, LOW SIDE Frequenz",
        "Inverter Branch B, HIGH SIDE Frequency": "Wechselrichter Zweig B, HIGH SIDE Frequenz",
        "Inverter Branch B, LOW SIDE Frequency": "Wechselrichter Zweig B, LOW SIDE Frequenz",
        "DC-Link V set Value": "Zwischekreisspannungssollwert",
        "Driver Supply Clock Frequency": "Treiberversorgung Takt",
        "Charging Pump Output": "Ausgang Ladepumpe",
        "Mains Voltage at Rectifier": "Netzspannung am Gleischrichter",
        "Mains Voltage before Resistor": "Netzspannung vor Ladewiderstand",
        "Mains Frequency": "Netzspannung Frequenz",
        "DC-Link Voltage": "Zwischenkeris Spannung",
        "Debug": "Debug",
        "Debug 0 Parameter": "Debug 0 Parameter",
        "Debug 1 Parameter": "Debug 1 Parameter",
        "Debug 2 Parameter": "Debug 2 Parameter",
        "Debug 3 Parameter": "Debug 3 Parameter",
        "Errors": "Störungsgruppe",
        "Error Group 0": "Störungsgruppe 0",
        "Error Group 1": "Störungsgruppe 1",
        "Error Group 2": "Störungsgruppe 2",
        "Error Group 3": "Störungsgruppe 3",
        "User Management": "Benutzer Verwaltung",
        "Create New User": "Neuen Benutzer anlegen",
        "Username": "Benutzername",
        "Password": "Password",
        "Retype Password": "Passwort wiederholen",
        "User Rights": "Benutzerrechte ",
        "Remove User": "Benutzer löschen",
        "Select User": "Benutzer wählen",
        "IPS External I/O's": "IPS Externe I/O's",
        "Input State": "Eingangszustand",
        "Set / Clear Output": "Ausgang setzen/löschen",
        "Configuration Parameters": "Konfigurationsparameter",
        "Actual Values": "Aktuelle Werte",
        "DSP Max Output Current": "DSP Max Ausgangsstrom    ",
        "RTC Battery Recharge Threshold Voltage": "Minimum Schwellenspannung der RTC-Batterie",
        "Config1": "Config1",
        "Config2": "Config2",
        "Edit Parameters Values": "Parameterwerte bearbeiten",
        "Set DSP Max Output Current": "DSP Max Ausgangsstrom bearbeiten",
        "Set Value": "Set Value",
        "Set Recharge Threshold": "Minimum Schwellenspannung bearbeiten ",
        "Set Config1 Value": "Config1 Parameter bearbeiten",
        "Set Config2 Value": "Config2 Parameter bearbeiten",
        "Edit Debug Parameters Values": "Debug Parameterwerte bearbeiten",
          "Set Debug 0 Parameter Value": "Debug 0 Parameter bearbeiten",
        "Set Debug 1 Parameter Value": "Debug 1 Parameter bearbeiten",
        "Set Debug 2 Parameter Value": "Debug 2 Parameter bearbeiten",
        "Set Debug 3 Parameter Value": "Debug 3 Parameter bearbeiten",
        "IPS Temperature": "IPS Temperatur",
        "Temperature Settings": "Temperatur Einstellungen",
        "IS-Pad Temperature Error Value": "IS-Pad Temperatur Fehlerwert",
        "IS-Pad Temperature Warning Value": "IS-Pad Temperatur Warnwert ",
        "Heat-Sink Temperature Error Value": "Kühlkörpertemperatur Fehlerwert   ",
        "Heat-Sink Temperature Warning Value": "Kühlkörpertemperatur Warnwert",
        "Edit Temperature Settings": "Temperatur Einstellungen bearbeiten",
        "Set IS-Pad T Error Value": "IS-Pad °T Fehlerwert berarbeiten ",
        "Set Heat-Sink T Error Value": "Kühlkörper °T Fehlerwert bearbeiten",
        "Edit RTC Time": "Datum & Uhrzeit bearbeiten",
        "RTC Date & Time": "RTC Date & Time",
        "Product Information": "Produkt Information",
        "Actual Product Information": "Aktuelle Produkt Information",
        "IPS Serial Number": "IPS Serial Number",
        "IPS ID": "IPS ID",
        "Name": "Name",
        "Edit Product Information": "Produkt Information bearbeiten",
        "Edit IPS Serial Number": "IPS Seriennummer",
        "Edit IPS ID / Name": "IPS ID / Name",
        "Logged In User": "Angemeldeter Benutzer",
        "Logout": "Abmelden",
        "DSP/CPU Firmware Update": "DSP/CPU Firmware Aktualisierung",
        "Firmware Information": "Informationen zur Firmware",
        "CPU Application": "CPU Applikation",
        "CPU Bootloader": "CPU Bootloader",
        "DSP Application": "DSP Applikation",
        "DSP Bootloader": "DSP Bootloader",
        ">Firmware Update": ">Firmware Aktualisierung",
        "A new IPS master CPU firmware is successfully uploaded.": "Eine neue IPS Firmware wurde erfolgreich hochgeladen.",
        "An update to the new version will be performed!": "Es wird ein Update auf die neue Version durchgeführt!",
        "OK": "OK",
        "A new IPS inverter DSP firmware is successfully uploaded.": "Eine neue IPS Umrichter DSP Firmware wurde erfolgreich hochgeladen.",
        "An update to the new version will be performed!": "Es wird ein Update auf die neue Version durchgeführt!",
        "IPS inverter DSP firmware is successfully updated.": "IPS Umrichter DSP Firmware wurde erfolgreich aktualisiert.",
        "A system reset will be performed now!": "Es wird nun ein System-Reset durchgeführt!",
        "No firmware .hex file is selected!": "Es ist keine Firmware .hex Datei ausgewählt!",
        "Please select a valid DSP firmware .hex file.": "Bitte wählen Sie eine gültige DSP Firmware .hex Datei aus.",
        "The selected file, is not a valid DSP firmware!": "Die ausgewählte Datei ist keine gültige IPS Firmware!",
        "A valid IPS DSP firmware file name looks as follows: 78007_XX.hex": "Ein gültiger IPS DSP Firmware Dateiname sieht wie folgt aus: \"78007_XX.hex\" ",
        "Choose a Cpu/Dsp Firmware .hex file": "Cpu/Dsp Firmware .hex Datei wählen",
        "File Name": "Dateiname",
        "File Size": "Dateingröße",
        "Network Configuration": "Netzwerk Konfiguration",
        "IP Settings": "IP Einstellungen",
        "Configuration": "Konfiguration",
        "IP address": "IP Adresse",
        "Subnet mask": "Subnetz Maske",
        "Gateway": "Gateway",
        "Hostname": "Hostname",
        "DNS Server": "DNS Server",
        "DNS address": "DNS Adresse",
        "MAC": "MAC",
        "MAC address": "MAC Adresse",
        "IPS Configuration File": "IPS Konfigurationsdatei",
        "A new IPS configuration will be uploaded.": "Neue IPS Konfiguration wird hochgeladen",
        "The IPS parameters will be updated to the new configuration values!": "Die IPS Parameter werden mit den neuen Konfigurationswerten aktualisiert",
        "Finished uploading new IPS configuration file.": "Neue IPS Konfiguration ist hochgeladen.",
        "Abort": "Abbrechen",
        "A system reset will be performed now!.": "Es wird nun ein System-Reset durchgeführt!",
        "The chosen file is not an IPS configuration file!": "Die gewählte Datei ist keine IPS Konfigurationsdatei!",
        "Please choose the right file.": "Bitte die richtige Datei auswählen.",
        "No IPS config .json file is selected!": "Es ist keine IPS .json Konfigurationsdatei ausgewählt!",
        "Please select a valid IPS config .json file.": "Bitte eine gültige IPS .json Konfigurationsdatei auswählen.",
        "Not a valid .json file or some data are corrupted!": "Keine gültige .json Datei oder einige Daten sind beschädigt!",
        "Please select a valid JSON formatted .json file.": "Bitte wählen Sie eine gültige JSON-formatierte .json-Datei.",
        "Download IPS configuration file": " IPS Konfigurationsdatei Herunterladen",
        "Choose an IPS configuration file": "IPS Konfigurationsdatei whälen",

        //SETTINGS LOGIN
        "username": "Nutzername",
        "password": "Passwort",
        "Login": "Anmeldung",
        // LOGS
        "Client Side Logging": "Clientseitig Loggen",
        "Client Side Logging Control": "Clientseitiges Loggen Steuerung",
        "Select Data Logging Frequency": "Frequenz der Datenaufzeichnung wählen",
        "Download": "Herunterladen",
        "IPS System Log": "IPS System Log löschen",
        "Load IPS System Log": "IPS System Log laden",
        "Clear IPS System Log": "IPS System Log löschen",
        "System Logging Control": "System Logging Steuerung",
        "Select System Logging Level": "System Logging-Stufe auswählen"

    }
};

function refreshLabels(lang) {
    const elementsWithLangKeyClass = document.querySelectorAll('[data-key]');
    for (let i = 0; i < elementsWithLangKeyClass.length; i++) {
        const element = elementsWithLangKeyClass[i];
        langKey = element.getAttribute('data-key');
        if (languageTexts[lang][langKey]) {
            if (element.placeholder) {
                element.placeholder = languageTexts[lang][langKey];
            } else {
                element.textContent = languageTexts[lang][langKey];
            }
        }
    }
    document.getElementById('lang-text').textContent = lang;
}

function changeLang(lang) {

    sessionStorage.setItem("lang", lang);
    refreshLabels(lang);
}

function initLanguage() {

    console.log("initLanguage")
    lang = sessionStorage.getItem("lang") ? sessionStorage.getItem("lang") : "EN";
    refreshLabels(lang);
    document.body.style.display = 'block';
}